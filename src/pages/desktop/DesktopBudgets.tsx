import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeScript, formatCurrency, ScriptAnalysis } from '../../utils/scriptAnalyzer';

const SIDEBAR_NAV = [
  { label: 'Dashboard', icon: 'grid_view', route: '/dashboard' },
  { label: 'Projects', icon: 'folder_special', route: '/projects' },
  { label: 'Calendar', icon: 'calendar_month', route: '/calendar-desktop' },
  { label: 'Locations', icon: 'location_on', route: '/locations-desktop' },
  { label: 'Storyboard', icon: 'movie_filter', route: '/storyboard' },
  { label: 'Team', icon: 'group', route: '/crew' },
  { label: 'Assets', icon: 'layers', route: '/assets' },
];

const RECENT_ACTIVITY = [
  'Revised Cast Rates',
  'New Location Scout: Warehouse',
  'AI Storyboard Gen: Scene 14',
  'Updated Crew Gantt',
];

interface LineItem {
  category: string;
  description: string;
  estimated: string;
  actual: string;
  variance: string;
  varType: 'over' | 'under' | 'on';
  flag?: string;
}

const LINE_ITEMS: LineItem[] = [
  { category: 'Cast', description: 'Principal Actors — Day Rates', estimated: '$48,000', actual: '$51,200', variance: '+$3,200', varType: 'over', flag: 'SAG OT' },
  { category: 'Cast', description: 'Supporting Cast — 12 Players', estimated: '$18,000', actual: '$17,400', variance: '-$600', varType: 'under' },
  { category: 'Crew', description: 'Director of Photography', estimated: '$8,500', actual: '$8,500', variance: '$0', varType: 'on' },
  { category: 'Crew', description: 'Gaffer + Grip Package', estimated: '$6,200', actual: '$7,800', variance: '+$1,600', varType: 'over', flag: 'Overage' },
  { category: 'Crew', description: 'Sound Mixer + Boom Op', estimated: '$3,400', actual: '$3,400', variance: '$0', varType: 'on' },
  { category: 'Locations', description: 'Warehouse — Day Rate', estimated: '$4,500', actual: '$4,500', variance: '$0', varType: 'on' },
  { category: 'Locations', description: 'Permits — City of Los Angeles', estimated: '$2,200', actual: '$2,800', variance: '+$600', varType: 'over', flag: 'Permit' },
  { category: 'Equipment', description: 'Camera Package — ARRI Alexa', estimated: '$3,800', actual: '$3,800', variance: '$0', varType: 'on' },
  { category: 'Equipment', description: 'Lighting Rig — HMI Packages', estimated: '$2,100', actual: '$1,950', variance: '-$150', varType: 'under' },
  { category: 'Post', description: 'DIT + Data Management', estimated: '$1,200', actual: '$1,200', variance: '$0', varType: 'on' },
  { category: 'Misc', description: 'Catering — 55 Crew Members', estimated: '$2,750', actual: '$2,900', variance: '+$150', varType: 'over' },
  { category: 'Misc', description: 'Transportation — Vans & Drivers', estimated: '$1,800', actual: '$1,800', variance: '$0', varType: 'on' },
];

const SUMMARY_CARDS = [
  { label: 'Total Budget', value: '$12.5M', color: 'text-white' },
  { label: 'Spent to Date', value: '$8.2M', color: 'text-blue-400' },
  { label: 'Remaining', value: '$4.3M', color: 'text-green-400' },
  { label: 'Contingency', value: '$1.2M', color: 'text-amber-400' },
];

export default function DesktopBudgets() {
  const navigate = useNavigate();
  const [sagEnabled, setSagEnabled] = useState(true);
  const [aiQuery, setAiQuery] = useState('');
  const [scriptAnalysis, setScriptAnalysis] = useState<ScriptAnalysis | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const analysis = analyzeScript(text, file.name);
      setScriptAnalysis(analysis);
      setImporting(false);
    };
    reader.onerror = () => setImporting(false);
    reader.readAsText(file);
    // Reset input so the same file can be re-imported
    e.target.value = '';
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-display overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col bg-slate-900 border-r border-white/5">
        <div className="p-4 flex items-center gap-3 border-b border-white/5">
          <div className="size-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">movie_filter</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Pocket</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Productions</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {SIDEBAR_NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5 space-y-1">
          <button
            onClick={() => navigate('/install')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">install_mobile</span>
            Install App
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Settings
          </button>
        </div>
        <div className="p-4 border-t border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Recent Activity</p>
          <ul className="space-y-2">
            {RECENT_ACTIVITY.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 pb-4">
          <div className="rounded-lg p-3 bg-white/5 border border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2">Production Health</p>
            <div className="flex items-center gap-2 text-xs text-white">
              <span className="material-symbols-outlined text-green-400 text-sm">verified</span>
              SAG-AFTRA Compliant
            </div>
          </div>
        </div>
        <div className="px-4 pb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Storage</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-3/4" />
          </div>
          <p className="text-[10px] text-slate-500 mt-1">75% of 1TB used</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-white/5 bg-slate-900/50">
          <div className="relative w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search budget lines..."
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-300 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-white uppercase tracking-widest">Monday, March 9, 2026</p>
            <p className="text-xs text-blue-400 font-bold">10:45 AM</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export Budget
            </button>
            <button className="size-9 flex items-center justify-center rounded-full bg-white/5 text-slate-400 relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-bold text-white text-right">Alex Rivera</p>
                <p className="text-[10px] text-slate-400 text-right">Executive Producer</p>
              </div>
              <div className="size-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* AI Assistant Bar */}
          <div className="rounded-xl bg-gradient-to-r from-blue-900/40 to-slate-900/40 border border-blue-500/20 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 rounded-lg bg-blue-600/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-400 text-[18px]">smart_toy</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">AI Budget Analyst</p>
                <p className="text-[10px] text-blue-400">3 anomalies detected in today's actuals</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">SAG-AFTRA Mode</span>
                <button
                  onClick={() => setSagEnabled(!sagEnabled)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${sagEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${sagEnabled ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
            {/* Anomaly flags */}
            <div className="flex gap-3 mb-3">
              {[
                { label: 'Cast OT Detected', icon: 'warning', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
                { label: 'Grip Package Overage', icon: 'error_outline', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
                { label: 'Permit Variance', icon: 'info', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
              ].map((flag) => (
                <div key={flag.label} className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border ${flag.color}`}>
                  <span className={`material-symbols-outlined text-[14px]`}>{flag.icon}</span>
                  {flag.label}
                </div>
              ))}
            </div>
            {/* AI query input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder='Ask AI: "What if we cut the grip package by 20%?"'
                className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm text-slate-300 placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">send</span>
                Analyze
              </button>
              {/* Screenplay upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.fdx,.fountain"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px]">{importing ? 'hourglass_top' : 'upload_file'}</span>
                {importing ? 'Analysing…' : 'Import Screenplay'}
              </button>
            </div>
          </div>

          {/* Script analysis banner */}
          {scriptAnalysis && (
            <div className="rounded-xl bg-gradient-to-r from-green-900/30 to-slate-900/40 border border-green-500/20 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">Screenplay Analysed</p>
                  <p className="text-base font-bold text-white">{scriptAnalysis.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{scriptAnalysis.summary}</p>
                </div>
                <div className="flex items-center gap-4 text-center ml-6 shrink-0">
                  <div>
                    <p className="text-xl font-black text-white">{scriptAnalysis.pageCount}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Pages</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-white">{scriptAnalysis.sceneCount}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Scenes</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-white">{scriptAnalysis.estimatedDays}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Shoot Days</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-green-400">{formatCurrency(scriptAnalysis.totalEstimate)}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Est. Total</p>
                  </div>
                  <button
                    onClick={() => setScriptAnalysis(null)}
                    className="ml-2 text-slate-500 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Budget table */}
          <div className="rounded-xl bg-slate-900 border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h2 className="text-sm font-bold text-white">
                {scriptAnalysis ? `Generated Budget — ${scriptAnalysis.title}` : 'Line Items — Day 42'}
              </h2>
              <span className="text-xs text-slate-400">
                {scriptAnalysis ? `${scriptAnalysis.lineItems.length} line items` : 'March 9, 2026'}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Category</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">{scriptAnalysis ? 'Qty' : 'Estimated'}</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">{scriptAnalysis ? 'Rate' : 'Actual'}</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">{scriptAnalysis ? 'Total' : 'Variance'}</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {scriptAnalysis
                    ? scriptAnalysis.lineItems.map((item, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-300">{item.description}</td>
                          <td className="px-4 py-3 text-right font-mono text-slate-400">{item.qty}</td>
                          <td className="px-4 py-3 text-right font-mono text-slate-400">{item.rate}</td>
                          <td className="px-4 py-3 text-right font-mono text-white font-medium">{formatCurrency(item.total)}</td>
                          <td className="px-4 py-3">
                            {item.flag && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                {item.flag}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    : LINE_ITEMS.map((item, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-300">{item.description}</td>
                          <td className="px-4 py-3 text-right font-mono text-slate-400">{item.estimated}</td>
                          <td className="px-4 py-3 text-right font-mono text-white font-medium">{item.actual}</td>
                          <td className={`px-4 py-3 text-right font-mono font-bold ${
                            item.varType === 'over' ? 'text-red-400' : item.varType === 'under' ? 'text-green-400' : 'text-slate-500'
                          }`}>
                            {item.variance}
                          </td>
                          <td className="px-4 py-3">
                            {item.flag && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                {item.flag}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4">
            {scriptAnalysis
              ? [
                  { label: 'Total Estimate', value: formatCurrency(scriptAnalysis.totalEstimate), color: 'text-white' },
                  { label: 'Shoot Days', value: `${scriptAnalysis.estimatedDays} days`, color: 'text-blue-400' },
                  { label: 'Scenes', value: scriptAnalysis.sceneCount.toString(), color: 'text-green-400' },
                  { label: 'Locations', value: scriptAnalysis.locations.length.toString(), color: 'text-amber-400' },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl p-4 bg-slate-900 border border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{card.label}</p>
                    <p className={`text-2xl font-black ${card.color}`}>{card.value}</p>
                  </div>
                ))
              : SUMMARY_CARDS.map((card) => (
                  <div key={card.label} className="rounded-xl p-4 bg-slate-900 border border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{card.label}</p>
                    <p className={`text-2xl font-black ${card.color}`}>{card.value}</p>
                  </div>
                ))}
          </div>
        </main>
      </div>
    </div>
  );
}
