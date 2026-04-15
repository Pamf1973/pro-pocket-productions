import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';
import { ClearanceTier } from '@prisma/client';

export { ClearanceTier };

/**
 * Tier ordering — higher index = more access
 */
const TIER_ORDER: ClearanceTier[] = [
    ClearanceTier.TIER_4_LIMITED,
    ClearanceTier.TIER_3_DEPARTMENT,
    ClearanceTier.TIER_2_CREATIVE,
    ClearanceTier.TIER_1_FULL,
];

/**
 * Extends Express Request to include authenticated user context
 */
declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: string;
                sessionId?: string;
            };
        }
    }
}

/**
 * Returns the caller's ClearanceTier for a given project.
 * Owners always get TIER_1_FULL. Members get their assigned tier.
 * Returns null if the user has no access to the project.
 */
export async function getProjectTier(
    userId: string,
    projectId: string
): Promise<ClearanceTier | null> {
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { clerkUserId: true },
    });
    if (!project) return null;
    if (project.clerkUserId === userId) return ClearanceTier.TIER_1_FULL;

    const member = await prisma.projectMember.findFirst({
        where: {
            projectId,
            clerkUserId: userId,
            inviteStatus: 'ACCEPTED',
        },
        select: { clearanceTier: true },
    });
    return member?.clearanceTier ?? null;
}

/**
 * Returns true if `actual` tier meets or exceeds `required` tier.
 */
export function tierAtLeast(actual: ClearanceTier, required: ClearanceTier): boolean {
    return TIER_ORDER.indexOf(actual) >= TIER_ORDER.indexOf(required);
}

/**
 * Express middleware factory — verifies the caller has at least `minTier` on
 * the project identified by `req.params.projectId`.
 */
export function requireTier(minTier: ClearanceTier) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = req.auth?.userId;
        const projectId = req.params.projectId;
        if (!userId || !projectId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        const tier = await getProjectTier(userId, projectId);
        if (!tier || !tierAtLeast(tier, minTier)) {
            res.status(403).json({ error: 'Forbidden: insufficient clearance' });
            return;
        }
        next();
    };
}

/**
 * Clerk authentication middleware.
 * If BYPASS_AUTH=true (dev mode), attaches a dummy userId so all endpoints work without Clerk.
 * In production, verifies the Bearer token via Clerk.
 */
export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    // ── Dev bypass ────────────────────────────────────────────────────────────
    if (env.BYPASS_AUTH) {
        req.auth = { userId: 'dev-user-bypass' };
        return next();
    }

    // ── Clerk verification ────────────────────────────────────────────────────
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }

    try {
        // Dynamic import so the app still starts without CLERK_SECRET_KEY in dev
        const token = authHeader.split(' ')[1];

        // In @clerk/express, verifyToken is available on the client returned by createClerkClient? 
        // Wait, the error is "Property 'verifyToken' does not exist on type 'ClerkClient'". 
        // In newer Clerk SDKs it's accessed via `clerkClient.authenticateRequest` or `clerkClient.verifyToken` is exported statically. Let's just use `clerkClient.authenticateRequest`. If that doesn't work, we can fallback to standard JWT decode.
        // Actually, `verifyToken` is exported directly from '@clerk/backend'. Let's do a dynamic import of it.
        const { verifyToken } = await import('@clerk/backend');
        const payload = await verifyToken(token, { secretKey: env.CLERK_SECRET_KEY });

        req.auth = { userId: payload.sub };
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}
