import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  onClose: () => void;
}

export default function UserMenu({ onClose }: UserMenuProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 mt-2 w-80 rounded-xl overflow-hidden z-50"
      style={{
        background: 'rgba(23,23,23,0.95)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
      }}
    >
      {/* Avatar + name */}
      <div className="p-6 flex flex-col items-center border-b border-white/5">
        <div className="size-16 rounded-full border-2 border-primary p-0.5 mb-4">
          <div className="size-full rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-xl">
            AR
          </div>
        </div>
        <h3 className="text-lg font-bold text-white">Alex Rivera</h3>
        <p className="text-xs text-slate-400 font-medium tracking-wide mb-3">EXECUTIVE PRODUCER</p>
        <button
          onClick={() => { navigate('/settings-desktop'); onClose(); }}
          className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors"
        >
          View Full Profile
        </button>
      </div>

      {/* Menu items */}
      <div className="p-2">
        <button
          onClick={() => { navigate('/settings-desktop'); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 group text-left"
        >
          <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">manage_accounts</span>
          <span className="text-sm text-slate-300">Account Settings</span>
          <span className="material-symbols-outlined ml-auto text-slate-700 text-sm">chevron_right</span>
        </button>
        <button
          onClick={() => { navigate('/team-desktop'); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 group text-left"
        >
          <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">groups</span>
          <span className="text-sm text-slate-300">Team Management</span>
          <span className="material-symbols-outlined ml-auto text-slate-700 text-sm">chevron_right</span>
        </button>
      </div>

      {/* Sign out */}
      <div className="p-2 border-t border-white/5">
        <button
          onClick={() => { navigate('/login'); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-500 group"
        >
          <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">logout</span>
          <span className="text-sm font-bold">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
