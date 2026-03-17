import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AssetType = 'all' | 'script' | 'footage' | 'audio';

interface Asset {
  id: number;
  type: 'script' | 'footage' | 'audio';
  title: string;
  meta: string;
  thumbnail?: string;
  icon?: string;
}

const ASSETS: Asset[] = [
  {
    id: 1,
    type: 'script',
    title: 'Neon_Nights_EP01.pdf',
    meta: 'Updated 2h ago • 2.4MB',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4MpFXpkp0s79mTo0_Dn0SLLUe4ovh83KskaQ0QtuPK88KJzhHClO7ry4ZltUWF-WbdXAfnJuSiKqsUsf5pL6HoaciVcxD3nQ5kQTCbezawtj04Ma9tQ4kXWcBaxLpBLtgBr736BPwha4t00cIr505gcutc-tKDaxTFElQ0yt5jgTVmQCa0v5Kj_1zTNWXH-zO13EQ907QXQCyXEanwd91KEfnWjzVbOy8I57sY9NaJGl6NVv72Dlo0F-v5ys69NqiVVK8cJAaYANp',
  },
  {
    id: 2,
    type: 'footage',
    title: 'Street_Chase_04.mp4',
    meta: '4K • 12s • 142MB',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqjnpx-7NAclnTw6CWyvJVzpT-c26mRitZI3ylF-HqNPvCj4K7L83FvaWA9s9Jctwe5p1G4X9UxwHWOw7JY8bD13j7AuyIIhhUAPn4qo0iBBgV2TrWF6KyodbdzDWZeQyljDwSkBnz2vN5BWUHjHs91EE3IsZHUIsBCnFPfcECu0u3HpgR_vlAZ6NMP7LbIIWonFykQdqcLPNuilw6DRjYIrjTwJlinWki7cwauT6hIYd1aijS7BmYeq6KHHEoqviypCMFC7GJ1YEj',
  },
  {
    id: 3,
    type: 'audio',
    title: 'Synthwave_OST.wav',
    meta: 'Stereo • 3:45 • 48MB',
    icon: 'graphic_eq',
  },
  {
    id: 4,
    type: 'footage',
    title: 'Title_Card_FX.mov',
    meta: 'ProRes • 05s • 210MB',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeZd3_vhsnX2j4aXfSczIs4ILsjSGEk9NkN0632yeJxi99Vx4GnioJl9xVb0PBH5LuxJUZJskmHdaL4eolqOvTz6XQTOv5vqCVtsb20bI_Pm1YqrcjO5Z-P6zeu4GcrcfDG8ks1ytwqUYZiqcH8rVdZe0ABwjtpqjo3ZVB0yHm6X5eBhquCw6_SVym5pTCvZRaJN2bgoGsBo9kqUNVyQ4fyjEllz6Ir-AnAcAPeFXOqzWoTkQ2kejGQx4W1jPS84xDuRqB6kAxLQGu',
  },
  {
    id: 5,
    type: 'script',
    title: 'Character_Bios.doc',
    meta: 'Updated Yesterday • 1.2MB',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbFsqT_I4SHdxTIO23WXeBf8A86d6Xux2TeR_fs3KiSgFxSMTAw8Pc5hRxxCPwB1a3ZqWqMKjhKLeK-f4BCCg_Iq_7knH5ErWLNbrW014BFlp0b0zhHqKRGaCasMne_xiF8A56K6A5J1sqHZzOIhYhJQsjTg0tVXDi88yyQsAUTJOkgoYAciKbOc4QWcQnBjeC04M2wVegF1jQpX5AkiE-fpU1ijBSrM5XuMjMdheB5DVpYmhGiEYRuQU4Rd3eapcuavRo4CrOJupa',
  },
  {
    id: 6,
    type: 'audio',
    title: 'Voice_Over_02.mp3',
    meta: 'Mono • 1:12 • 8MB',
    icon: 'mic',
  },
];

const TYPE_BADGE: Record<string, string> = {
  script: 'bg-amber-500',
  footage: 'bg-blue-500',
  audio: 'bg-emerald-500',
};

const FILTER_CHIPS: { id: AssetType; label: string; icon: string }[] = [
  { id: 'all', label: 'All Assets', icon: 'grid_view' },
  { id: 'script', label: 'Scripts', icon: 'description' },
  { id: 'footage', label: 'Footage', icon: 'movie' },
  { id: 'audio', label: 'Audio', icon: 'audiotrack' },
];

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div className="group relative bg-white dark:bg-primary/5 rounded-xl border border-primary/10 overflow-hidden shadow-sm hover:border-primary/40 transition-all cursor-pointer">
      <div className="aspect-[4/3] bg-slate-100 dark:bg-background-dark relative flex items-center justify-center overflow-hidden">
        {asset.thumbnail ? (
          <img
            src={asset.thumbnail}
            alt={asset.title}
            className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background-dark flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">{asset.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 rounded-md ${TYPE_BADGE[asset.type]} text-[10px] font-bold text-white uppercase tracking-wider`}
        >
          {asset.type}
        </span>
        {asset.type === 'footage' && (
          <span className="absolute bottom-2 right-2 material-symbols-outlined text-white text-lg">
            play_circle
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold truncate">{asset.title}</h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{asset.meta}</p>
      </div>
    </div>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<AssetType>('all');
  const [activeNav, setActiveNav] = useState<string>('crew');
  const [showToast, setShowToast] = useState(true);
  const [search, setSearch] = useState('');

  const filtered = ASSETS.filter((a) => {
    const matchesType = filter === 'all' || a.type === filter;
    const matchesSearch =
      search === '' || a.title.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="relative flex flex-col min-h-screen max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">token</span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AssetFlow
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="size-10 rounded-full border-2 border-primary overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoyiP6pvie-CsO-kCWyIx5yiRTITz6k9e8wYl8BjUbFZobnjg2ltZWy7EYjaDzEx1gABrgJwcdl9jvYHfNgJrfJbyps3kbhHbbgRjcJQqNB-iQYdASqlIJRzXTatineFDp_bCRNrveOASSz3qRCgEY0avlf2Wfhc0vDpstDedSvRi1zJZ5MzPQf5Plt9qqg9Kp4SkGn1w4BvsjdbYyQAOUtHvfwkrSXleLB7dXYOFG5V6AwR35-B4o_t4I79ZJgKbCJu_Is6uJYwei"
                alt="Profile"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-200/50 dark:bg-primary/5 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-200 placeholder:text-slate-500"
            placeholder="Search scripts, footage, audio..."
          />
        </div>
      </header>

      {/* Category Filter Chips */}
      <div className="px-4 py-4 flex gap-2 overflow-x-auto no-scrollbar">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setFilter(chip.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === chip.id
                ? 'bg-primary text-white font-semibold'
                : 'bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span
              className={`material-symbols-outlined text-sm ${filter === chip.id ? '' : 'text-primary'}`}
            >
              {chip.icon}
            </span>
            {chip.label}
          </button>
        ))}
      </div>

      {/* Main Asset Grid */}
      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Recent Projects
          </h2>
          <button className="text-primary text-sm font-semibold">View All</button>
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
            <p className="text-sm">No assets found</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-light dark:bg-background-dark border-t border-primary/20 px-6 py-3 pb-8 flex justify-between items-center z-20">
        {(['fleet', 'crew'] as const).map((id) => (
          <button
            key={id}
            onClick={() => setActiveNav(id)}
            className={`flex flex-col items-center gap-1 relative ${activeNav === id ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined">
              {id === 'fleet' ? 'directions_boat' : 'group'}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{id}</span>
            {id === 'crew' && (
              <div className="absolute -top-1 right-0 w-1.5 h-1.5 bg-primary rounded-full" />
            )}
          </button>
        ))}

        <div className="relative -top-6">
          <button
            onClick={() => navigate('/budget')}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-background-light dark:border-background-dark"
          >
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>

        {(['missions', 'intel'] as const).map((id) => (
          <button
            key={id}
            onClick={() => setActiveNav(id)}
            className={`flex flex-col items-center gap-1 ${activeNav === id ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined">
              {id === 'missions' ? 'target' : 'terminal'}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{id}</span>
          </button>
        ))}
      </nav>

      {/* Syncing Toast */}
      {showToast && (
        <div className="fixed bottom-28 left-4 right-4 max-w-sm mx-auto z-40">
          <div className="bg-slate-900/90 dark:bg-primary/20 border border-primary/30 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 shadow-xl">
            <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">sync</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">Syncing Assets...</p>
              <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-primary h-full w-[65%]" />
              </div>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="material-symbols-outlined text-slate-400 text-sm"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
