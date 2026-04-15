import { useState } from 'react';
import { SignUp } from '@clerk/clerk-react';

export default function SignUpScreen() {
  const [consented, setConsented] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7U1Gh4-kKaYostL_eEorsf99I_MqQ1acbIdsxccR9fO4r5oOUjw0z_8weTOkmmfRTt2CtAX4reSaK82QlAv3ZNbB2JDgjjcCaP6QQFKycjF_bME75dRJEEfFEZppwYR0Cq3pAx1-zKjmYu7pqIWjfEISAZ5S-dpRZRATrs5bo2yJqvi2rHzbI6WhTCKqOzkJ448p42yoso_Br-bvOqmgNEpOZ1qmOWnaX64qYsQSvBkFszpb2iTevdiyZNEgGkBIrLym0HTMnleEu")',
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white leading-tight">
            Create
            <br />
            Profile
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">
            Join Pocket Productions
          </p>
        </div>

        {/* Consent checkbox — must be checked before Clerk form is shown */}
        {!consented ? (
          <div style={{ width: '100%', maxWidth: 400, background: 'rgba(15,20,30,0.92)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Before creating an account, please confirm that you have read and agree to our data practices.
            </p>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                onChange={(e) => setConsented(e.target.checked)}
                style={{ marginTop: 3, accentColor: '#3b82f6', width: 16, height: 16, flexShrink: 0 }}
              />
              <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>Terms of Use</a>
                {' '}and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>Privacy Policy</a>.
                {' '}I understand that my production data (crew rates, budgets, locations) will be stored securely and never sold to third parties.
              </span>
            </label>
          </div>
        ) : (
          <>
            <SignUp
              routing="hash"
              forceRedirectUrl="/dashboard"
              signInUrl="/login"
              appearance={{
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
              }}
            />
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-4 text-center">
              Terminal Access 1.0.4 // Production Mode
            </p>
          </>
        )}
      </div>
    </div>
  );
}
