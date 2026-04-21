import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';

type CrewStatus = 'in-mission' | 'standby' | 'off-duty';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  dept: string;
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
    dept: 'Camera',
    status: 'in-mission',
    tags: ['Lead', 'Camera'],
    initials: 'EV',
    color: '#ec5b13',
  },
  {
    id: 2,
    name: 'Sarah Kovic',
    role: 'Production Designer',
    dept: 'Art',
    status: 'standby',
    tags: ['Art Dept', 'Sets'],
    initials: 'SK',
    color: '#3b82f6',
  },
  {
    id: 3,
    name: 'Jax Thornton',
    role: 'Gaffer',
    dept: 'G&E',
    status: 'in-mission',
    tags: ['Lighting', 'G&E'],
    initials: 'JT',
    color: '#10b981',
  },
  {
    id: 4,
    name: 'Lena Thorne',
    role: 'First Assistant Director',
    dept: 'Directing',
    status: 'off-duty',
    tags: ['Scheduling', 'Set'],
    initials: 'LT',
    color: '#8b5cf6',
  },
  {
    id: 5,
    name: 'Marco Bell',
    role: 'Sound Mixer',
    dept: 'Audio',
    status: 'standby',
    tags: ['Audio', 'Boom'],
    initials: 'MB',
    color: '#f59e0b',
  },
  {
    id: 6,
    name: 'Dana Park',
    role: 'Script Supervisor',
    dept: 'Production',
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
  { label: 'Total Crew', value: '24', icon: 'group', color: '#ec5b13' },
  { label: 'On Set', value: '12', icon: 'videocam', color: '#10b981' },
  { label: 'Standby', value: '8', icon: 'pause_circle', color: '#3b82f6' },
  { label: 'Off Duty', value: '4', icon: 'nights_stay', color: '#64748b' },
];

type FilterOption = 'all' | CrewStatus;

const FILTER_LABELS: Record<FilterOption, string> = {
  all: 'All',
  'in-mission': 'On Set',
  standby: 'Standby',
  'off-duty': 'Off Duty',
};

export default function CrewOpsScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');

  const filtered = CREW.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.dept.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100svh',
        maxWidth: '448px',
        margin: '0 auto',
        background: '#0a0f1a',
        fontFamily: "'Public Sans', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          padding: '48px 20px 16px',
          background: 'rgba(10,15,26,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748b', margin: 0 }}>
              Production
            </p>
            <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.2 }}>
              Crew Ops
            </h1>
          </div>
          <button
            onClick={() => navigate('/new-project')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #ec5b13, #c0410a)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>person_add</span>
            Add
          </button>
        </div>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '112px' }}>

        {/* Stats grid */}
        <section style={{ padding: '20px 20px 0' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', marginBottom: '12px' }}>
            Overview
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: s.color }}>{s.icon}</span>
                </div>
                <p style={{ fontSize: '24px', fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Search */}
        <section style={{ padding: '20px 20px 0' }}>
          <div style={{ position: 'relative' }}>
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                color: '#475569',
                pointerEvents: 'none',
              }}
            >
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, or dept…"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '12px 16px 12px 40px',
                fontSize: '14px',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>
        </section>

        {/* Filter pills */}
        <section style={{ padding: '16px 20px 0' }}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {(['all', 'in-mission', 'standby', 'off-duty'] as FilterOption[]).map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    flexShrink: 0,
                    padding: '6px 16px',
                    borderRadius: '999px',
                    border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    background: active ? '#ec5b13' : 'rgba(255,255,255,0.06)',
                    color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                  }}
                >
                  {FILTER_LABELS[f]}
                </button>
              );
            })}
          </div>
        </section>

        {/* Crew list */}
        <section style={{ padding: '20px 20px 0' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', marginBottom: '12px' }}>
            {filtered.length} crew member{filtered.length !== 1 ? 's' : ''}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((member) => {
              const cfg = STATUS_CONFIG[member.status];
              return (
                <div
                  key={member.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    padding: '14px',
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: member.color + '22',
                      border: `1px solid ${member.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: member.color, fontSize: '13px', fontWeight: 900 }}>
                      {member.initials}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {member.name}
                      </p>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '999px',
                          color: cfg.color,
                          background: cfg.bg,
                          flexShrink: 0,
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '3px 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {member.role}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.06)',
                            color: 'rgba(255,255,255,0.35)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* More */}
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.2)' }}>
                      more_vert
                    </span>
                  </button>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#334155' }}>group_off</span>
                <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px' }}>No crew members found</p>
              </div>
            )}
          </div>
        </section>

      </main>

      <BottomNav />
    </div>
  );
}
