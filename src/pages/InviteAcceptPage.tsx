import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const BASE = import.meta.env.VITE_API_URL || '';

interface InvitePreview {
  projectTitle: string;
  projectFormat: string;
  filmRole: string;
  clearanceTier: string;
  invitedAt: string;
}

const TIER_LABELS: Record<string, string> = {
  TIER_1_FULL: 'Full Access',
  TIER_2_CREATIVE: 'Creative & Overview',
  TIER_3_DEPARTMENT: 'Department',
  TIER_4_LIMITED: 'Limited / Call Sheet',
};

export default function InviteAcceptPage() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, getToken } = useAuth();

  const [preview, setPreview] = useState<InvitePreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!token) { setError('Invalid invite link.'); return; }
    fetch(`${BASE}/api/team/invites/${token}`)
      .then((r) => r.ok ? r.json() : r.json().then((e: { error: string }) => { throw new Error(e.error); }))
      .then(setPreview)
      .catch((e: Error) => setError(e.message));
  }, [token]);

  async function handleAccept() {
    if (!isSignedIn || !token) return;
    setAccepting(true);
    try {
      const authToken = await getToken();
      const r = await fetch(`${BASE}/api/team/invites/${token}/accept`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!r.ok) {
        const e = await r.json();
        throw new Error(e.error);
      }
      setAccepted(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to accept invite');
    } finally {
      setAccepting(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f141e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Public Sans', sans-serif", padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440, background: 'rgba(15,20,30,0.92)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 36 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎬</div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 700, margin: 0 }}>Project Invite</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>Pocket Productions</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: 16, color: '#f87171', fontSize: 14, marginBottom: 20 }}>
            {error}
          </div>
        )}

        {accepted && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: 16, color: '#4ade80', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>
            Invite accepted! Redirecting to dashboard...
          </div>
        )}

        {preview && !accepted && (
          <>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <p style={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Project</p>
              <p style={{ color: '#f1f5f9', fontSize: 17, fontWeight: 600, margin: '0 0 16px' }}>{preview.projectTitle}</p>

              <p style={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Your Role</p>
              <p style={{ color: '#f1f5f9', fontSize: 15, margin: '0 0 16px' }}>{preview.filmRole}</p>

              <p style={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Access Level</p>
              <span style={{ display: 'inline-block', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 6, padding: '3px 10px', fontSize: 13 }}>
                {TIER_LABELS[preview.clearanceTier] ?? preview.clearanceTier}
              </span>
            </div>

            {!isLoaded ? (
              <p style={{ color: '#64748b', textAlign: 'center', fontSize: 14 }}>Loading...</p>
            ) : !isSignedIn ? (
              <div>
                <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
                  Sign in or create an account to accept this invite.
                </p>
                <button
                  onClick={() => navigate(`/login?redirect=/invite/accept?token=${token}`)}
                  style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
                >
                  Sign In to Accept
                </button>
                <button
                  onClick={() => navigate(`/signup?redirect=/invite/accept?token=${token}`)}
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 14, cursor: 'pointer', marginTop: 10 }}
                >
                  Create Account
                </button>
              </div>
            ) : (
              <button
                onClick={handleAccept}
                disabled={accepting}
                style={{ width: '100%', padding: '12px', background: accepting ? 'rgba(59,130,246,0.4)' : 'linear-gradient(to right, #3b82f6, #2563eb)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: accepting ? 'not-allowed' : 'pointer' }}
              >
                {accepting ? 'Accepting...' : 'Accept Invite'}
              </button>
            )}
          </>
        )}

        {!preview && !error && (
          <p style={{ color: '#64748b', textAlign: 'center', fontSize: 14 }}>Loading invite details...</p>
        )}
      </div>
    </div>
  );
}
