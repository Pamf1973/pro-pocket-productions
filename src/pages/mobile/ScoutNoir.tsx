import { useState } from 'react';
import BottomNav from '../../components/BottomNav';

type Filter = 'near' | 'urban' | 'neon' | 'rooftops';

interface Location {
  id: number;
  name: string;
  city: string;
  price: number;
  photo: string;
  permitStatus: { label: string; color: string };
  featured?: boolean;
  avatarStack?: boolean;
  actionButton?: string;
  extras?: 'sector7' | 'neonSkyline';
}

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: 'The Midnight Foundry',
    city: 'Los Angeles, Arts District',
    price: 240,
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpi15PIaYsvfxH-E45RENXH_qfU8nM2Vg1yR96bKMb8kmKStXuQ3vy55BI93ni-yD0iXh36nB1NA5HCBCSGAplQKM1QsvWnAJZtviy5eyRD7FZM8MrGMHqiPq7gGLTNsxwswgBp2V8VvkEDvcmxLkKg16kpFNaHaWU-f0rWo_WCK0SJXd76oB9IA6N1mmO1IEpNyNDx8zQycNzK-fvntjZSk9GGQ0z8tmfFzxl4wbQ_oQFGoACWweD-r-9PG4a2EYyESG2yVzoRKh1',
    permitStatus: { label: 'Permit Required', color: 'bg-red-600' },
    featured: true,
    avatarStack: true,
    actionButton: 'Secure Spot',
  },
  {
    id: 2,
    name: 'Sector 7 Underpass',
    city: 'Chicago, South Side',
    price: 85,
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAROQuJxhSMfgRgMmT7EP9g_gV6sPUoIYvToXmeK-tR6p5Wf5HNsjc_s-OcVDnF18-Q7dVKpUdSQSEmp1BpyUdnfwAVODF3OXATRbLkNVihmrobTJfr2yCpr1XFs-lfzyZbQIOt-GkGDy6b5O9lSHnRQKz7WA1ZMsF5DqslneDHlLyAM6MulVGKgHMGD-peh_mCfdpIDq27dIZqaDVZAXUDX7t3MPeVLLCSRZInZxSyVbA67dc7QZx3-uUFUexVizmMvcxZX-lhhFq7',
    permitStatus: { label: 'No Permit Needed', color: 'bg-green-600' },
    extras: 'sector7',
  },
  {
    id: 3,
    name: 'Neon Skyline Terrace',
    city: 'New York, Midtown',
    price: 450,
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhunedzMw0FkCcdGLT5ekqzdcWSKdwk4nc6-YGrGtXjf3W-sZe-m4JU0sXnQuTNWH4-49Q3NH3SqVn8a5-sr-ZpGWXBoFju6OFkydMxVz6uoyjUeJMrGKWKVdlb78D9ihVWLtdJBD5UVBeldRG4yBxPYbgX12kEoIFiZk_pXUGbpASlKXc-mxz0cpyzCTls66Ml66sVkgccreU1oIj3HSXvPrJ3W_joQtQiH1nkv-HQJJuC73HUgWAdZTfpKibX7IEK6E8RObFB-u9',
    permitStatus: { label: 'Pending Verification', color: 'bg-amber-500' },
    extras: 'neonSkyline',
  },
];

const AVATAR_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBV_Hyp-Ya7Z9Z-O5b7wRVn1qi2XNlv93g-CiA7eBZ5Dpx6_1Uv_12-eXsI19WcSRc2-GgDUr6BIYbBvqn62feoUIE_DyECfwOpcgIa44ECqx0OC1ylHXv2N1v7fxuboXAjPG46mZ995tXleyQ2UuAfsOymHDR3Gtm-cGCunFw-qsUQitnhFO7Jfpg_Yvgja5Fe7jGLc-2ogL3A-2MA0ALCuA5iCvufrWp0T_YrkKYgYpFFvNVPBF4k3b7o38BsadyDl-1DyHQoMicL',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA8AUPZeSUhU1KEXfMn60XUkUq03wyj3diZacOWwB6yzdYz-Qv07OnCEomYT4Z46HxFbGnZ8OFLb9YYvlSnAupoqipm81mZQHYEtPeMFtyHErA3bZHEyiUn5x8YYCEJ0w1w1tgghzNMLuyiIZtDphqpfDZ2kgtQdBCWyTmhsbE9OJ629v3XLkJlnw3_oAEt7MVYgPIMi3oRSv_9c3X4AC9N2eXLGQKeGuCyFQUGFKjtg1EGZ7nGwBhi407bauhfhRNfczxw68AAltep',
];

const FILTERS: { id: Filter; label: string; icon?: string }[] = [
  { id: 'near', label: 'Near Me', icon: 'near_me' },
  { id: 'urban', label: 'Urban Decay' },
  { id: 'neon', label: 'Neon Nights' },
  { id: 'rooftops', label: 'Rooftops' },
];

export default function ScoutNoir() {
  const [activeFilter, setActiveFilter] = useState<Filter>('near');

  return (
    <div className="relative flex flex-col min-h-screen max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">camera_outdoor</span>
          <h1 className="text-xl font-extrabold tracking-tighter uppercase italic">
            Scout<span className="text-primary">Noir</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined">map</span>
          </button>
          <button className="p-2 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar whitespace-nowrap border-b border-slate-100 dark:border-slate-800">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeFilter === f.id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent hover:border-primary/50'
            }`}
          >
            {f.icon && <span className="material-symbols-outlined text-sm">{f.icon}</span>}
            {f.label}
          </button>
        ))}
      </div>

      {/* Location Feed */}
      <main className="px-4 py-4 pb-24 space-y-6 overflow-y-auto flex-1">
        {LOCATIONS.map((loc) => (
          <article
            key={loc.id}
            className="relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(236,91,19,0.2)] border border-slate-200 dark:border-primary/5"
          >
            {/* Photo */}
            <div className="relative h-64 w-full overflow-hidden">
              <img src={loc.photo} alt={loc.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {/* Top badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 rounded ${loc.permitStatus.color} text-[10px] font-bold text-white tracking-widest uppercase`}>
                  {loc.permitStatus.label}
                </span>
                {loc.featured && (
                  <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white tracking-widest uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">verified</span> Featured
                  </span>
                )}
              </div>
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              {/* Bottom info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-white text-xl font-bold leading-tight">{loc.name}</h2>
                    <p className="text-slate-300 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {loc.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-primary text-xl font-black">${loc.price}</span>
                    <span className="text-slate-300 text-xs font-medium uppercase tracking-tighter"> / hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer — Midnight Foundry */}
            {loc.avatarStack && (
              <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                <div className="flex -space-x-2">
                  {AVATAR_URLS.map((url, i) => (
                    <div
                      key={i}
                      className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 overflow-hidden"
                    >
                      <img src={url} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="size-8 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-primary/20 text-primary text-[10px] font-bold">
                    +12
                  </div>
                </div>
                <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity">
                  Secure Spot
                </button>
              </div>
            )}

            {/* Sector 7 extras */}
            {loc.extras === 'sector7' && (
              <>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <div className="h-20 bg-slate-100 dark:bg-black/20 rounded-lg flex flex-col items-center justify-center border border-slate-200 dark:border-white/5">
                    <span className="material-symbols-outlined text-primary mb-1">map</span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Map View</span>
                  </div>
                  <div className="h-20 bg-slate-100 dark:bg-black/20 rounded-lg flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-primary mb-1">distance</span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">2.4 Miles</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-slate-900 dark:bg-primary text-white py-3 rounded-lg font-bold uppercase tracking-widest text-sm">
                    View Complete Files
                  </button>
                </div>
              </>
            )}

            {/* Neon Skyline extras */}
            {loc.extras === 'neonSkyline' && (
              <div className="p-4 flex gap-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex-1">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Equipment Provided</p>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                    <span className="material-symbols-outlined text-primary text-lg">wifi</span>
                    <span className="material-symbols-outlined text-primary text-lg">checkroom</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="bg-primary/20 text-primary p-3 rounded-xl border border-primary/30">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </main>

      <BottomNav initialActive="crew" />
    </div>
  );
}
