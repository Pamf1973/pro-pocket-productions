import { useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import DesktopLayout from '../../components/DesktopLayout';

export default function DesktopSettings() {
  const { user, isLoaded } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [jobTitle, setJobTitle] = useState('Executive Producer');
  const [twoFactor] = useState(true);
  const [notifications, setNotifications] = useState([true, true, false]);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isLoaded || !user) return null;

  const name = user.fullName ?? user.firstName ?? 'Producer';
  const email = user.primaryEmailAddress?.emailAddress ?? '';
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const photoUrl = user.imageUrl;

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      await user.update({ firstName, lastName });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      await user.setProfileImage({ file });
    } catch {
      // silently fail — Clerk shows its own error
    } finally {
      setPhotoUploading(false);
    }
  };

  return (
    <DesktopLayout
      headerRight={
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">{saving ? 'sync' : 'save'}</span>
          {saving ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
        </button>
      }
    >
      <div className="max-w-4xl mx-auto p-8 space-y-10">
        {/* Save status banner */}
        {saveStatus === 'saved' && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Profile saved successfully.
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold">
            <span className="material-symbols-outlined text-[18px]">error</span>
            Failed to save. Please try again.
          </div>
        )}

        {/* Profile header */}
        <section className="flex flex-col md:flex-row gap-8 items-center md:items-end justify-between border-b border-slate-800 pb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar + upload */}
            <div className="relative group">
              <div className="h-36 w-36 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-amber-500 flex items-center justify-center">
                {photoUrl ? (
                  <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-black text-5xl">{initials}</span>
                )}
                {photoUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-3xl">
                    <span className="material-symbols-outlined text-white text-3xl animate-spin">sync</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={photoUploading}
                className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

            <div className="text-center md:text-left space-y-1">
              <h2 className="text-3xl font-bold tracking-tight text-white">{name}</h2>
              <p className="text-slate-400 font-medium">{jobTitle}</p>
              <p className="text-slate-500 text-sm">{email}</p>
              <div className="flex gap-2 pt-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-full border border-blue-600/30 uppercase">
                  {user.organizationMemberships?.[0]?.role ?? 'Member'}
                </span>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:brightness-110 shadow-lg transition-all disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </section>

        {/* Form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Account Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                <span className="material-symbols-outlined text-sm">person</span>
              </div>
              <h3 className="text-xl font-bold text-white">Account Details</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'First Name', value: firstName, set: setFirstName },
                { label: 'Last Name', value: lastName, set: setLastName },
                { label: 'Job Title', value: jobTitle, set: setJobTitle },
              ].map(({ label, value, set }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">{label}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none px-4 py-3 text-sm text-slate-200"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Email Address</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                />
                <p className="text-[10px] text-slate-600">Email is managed by your Clerk account</p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                <span className="material-symbols-outlined text-sm">security</span>
              </div>
              <h3 className="text-xl font-bold text-white">Security</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-800 flex items-center justify-between" style={{ background: 'rgba(23,23,23,0.8)' }}>
                <div>
                  <p className="font-bold text-sm text-slate-200">Two-Factor Authentication</p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tight">
                    {twoFactor ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${twoFactor ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-700 text-slate-400'}`}>
                  {twoFactor ? 'Active' : 'Off'}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 flex items-center justify-between" style={{ background: 'rgba(23,23,23,0.8)' }}>
                <div>
                  <p className="font-bold text-sm text-slate-200">Password</p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tight">Managed via Clerk</p>
                </div>
                <a
                  href="https://accounts.clerk.dev/user"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 text-xs font-bold uppercase hover:underline tracking-widest"
                >
                  Manage →
                </a>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 flex items-center justify-between" style={{ background: 'rgba(23,23,23,0.8)' }}>
                <div>
                  <p className="font-bold text-sm text-slate-200">Connected Accounts</p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tight">
                    {user.externalAccounts.length > 0
                      ? user.externalAccounts.map((a) => a.provider).join(', ')
                      : 'None connected'}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-500">link</span>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                <span className="material-symbols-outlined text-sm">notifications_active</span>
              </div>
              <h3 className="text-xl font-bold text-white">Notifications</h3>
            </div>
            <div className="space-y-3">
              {[
                'Production alerts & timeline changes',
                'Daily team briefing summaries',
                'External API integration logs',
              ].map((label, i) => (
                <label
                  key={label}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
                  style={{ background: 'rgba(23,23,23,0.8)' }}
                >
                  <input
                    type="checkbox"
                    checked={notifications[i]}
                    onChange={(e) => setNotifications((prev) => prev.map((v, idx) => idx === i ? e.target.checked : v))}
                    className="rounded border-slate-700 text-blue-500 focus:ring-blue-500 h-4 w-4 bg-slate-800"
                  />
                  <span className="text-sm font-medium text-slate-300">{label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Account Info */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                <span className="material-symbols-outlined text-sm">info</span>
              </div>
              <h3 className="text-xl font-bold text-white">Account Info</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'User ID', value: user.id },
                { label: 'Created', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—' },
                { label: 'Last Sign In', value: user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-xl border border-slate-800" style={{ background: 'rgba(23,23,23,0.8)' }}>
                  <p className="text-xs font-bold uppercase text-slate-500 tracking-widest">{label}</p>
                  <p className="text-xs text-slate-300 font-mono truncate max-w-[180px]">{value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <section className="pt-10 border-t border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-center text-slate-500">
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'System Status'].map((link) => (
              <button key={link} className="text-[10px] uppercase font-bold tracking-widest hover:text-blue-400 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Pocket Productions v1.0.4</p>
        </section>
      </div>
    </DesktopLayout>
  );
}
