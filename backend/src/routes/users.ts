import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/users/consent  — record that the user accepted the Terms of Use
router.post('/consent', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await prisma.userProfile.upsert({
            where: { clerkUserId: req.auth!.userId },
            create: {
                clerkUserId: req.auth!.userId,
                consentAcceptedAt: new Date(),
            },
            update: {
                consentAcceptedAt: new Date(),
            },
        });
        res.json({ consentAcceptedAt: profile.consentAcceptedAt });
    } catch (err) { next(err); }
});

// GET /api/users/me/export  — download all data for the authenticated user as JSON
router.get('/me/export', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.auth!.userId;

        const [profile, projects] = await Promise.all([
            prisma.userProfile.findUnique({ where: { clerkUserId: userId } }),
            prisma.project.findMany({
                where: { clerkUserId: userId },
                include: {
                    phases: { include: { crewAssignments: true } },
                    persons: { include: { perDiemEntries: true, mealPenalties: true } },
                    departments: true,
                    budgetLineItems: true,
                    characters: { include: { relationshipsFrom: true } },
                    locations: true,
                    arcBeats: true,
                    storyboardShots: true,
                    colorPalettes: true,
                    members: true,
                },
            }),
        ]);

        res.setHeader('Content-Disposition', 'attachment; filename="pocket-productions-export.json"');
        res.json({
            exportedAt: new Date().toISOString(),
            userId,
            consentAcceptedAt: profile?.consentAcceptedAt ?? null,
            projects,
        });
    } catch (err) { next(err); }
});

// DELETE /api/users/me  — permanently delete account and all associated data
router.delete('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.auth!.userId;

        // Projects have cascade deletes set up in Prisma for all child models
        await prisma.$transaction([
            prisma.project.deleteMany({ where: { clerkUserId: userId } }),
            prisma.projectMember.deleteMany({ where: { clerkUserId: userId } }),
            prisma.userProfile.deleteMany({ where: { clerkUserId: userId } }),
        ]);

        res.json({ message: 'Account data deleted. Please also delete your Clerk account to fully remove your login.' });
    } catch (err) { next(err); }
});

export default router;
