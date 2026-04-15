import { useState } from 'react';
import { SignIn } from '@clerk/clerk-react';
import { getDeviceMemory, clearDeviceMemory } from '../hooks/useDeviceMemory';

const BG =
  'linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7U1Gh4-kKaYostL_eEorsf99I_MqQ1acbIdsxccR9fO4r5oOUjw0z_8weTOkmmfRTt2CtAX4reSaK82QlAv3ZNbB2JDgjjcCaP6QQFKycjF_bME75dRJEEfFEZppwYR0Cq3pAx1-zKjmYu7pqIWjfEISAZ5S-dpRZRATrs5bo2yJqvi2rHzbI6WhTCKqOzkJ448p42yoso_Br-bvOqmgNEpOZ1qmOWnaX64qYsQSvBkFszpb2iTevdiyZNEgGkBIrLym0HTMnleEu")';

const CLERK_APPEARANCE = {
  variables: {
    colorPrimary: '#3b82f6',
    colorBackground: 'rgba(15,20,30,0.92)',
    colorText: '#ffffff',
    colorTextSecondary: '#94a3b8',
    colorInputBackground: 'rgba(255,255,255,0.07)',
    colorInputText: '#ffffff',
    borderRadius: '0.75rem',
    fontFamily: "'Public Sans', sans-serif",
  },
  elements: {
    card: 'shadow-2xl backdrop-blur-xl border border-white/10',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton: 'border-white/10 text-slate-300 hover:bg-white/5',
    formButtonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:brightness-110',
    footerActionLink: 'text-blue-400 hover:text-blue-300',
  },
};

export default function LoginScreen() {
  const remembered = getDeviceMemory();
  const [showFullLogin, setShowFullLogin] = useState(!remembered);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: BG }} />

      <div className="relative z-10 w-full flex flex-col items-center px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white leading-tight">
            Pocket<br />Productions
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">
            Enter the Creative Workspace
          </p>
        </div>

        {remembered && !showFullLogin ? (
          /* ── Welcome back card ── */
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{
              background: 'rgba(15,20,30,0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex flex-col items-center mb-6">
              <div
                className="size-16 rounded-full flex items-center justify-center text-white text-xl font-black mb-3"
                style={{ background: 'linear-gradient(135deg, #ec5b13, #c0410a)' }}
              >
                {remembered.initials}
              </div>
              <p className="text-white font-black text-lg">{remembered.name}</p>
              <p className="text-slate-500 text-sm">{remembered.email}</p>
              <div
                className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <span className="material-symbols-outlined text-[14px]" style={{ color: '#10b981' }}>
                  verified
                </span>
                <span className="text-[11px] font-bold" style={{ color: '#10b981' }}>
                  Trusted Device
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowFullLogin(true)}
              className="w-full py-4 rounded-2xl font-black text-sm text-white mb-3 transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                boxShadow: '0 8px 20px rgba(59,130,246,0.3)',
              }}
            >
              Continue as {remembered.name.split(' ')[0]}
            </button>

            <button
              onClick={() => { clearDeviceMemory(); setShowFullLogin(true); }}
              className="w-full py-3 text-sm font-bold transition-all"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Sign in as someone else
            </button>
          </div>
        ) : (
          /* ── Full Clerk sign in ── */
          <SignIn
            routing="hash"
            forceRedirectUrl="/dashboard"
            signUpUrl="/signup"
            appearance={CLERK_APPEARANCE}
          />
        )}

        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-4 text-center">
          Terminal Access 1.0.4 // Production Mode
        </p>
      </div>
    </div>
  );
}
