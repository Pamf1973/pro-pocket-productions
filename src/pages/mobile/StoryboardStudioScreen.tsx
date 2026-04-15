import BottomNav from '../../components/BottomNav';

interface Shot {
  id: number;
  title: string;
  description: string;
  timecode: string;
  angle: string;
  lens: string;
  lighting: string;
  photo: string;
}

const SHOTS: Shot[] = [
  {
    id: 1,
    title: 'Shot 01: The Wet Pavement',
    description: 'Exterior night. Rain reflects neon signs on asphalt. Slow tracking shot.',
    timecode: '00:01 - 00:04',
    angle: 'Low Angle',
    lens: '35mm Anamorphic',
    lighting: 'High Contrast',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUZcRLlltOeqNdsUCdv2UNCV6goLaRLpCfaWcok4eixt9Hx1-ZJMyvKH-oPeRXQnf2byHcu6yamHkLePy-0I-pHPpNk1zZpm5UO4C8KqW1cC4-hOI_EJNbtOS9WFk78GoP303YUbo7FvlvKI_ITMEdKef084qqv54-bbPGU39AJK65Vp8CG8oYWb-fi6VqZSuQk9aJqsAoM6IbZqc0vIwrDP7XG2TzgZGj6KQhIVXjssMTjvT0yj-UmRBSc9rO91zmzzZcNXcIC3DI',
  },
  {
    id: 2,
    title: 'Shot 02: Silhouette Arrival',
    description: 'A mysterious figure enters frame left. Fog thickens around the lamp post.',
    timecode: '00:04 - 00:08',
    angle: 'Wide Shot',
    lens: '50mm Standard',
    lighting: 'Backlit / Fog',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNYhdo8Fd-8iCwT7pAZ1K7rfrI4Dx_TrZRnfQ47z2JNMszN0pVnQJWr2CxpkWN3AUW0bzr0cVqx08C-Dcw0kTm2G1dZUdSaBcpbsnv839XN9vVXuUmCR-LT872jNUHbpuOnhcMJTB33j4sHvbWXpRYFHP0rCVvfwg7w-jL6eZZZ9Sym9FZO2bzc-SImhUXAU2c4aKDn7SAndUZT80Rt92XLduKp-hseDCkVn554WlQHUHp4P_ev4ViiIUDK2S6LOQrrixWgC04dazE',
  },
];

function ShotCard({ shot }: { shot: Shot }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative">
        <img
          src={shot.photo}
          alt={shot.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
          {shot.timecode}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{shot.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{shot.description}</p>
          </div>
          <button className="text-slate-400 hover:text-primary shrink-0">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
          {[
            { label: 'Angle', value: shot.angle },
            { label: 'Lens', value: shot.lens },
            { label: 'Lighting', value: shot.lighting },
          ].map((spec) => (
            <div key={spec.label} className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold uppercase text-slate-400">{spec.label}</span>
              <span className="text-[11px] font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StoryboardStudioScreen() {
  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-primary/20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">movie_filter</span>
            <div>
              <h1 className="text-sm font-bold uppercase tracking-wider leading-tight">
                Storyboard Studio
              </h1>
              <p className="text-[10px] font-medium text-primary uppercase">
                Project: Neo-Noir Sequence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="sticky top-[65px] z-10 flex items-center justify-between gap-2 border-b border-slate-200 dark:border-primary/10 bg-white dark:bg-slate-900/50 px-4 py-3">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold shadow-sm">
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            Upload
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            Blank
          </button>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          AI Generate
        </button>
      </div>

      {/* Shot List */}
      <main className="flex-1 space-y-4 p-4 pb-24">
        {SHOTS.map((shot) => (
          <ShotCard key={shot.id} shot={shot} />
        ))}

        {/* Add Next Shot */}
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm opacity-60">
          <div className="flex aspect-video w-full flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700">
              add_circle
            </span>
            <p className="mt-2 text-xs font-medium text-slate-400">Add Next Shot</p>
          </div>
        </div>
      </main>

      <BottomNav initialActive="crew" />
    </div>
  );
}
