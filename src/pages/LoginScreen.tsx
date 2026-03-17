import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../utils/auth';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background — dark film studio atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7U1Gh4-kKaYostL_eEorsf99I_MqQ1acbIdsxccR9fO4r5oOUjw0z_8weTOkmmfRTt2CtAX4reSaK82QlAv3ZNbB2JDgjjcCaP6QQFKycjF_bME75dRJEEfFEZppwYR0Cq3pAx1-zKjmYu7pqIWjfEISAZ5S-dpRZRATrs5bo2yJqvi2rHzbI6WhTCKqOzkJ448p42yoso_Br-bvOqmgNEpOZ1qmOWnaX64qYsQSvBkFszpb2iTevdiyZNEgGkBIrLym0HTMnleEu")',
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{ background: 'rgba(15,20,30,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Pocket
              <br />
              Productions
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">
              Enter the Creative Workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Username or Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="director@pocketproductions.com"
                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-blue-500"
                  style={{ background: 'transparent' }}
                />
                <span className="text-sm text-slate-300">Remember Me</span>
              </label>
              <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', boxShadow: '0 8px 20px rgba(59,130,246,0.4)' }}
            >
              Sign In
            </button>
          </form>

          {/* Sign up */}
          <p className="text-center text-sm text-slate-400 mt-6">
            New to the studio?{' '}
            <button className="text-white font-bold hover:text-blue-300 transition-colors">
              Create Profile
            </button>
          </p>
        </div>

        {/* Version tag */}
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-4 text-center">
          Terminal Access 1.0.4 // Production Mode
        </p>
      </div>
    </div>
  );
}
