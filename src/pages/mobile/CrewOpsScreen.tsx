import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';

type CrewStatus = 'in-mission' | 'standby' | 'off-duty';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  status: CrewStatus;
  tags: string[];
  initials: string;
  color: string;
}

const CREW: CrewMember[] = [
  {
    id: 1,
    name: 'Elias Vance',
    role: 'Director of Photography',
    status: 'in-mission',
    tags: ['Lead', 'Camera'],
    initials: 'EV',
    color: '#ec5b13',
  },
  {
    id: 2,
    name: 'Sarah Kovic',
    role: 'Production Designer',
    status: 'standby',
    tags: ['Art Dept', 'Sets'],
    initials: 'SK',
    color: '#3b82f6',
  },
  {
    id: 3,
    name: 'Jax Thornton',
    role: 'Gaffer',
    status: 'in-mission',
    tags: ['Lighting', 'G&E'],
    initials: 'JT',
    color: '#10b981',
  },
  {
    id: 4,
    name: 'Lena Thorne',
    role: 'First Assistant Director',
    status: 'off-duty',
    tags: ['Scheduling', 'Set'],
    initials: 'LT',
    color: '#8b5cf6',
  },
  {
    id: 5,
    name: 'Marco Bell',
    role: 'Sound Mixer',
    status: 'standby',
    tags: ['Audio', 'Boom'],
    initials: 'MB',
    color: '#f59e0b',
  },
  {
    id: 6,
    name: 'Dana Park',
    role: 'Script Supervisor',
    status: 'in-mission',
    tags: ['Continuity'],
    initials: 'DP',
    color: '#ec4899',
  },
];

const STATUS_CONFIG: Record<CrewStatus, { label: string; color: string; bg: string }> = {
  'in-mission': { label: 'On Set', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  standby: { label: 'Standby', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
  'off-duty': { label: 'Off Duty', color: '#64748b', bg: 'rgba(100,116,139,0.12)' },
};

const STATS = [
  { label: 'Total Crew', value: '24', accent: '#ec5b13' },
  { label: 'On Set', value: '12', accent: '#10b981' },
  { label: 'Standby', value: '8', accent: '#3b82f6' },
  { label: 'Off Duty', value: '4', accent: '#64748b' },
];

export default function CrewOpsScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | CrewStatus>('all');

  const filtered = CREW.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className="flex flex-col min-h-screen max-w-md mx-auto"
      style={{ background: '#0a0f1a', fontFamily: "'Public Sans', sans-serif" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-20 px-5 pt-12 pb-4"
        style={{
          background: 'rgba(10,15,26,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Production
            </p>
            <h1 className="text-xl font-black text-white leading-tight">Crew Ops</h1>
          </div>
          <button
            onClick={() => navigate('/new-project')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #ec5b13, #c0410a)' }}
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            Add
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-28 space-y-5 pt-5">
        {/* Stats */}
        <section className="px-5">
          <div className="grid grid-cols-4 gap-2">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-3 flex flex-col items-center text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-xl font-black" style={{ color: s.accent }}>{s.value}</p>
                <p className="text-[9px] text-slate-500 font-medium mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Search */}
        <section className="px-5">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crew by name or role..."
              className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
        </section>

        {/* Filter tabs */}
        <section className="px-5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {(['all', 'in-mission', 'standby', 'off-duty'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="shrink-0 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all"
                style={{
                  background: filter === f ? '#ec5b13' : 'rgba(255,255,255,0.06)',
                  color: filter === f ? '#fff' : 'rgba(255,255,255,0.4)',
                  border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {f === 'all' ? 'All' : f === 'in-mission' ? 'On Set' : f === 'standby' ? 'Standby' : 'Off Duty'}
              </button>
            ))}
          </div>
        </section>

        {/* Crew list */}
        <section className="px-5 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {filtered.length} crew member{filtered.length !== 1 ? 's' : ''}
          </p>
          {filtered.map((member) => {
            const cfg = STATUS_CONFIG[member.status];
            return (
              <div
                key={member.id}
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Avatar */}
                <div
                  className="size-12 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
                  style={{ background: member.color + '22', border: `1px solid ${member.color}44` }}
                >
                  <span style={{ color: member.color }}>{member.initials}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-white truncate">{member.name}</p>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={{ color: cfg.color, background: cfg.bg }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{member.role}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <button
                  className="material-symbols-outlined shrink-0 text-[20px]"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  more_vert
                </button>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-10">
              <span className="material-symbols-outlined text-[40px] text-slate-700">group_off</span>
              <p className="text-slate-600 text-sm mt-2">No crew members found</p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
