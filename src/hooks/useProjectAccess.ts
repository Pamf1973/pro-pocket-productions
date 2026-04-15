import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

export type ClearanceTier =
  | 'TIER_1_FULL'
  | 'TIER_2_CREATIVE'
  | 'TIER_3_DEPARTMENT'
  | 'TIER_4_LIMITED'
  | 'OWNER';

const TIER_ORDER: ClearanceTier[] = [
  'TIER_4_LIMITED',
  'TIER_3_DEPARTMENT',
  'TIER_2_CREATIVE',
  'TIER_1_FULL',
  'OWNER',
];

const BASE = import.meta.env.VITE_API_URL || '';

interface MemberInfo {
  tier: ClearanceTier | null;
  isOwner: boolean;
  filmRole: string | null;
  department: string | null;
  loading: boolean;
}

/**
 * Returns the current user's clearance tier for a given project.
 *
 * Usage:
 *   const { tier, isOwner, loading } = useProjectAccess(projectId);
 *   {tierAtLeast(tier, 'TIER_2_CREATIVE') && <CharactersSection />}
 */
export function useProjectAccess(projectId: string | null | undefined): MemberInfo {
  const { getToken, userId } = useAuth();
  const [info, setInfo] = useState<MemberInfo>({ tier: null, isOwner: false, filmRole: null, department: null, loading: true });

  useEffect(() => {
    if (!projectId || !userId) {
      setInfo({ tier: null, isOwner: false, filmRole: null, department: null, loading: false });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const token = await getToken();
        const r = await fetch(`${BASE}/api/projects/${projectId}/my-access`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) {
          if (!cancelled) setInfo({ tier: null, isOwner: false, filmRole: null, department: null, loading: false });
          return;
        }
        const data = await r.json();
        if (!cancelled) setInfo({ ...data, loading: false });
      } catch {
        if (!cancelled) setInfo({ tier: null, isOwner: false, filmRole: null, department: null, loading: false });
      }
    }

    load();
    return () => { cancelled = true; };
  }, [projectId, userId]);

  return info;
}

/**
 * Returns true if `actual` tier meets or exceeds `required` tier.
 * Owners always pass.
 */
export function tierAtLeast(actual: ClearanceTier | null, required: ClearanceTier): boolean {
  if (!actual) return false;
  if (actual === 'OWNER') return true;
  return TIER_ORDER.indexOf(actual) >= TIER_ORDER.indexOf(required);
}
