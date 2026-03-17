import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  hasAnsweredRememberPrompt,
  markRememberPromptAnswered,
  saveDeviceMemory,
} from '../hooks/useDeviceMemory';

export default function RememberDevicePrompt() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    if (hasAnsweredRememberPrompt(user.id)) return;
    // Small delay so the dashboard renders first
    const t = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(t);
  }, [isLoaded, isSignedIn, user]);

  if (!show || !user) return null;

  const name = user.fullName ?? user.firstName ?? 'Producer';
  const email = user.primaryEmailAddress?.emailAddress ?? '';
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  const handleYes = () => {
    saveDeviceMemory({ userId: user.id, name, email, initials });
    markRememberPromptAnswered(user.id, 'yes');
    setShow(false);
  };

  const handleNo = () => {
    markRememberPromptAnswered(user.id, 'no');
    setShow(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={handleNo} />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 rounded-t-3xl p-6 pb-10"
        style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-6" />

        {/* Device icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}
        >
          <span className="material-symbols-outlined text-[28px]" style={{ color: '#3b82f6' }}>
            smartphone
          </span>
        </div>

        <h2 className="text-xl font-black text-white text-center mb-2">
          Remember this device?
        </h2>
        <p className="text-sm text-slate-400 text-center mb-6 leading-relaxed">
          Stay signed in as <span className="text-white font-bold">{name}</span> on this device for 30 days. You won't need to sign in again.
        </p>

        {/* User preview */}
        <div
          className="flex items-center gap-3 rounded-2xl p-4 mb-6"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="size-10 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
            style={{ background: 'linear-gradient(135deg, #ec5b13, #c0410a)' }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">{name}</p>
            <p className="text-slate-500 text-xs truncate">{email}</p>
          </div>
          <span className="material-symbols-outlined text-green-400 text-[20px] shrink-0">
            verified
          </span>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleYes}
            className="w-full py-4 rounded-2xl font-black text-sm text-white transition-all active:scale-[0.98]"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              boxShadow: '0 8px 20px rgba(59,130,246,0.3)',
            }}
          >
            Yes, remember this device
          </button>
          <button
            onClick={handleNo}
            className="w-full py-3 rounded-2xl font-bold text-sm transition-all"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Not now
          </button>
        </div>
      </div>
    </>
  );
}
