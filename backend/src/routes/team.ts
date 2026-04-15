import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { ClearanceTier, InviteStatus } from '@prisma/client';
import { createError } from '../middleware/errorHandler';

const router = Router();

const InviteSchema = z.object({
    email: z.string().email(),
    filmRole: z.string().min(1),
    department: z.string().optional(),
    clearanceTier: z.nativeEnum(ClearanceTier).default(ClearanceTier.TIER_4_LIMITED),
});

const UpdateMemberSchema = z.object({
    filmRole: z.string().optional(),
    department: z.string().optional(),
    clearanceTier: z.nativeEnum(ClearanceTier).optional(),
});

/** Verify caller owns the project */
async function assertOwner(userId: string, projectId: string): Promise<void> {
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { clerkUserId: true },
    });
    if (!project) throw createError('Project not found', 404);
    if (project.clerkUserId !== userId) throw createError('Forbidden', 403);
}

// GET /api/projects/:projectId/my-access — returns the caller's tier for this project
router.get('/:projectId/my-access', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.auth!.userId;
        const { projectId } = req.params;

        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { clerkUserId: true },
        });
        if (!project) { res.status(404).json({ error: 'Project not found' }); return; }

        if (project.clerkUserId === userId) {
            res.json({ tier: 'TIER_1_FULL', isOwner: true, filmRole: 'Owner', department: null });
            return;
        }

        const member = await prisma.projectMember.findFirst({
            where: { projectId, clerkUserId: userId, inviteStatus: 'ACCEPTED' },
        });
        if (!member) { res.status(403).json({ error: 'Forbidden' }); return; }

        res.json({ tier: member.clearanceTier, isOwner: false, filmRole: member.filmRole, department: member.department });
    } catch (err) { next(err); }
});

// POST /api/projects/:projectId/team/invite
// Owner invites a crew member by email + assigns role and tier
router.post('/:projectId/invite', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await assertOwner(req.auth!.userId, req.params.projectId);

        const body = InviteSchema.parse(req.body);

        const member = await prisma.projectMember.upsert({
            where: {
                projectId_inviteEmail: {
                    projectId: req.params.projectId,
                    inviteEmail: body.email,
                },
            },
            create: {
                projectId: req.params.projectId,
                inviteEmail: body.email,
                filmRole: body.filmRole,
                department: body.department,
                clearanceTier: body.clearanceTier,
                inviteStatus: InviteStatus.PENDING,
            },
            update: {
                filmRole: body.filmRole,
                department: body.department,
                clearanceTier: body.clearanceTier,
                inviteStatus: InviteStatus.PENDING,
                clerkUserId: null,
                acceptedAt: null,
            },
        });

        // TODO: send invite email via Resend/SendGrid with link:
        // /invite/accept?token=<member.inviteToken>
        // For now the token is returned in the response for manual sharing.

        res.status(201).json({
            message: 'Invite created',
            inviteToken: member.inviteToken,
            member,
        });
    } catch (err) { next(err); }
});

// GET /api/projects/:projectId/team
// List all members (owner only)
router.get('/:projectId/members', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await assertOwner(req.auth!.userId, req.params.projectId);

        const members = await prisma.projectMember.findMany({
            where: { projectId: req.params.projectId },
            orderBy: { invitedAt: 'asc' },
        });
        res.json(members);
    } catch (err) { next(err); }
});

// PATCH /api/projects/:projectId/team/:memberId
// Change a member's tier or role (owner only)
router.patch('/:projectId/members/:memberId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await assertOwner(req.auth!.userId, req.params.projectId);

        const body = UpdateMemberSchema.parse(req.body);
        const member = await prisma.projectMember.update({
            where: { id: req.params.memberId },
            data: body,
        });
        res.json(member);
    } catch (err) { next(err); }
});

// DELETE /api/projects/:projectId/team/:memberId
// Revoke access (owner only)
router.delete('/:projectId/members/:memberId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await assertOwner(req.auth!.userId, req.params.projectId);

        await prisma.projectMember.update({
            where: { id: req.params.memberId },
            data: { inviteStatus: InviteStatus.REVOKED },
        });
        res.json({ message: 'Access revoked' });
    } catch (err) { next(err); }
});

// GET /api/invites/:token  (public — no auth needed, used by accept page to preview invite)
router.get('/invites/:token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await prisma.projectMember.findUnique({
            where: { inviteToken: req.params.token },
            include: {
                project: { select: { title: true, format: true } },
            },
        });
        if (!member || member.inviteStatus !== InviteStatus.PENDING) {
            res.status(404).json({ error: 'Invite not found or already used' });
            return;
        }
        res.json({
            projectTitle: member.project.title,
            projectFormat: member.project.format,
            filmRole: member.filmRole,
            clearanceTier: member.clearanceTier,
            invitedAt: member.invitedAt,
        });
    } catch (err) { next(err); }
});

// POST /api/invites/:token/accept  (authenticated — crew member links their Clerk ID)
router.post('/invites/:token/accept', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await prisma.projectMember.findUnique({
            where: { inviteToken: req.params.token },
        });
        if (!member || member.inviteStatus !== InviteStatus.PENDING) {
            res.status(404).json({ error: 'Invite not found or already used' });
            return;
        }

        const updated = await prisma.projectMember.update({
            where: { id: member.id },
            data: {
                clerkUserId: req.auth!.userId,
                inviteStatus: InviteStatus.ACCEPTED,
                acceptedAt: new Date(),
            },
        });
        res.json({ message: 'Invite accepted', member: updated });
    } catch (err) { next(err); }
});

export default router;
