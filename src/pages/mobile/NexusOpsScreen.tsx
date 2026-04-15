import BottomNav from '../../components/BottomNav';

const GANTT = [
  {
    title: 'Setup & Lighting',
    time: '04:00 - 06:30',
    lead: 'Marc Evans',
    progress: 100,
    status: 'COMPLETED',
    statusColor: 'text-green-500',
    borderColor: 'border-l-primary',
    opacity: '',
  },
  {
    title: 'Principal Photography',
    time: '07:00 - 14:00',
    lead: 'Sarah J.',
    progress: 45,
    status: 'IN PROGRESS',
    statusColor: 'text-primary animate-pulse',
    borderColor: 'border-l-primary/40',
    opacity: '',
  },
  {
    title: 'VFX Capture',
    time: '14:30 - 17:00',
    lead: 'Industrial Light',
    progress: 0,
    status: 'UPCOMING',
    statusColor: 'text-slate-500',
    borderColor: 'border-l-slate-700',
    opacity: 'opacity-60',
  },
];

const QUICK_ACTIONS = [
  { label: 'Assets', icon: 'layers' },
  { label: 'Maps', icon: 'location_on' },
  { label: 'Script', icon: 'auto_stories' },
  { label: 'Call Sheet', icon: 'groups' },
];

export default function NexusOpsScreen() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-md mx-auto bg-background-dark text-slate-100 shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">movie_filter</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tighter uppercase text-primary">Nexus Production</h1>
            <div className="flex items-center gap-1.5 opacity-70">
              <span className="material-symbols-outlined text-xs">schedule</span>
              <p className="text-[10px] font-medium uppercase tracking-widest">02:45:12 AM • Night Shoot</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="size-10 flex items-center justify-center rounded-full bg-white/5 border border-primary/10 hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary">notifications</span>
          </button>
          <div className="size-10 rounded-full border-2 border-primary/30 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi0MgP-FRjY23IzNWeo-xEKg4avefoy5fH5mOAimAuBRLJpsy-PmU_VziuDmTRQ57zG8MBY95m06uVi4_gxEs2qz10nkkJZ2j59HPfTAywozpDVguxBIYsPBJxhs_XgI8ZPlljeBiytEuye5J-hyXP5qboOeQsv7kwbwpK0OVWKZUU4tV_uwmXthumW39ZhPp-Ng5tvBXWtrVhRu6VeUrgkMlrMGwZOFLWvkvvKt0tdtif9BH3sGf8KJeZh_MKnjN5yJmtGBE6Zois"
              alt="Profile"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Budget Stats */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="bg-white/3 border border-primary/10 rounded-xl p-4 bg-gradient-to-br from-primary/15 to-transparent backdrop-blur-sm">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Total Budget</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">$4.2M</span>
              <span className="text-[10px] text-green-500 font-medium">+2.4%</span>
            </div>
            <div className="mt-3 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[65%]" />
            </div>
          </div>
          <div className="bg-white/3 border border-primary/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Daily Spend</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">$128K</span>
              <span className="text-[10px] text-primary/60 font-medium">On Track</span>
            </div>
            <div className="mt-3 flex gap-1 items-end h-4">
              {[2, 3, 4, 2, 3].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full ${i === 2 ? 'bg-primary' : i === 3 ? 'bg-primary/60' : 'bg-primary/40'}`}
                  style={{ height: `${h * 4}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Recording Banner */}
        <div className="px-4 mb-6">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-[16/9] shadow-2xl shadow-black/50 group">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7U1Gh4-kKaYostL_eEorsf99I_MqQ1acbIdsxccR9fO4r5oOUjw0z_8weTOkmmfRTt2CtAX4reSaK82QlAv3ZNbB2JDgjjcCaP6QQFKycjF_bME75dRJEEfFEZppwYR0Cq3pAx1-zKjmYu7pqIWjfEISAZ5S-dpRZRATrs5bo2yJqvi2rHzbI6WhTCKqOzkJ448p42yoso_Br-bvOqmgNEpOZ1qmOWnaX64qYsQSvBkFszpb2iTevdiyZNEgGkBIrLym0HTMnleEu"
              alt="Live recording scene"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-500">Live Recording</span>
              </div>
              <h2 className="text-2xl font-bold leading-none mb-1 text-white tracking-tight">
                NEO-TOKYO DRIFT: SCENE 82
              </h2>
              <p className="text-sm text-slate-300 font-medium mb-4">Unit A • Rooftop Location • Take 12</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all">
                  View Stream
                </button>
                <button className="px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest border border-white/10">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Gantt */}
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_view_day</span>
              Daily Gantt Summary
            </h3>
            <span className="text-[10px] font-medium opacity-50 uppercase">May 24, 2024</span>
          </div>
          <div className="space-y-3">
            {GANTT.map((item, i) => (
              <div
                key={i}
                className={`bg-white/3 border border-primary/10 backdrop-blur-sm rounded-xl p-3 border-l-4 ${item.borderColor} ${item.opacity}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-slate-100">{item.title}</span>
                  <span className="text-[10px] font-medium bg-primary/20 text-primary px-2 py-0.5 rounded uppercase">
                    {item.time}
                  </span>
                </div>
                <div className="w-full bg-primary/5 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] opacity-60">Lead: {item.lead}</span>
                  <span className={`text-[10px] font-bold ${item.statusColor}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-4 grid grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <button key={action.label} className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-2xl bg-white/3 border border-primary/10 flex items-center justify-center group-hover:bg-primary transition-all group-hover:shadow-lg group-hover:shadow-primary/30">
                <span className="material-symbols-outlined text-primary group-hover:text-white">
                  {action.icon}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100">
                {action.label}
              </span>
            </button>
          ))}
        </section>
      </main>

      <BottomNav initialActive="crew" />
    </div>
  );
}
