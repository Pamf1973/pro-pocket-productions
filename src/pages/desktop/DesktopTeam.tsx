import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopLayout from '../../components/DesktopLayout';

const DEPT_TABS = ['All Personnel', 'Camera', 'Grip & Electric', 'Art Dept'];

type MemberStatus = 'ON SET' | 'OFF CALL' | 'REMOTE';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  department: string;
  status: MemberStatus;
  contact: string;
  avatarColor: string;
  initials: string;
}

const CREW: CrewMember[] = [
  { id: 1, name: 'Julian Thorne', role: 'Director of Photography', department: 'Camera', status: 'ON SET', contact: 'j.thorne@noir.com', avatarColor: 'bg-amber-500', initials: 'JT' },
  { id: 2, name: 'Sasha Vane', role: 'Gaffer', department: 'Grip & Electric', status: 'OFF CALL', contact: 'sasha.v@noir.com', avatarColor: 'bg-teal-500', initials: 'SV' },
  { id: 3, name: 'Marcus Flint', role: 'Lead Set Decorator', department: 'Art Dept', status: 'REMOTE', contact: 'm.flint@noir.com', avatarColor: 'bg-slate-600', initials: 'MF' },
  { id: 4, name: 'Elena Rossi', role: '1st Assistant Director', department: 'Production', status: 'ON SET', contact: 'e.rossi@noir.com', avatarColor: 'bg-rose-500', initials: 'ER' },
  { id: 5, name: 'Diego Ferreira', role: 'B-Camera Operator', department: 'Camera', status: 'ON SET', contact: 'd.ferreira@noir.com', avatarColor: 'bg-blue-500', initials: 'DF' },
  { id: 6, name: 'Petra Kim', role: 'Lighting Technician', department: 'Grip & Electric', status: 'ON SET', contact: 'p.kim@noir.com', avatarColor: 'bg-purple-500', initials: 'PK' },
  { id: 7, name: 'Oscar Webb', role: 'Prop Master', department: 'Art Dept', status: 'OFF CALL', contact: 'o.webb@noir.com', avatarColor: 'bg-green-600', initials: 'OW' },
  { id: 8, name: 'Nadia Cross', role: 'Script Supervisor', department: 'Production', status: 'ON SET', contact: 'n.cross@noir.com', avatarColor: 'bg-pink-500', initials: 'NC' },
  { id: 9, name: 'Ray Okafor', role: 'Steadicam Operator', department: 'Camera', status: 'REMOTE', contact: 'r.okafor@noir.com', avatarColor: 'bg-indigo-500', initials: 'RO' },
  { id: 10, name: 'Lily Zhang', role: 'Art Director', department: 'Art Dept', status: 'ON SET', contact: 'l.zhang@noir.com', avatarColor: 'bg-orange-500', initials: 'LZ' },
];

const STATUS_CFG: Record<MemberStatus, { label: string; dot: string; badge: string }> = {
  'ON SET': { label: 'ON SET', dot: 'bg-green-500', badge: 'text-green-400 border-green-500/30 bg-green-500/10' },
  'OFF CALL': { label: 'OFF CALL', dot: 'bg-slate-400', badge: 'text-slate-400 border-slate-400/30 bg-slate-500/10' },
  'REMOTE': { label: 'REMOTE', dot: 'bg-amber-400', badge: 'text-amber-400 border-amber-400/30 bg-amber-500/10' },
};

const STATS = [
  { label: 'Total Crew', value: '142', change: '+5%', icon: 'groups', color: 'text-blue-400' },
  { label: 'Active on Set', value: '84', change: '-2%', icon: 'videocam', color: 'text-green-400' },
  { label: 'Departments', value: '12', change: '0%', icon: 'account_tree', color: 'text-blue-400' },
  { label: 'Pending Invites', value: '8', change: '+1%', icon: 'mail', color: 'text-amber-400' },
];

export default function DesktopTeam() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Personnel');
  const [page] = useState(1);

  const filtered = CREW.filter((m) => activeTab === 'All Personnel' || m.department === activeTab);

  return (
    <DesktopLayout
      headerRight={
        <button
          onClick={() => navigate('/new-project-desktop')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Project
        </button>
      }
    >
      <div className="flex-1 overflow-y-auto p-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/5 p-5 bg-slate-900/50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <span className={`material-symbols-outlined text-[20px] ${stat.color}`}>{stat.icon}</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-black text-white">{stat.value}</p>
                <span className={`text-xs font-bold mb-1 ${stat.change.startsWith('+') ? 'text-green-400' : stat.change.startsWith('-') ? 'text-red-400' : 'text-slate-500'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-3 h-0.5 w-full bg-blue-600/20 rounded-full">
                <div className="h-full bg-blue-500 rounded-full w-2/3" />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex border-b border-slate-800">
            {DEPT_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-colors -mb-px ${
                  activeTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              Add Personnel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/5 overflow-hidden bg-slate-900/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Name & Role', 'Department', 'Status', 'Contact', 'Actions'].map((col, i) => (
                  <th key={col} className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 ${i === 4 ? 'text-right' : 'text-left'}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => {
                const cfg = STATUS_CFG[member.status];
                return (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-9 rounded-full ${member.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {member.initials}
                        </div>
                        <div>
                          <p className="font-bold text-white">{member.name}</p>
                          <p className="text-[11px] text-slate-500">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{member.department}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        <span className={`size-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{member.contact}</td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
            <p className="text-xs text-slate-500">Showing 1-10 of 142 crew members</p>
            <div className="flex items-center gap-1">
              <button className="size-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`size-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                    p === page ? 'bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10 text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="size-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
