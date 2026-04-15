import { useState } from 'react';
import DesktopLayout from '../../components/DesktopLayout';

interface Location {
  id: number;
  name: string;
  subtitle: string;
  address: string;
  city: string;
  contact: string;
  contactPhone: string;
  status: 'confirmed' | 'scouting' | 'pending';
  rate: string;
  tags: string[];
  color: string;
  mapBg: string;
}

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: 'LA Soundstage Alpha',
    subtitle: 'Interior — Stage 4',
    address: '6000 W Hollywood Blvd, Stage 4',
    city: 'Los Angeles, CA 90028',
    contact: 'Maria Gomez',
    contactPhone: '+1 (310) 555-0182',
    status: 'confirmed',
    rate: '$4,500 / day',
    tags: ['Interior', 'Controlled', 'SAG Approved'],
    color: 'border-blue-500/30 bg-blue-600/5',
    mapBg: 'from-blue-900/40 to-slate-800',
  },
  {
    id: 2,
    name: 'Mojave Plateau Unit',
    subtitle: 'Exterior — Desert',
    address: 'Hwy 18, North Edwards Area',
    city: 'Mojave, CA 93501',
    contact: 'Derek Shaw',
    contactPhone: '+1 (760) 555-0294',
    status: 'scouting',
    rate: '$1,800 / day',
    tags: ['Exterior', 'Golden Hour', 'Permit Required'],
    color: 'border-amber-500/30 bg-amber-600/5',
    mapBg: 'from-amber-900/30 to-slate-800',
  },
  {
    id: 3,
    name: 'Red Hook Warehouse',
    subtitle: 'Interior — Industrial',
    address: '55 Commerce St, Unit 3',
    city: 'Brooklyn, NY 11231',
    contact: 'Tomas Velez',
    contactPhone: '+1 (718) 555-0411',
    status: 'confirmed',
    rate: '$3,200 / day',
    tags: ['Interior', 'Industrial', 'Practical Lighting'],
    color: 'border-purple-500/30 bg-purple-600/5',
    mapBg: 'from-purple-900/40 to-slate-800',
  },
];

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  confirmed: { label: 'Confirmed', cls: 'bg-green-500/10 text-green-400 border-green-500/20' },
  scouting: { label: 'Scouting', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  pending: { label: 'Pending', cls: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
};

export default function DesktopLocations() {
  const [selectedId, setSelectedId] = useState(1);

  const selected = LOCATIONS.find((l) => l.id === selectedId)!;
  const statusCfg = STATUS_CONFIG[selected.status];

  return (
    <DesktopLayout
      headerRight={
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-[16px]">add_location</span>
          Add Location
        </button>
      }
    >
      {/* Content — split panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Location cards list */}
        <div className="w-96 shrink-0 overflow-y-auto p-5 border-r border-white/5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-black text-white">Locations</h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase">{LOCATIONS.length} total</span>
          </div>

          {LOCATIONS.map((loc) => {
            const cfg = STATUS_CONFIG[loc.status];
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${loc.color} ${
                  selectedId === loc.id ? 'ring-2 ring-blue-500' : 'hover:brightness-110'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">{loc.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{loc.subtitle}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${cfg.cls}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{loc.city}</p>
                <div className="flex flex-wrap gap-1">
                  {loc.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}

          {/* Add New Location card */}
          <button className="w-full rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all flex flex-col items-center justify-center gap-2 p-6 text-slate-500 hover:text-blue-400 min-h-[100px]">
            <span className="material-symbols-outlined text-3xl">add_location_alt</span>
            <span className="text-xs font-bold uppercase tracking-widest">Add New Location</span>
          </button>
        </div>

        {/* Detail panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Map preview */}
          <div className={`rounded-xl h-52 bg-gradient-to-br ${selected.mapBg} border border-white/5 relative overflow-hidden flex items-center justify-center`}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px)',
            }} />
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-5xl text-blue-400/60">location_on</span>
              <span className="text-xs font-bold uppercase tracking-widest">Map Preview</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <button className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                Open in Maps
              </button>
            </div>
          </div>

          {/* Location detail */}
          <div className="rounded-xl bg-slate-900 border border-white/5 p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-black text-white">{selected.name}</h2>
                <p className="text-sm text-slate-400">{selected.subtitle}</p>
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${statusCfg.cls}`}>
                {statusCfg.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Address</p>
                <p className="text-sm text-white">{selected.address}</p>
                <p className="text-sm text-slate-400">{selected.city}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Day Rate</p>
                <p className="text-lg font-black text-white">{selected.rate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Location Contact</p>
                <p className="text-sm text-white">{selected.contact}</p>
                <p className="text-sm text-blue-400">{selected.contactPhone}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">event_available</span>
                Book Location
              </button>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium px-4 py-3 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit
              </button>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium px-4 py-3 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
