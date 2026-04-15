import { useState } from 'react';
import DesktopLayout from '../../components/DesktopLayout';

// October 2024: starts on Tuesday (index 2)
const MONTH_START_DOW = 2; // 0=Sun
const DAYS_IN_MONTH = 31;
const MONTH_NAME = 'October 2024';

// Production spans: [startDay, endDay, label, color]
const SPANS = [
  { start: 1, end: 8, label: 'Pre-production', color: 'bg-blue-600/30 text-blue-300 border-blue-500/30' },
  { start: 9, end: 25, label: 'Filming', color: 'bg-purple-600/30 text-purple-300 border-purple-500/30' },
  { start: 26, end: 31, label: 'Post-production', color: 'bg-teal-600/30 text-teal-300 border-teal-500/30' },
];

// Day-level event pills
const DAY_EVENTS: Record<number, { label: string; color: string }[]> = {
  3: [{ label: 'Crew Kickoff', color: 'bg-blue-500/20 text-blue-300' }],
  7: [{ label: 'Read-Through', color: 'bg-blue-500/20 text-blue-300' }],
  10: [{ label: 'Scene 1–5', color: 'bg-purple-500/20 text-purple-300' }],
  14: [{ label: 'Scene 6–12', color: 'bg-purple-500/20 text-purple-300' }, { label: 'SAG Audit', color: 'bg-amber-500/20 text-amber-300' }],
  18: [{ label: 'Location: Warehouse', color: 'bg-purple-500/20 text-purple-300' }],
  21: [{ label: 'Chase Sequence', color: 'bg-purple-500/20 text-purple-300' }],
  24: [{ label: 'Pickups', color: 'bg-purple-500/20 text-purple-300' }],
  28: [{ label: 'Color Grade', color: 'bg-teal-500/20 text-teal-300' }],
  31: [{ label: 'Rough Cut', color: 'bg-teal-500/20 text-teal-300' }],
};

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getSpanForDay(day: number) {
  return SPANS.find((s) => day >= s.start && day <= s.end);
}

export default function DesktopCalendar() {
  const [selectedDay, setSelectedDay] = useState(14);

  // Build grid cells: leading blanks + days
  const cells: (number | null)[] = [
    ...Array(MONTH_START_DOW).fill(null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const today = 9; // "today" marker

  return (
    <DesktopLayout
      headerRight={
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Add Event
        </button>
      }
    >
      <div className="flex-1 overflow-y-auto p-6">
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-white">{MONTH_NAME}</h1>
            <div className="flex gap-1">
              <button className="size-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4">
            {SPANS.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm border ${s.color}`} />
                <span className="text-[11px] text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar grid */}
        <div className="rounded-xl bg-slate-900 border border-white/5 overflow-hidden">
          {/* DOW header */}
          <div className="grid grid-cols-7 border-b border-white/5">
            {DOW_LABELS.map((d) => (
              <div key={d} className="py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
                {d}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {Array.from({ length: cells.length / 7 }, (_, weekIdx) => {
            const week = cells.slice(weekIdx * 7, weekIdx * 7 + 7);
            return (
              <div key={weekIdx} className="grid grid-cols-7 border-b border-white/5 last:border-b-0">
                {week.map((day, colIdx) => {
                  const span = day ? getSpanForDay(day) : null;
                  const isSelected = day === selectedDay;
                  const isToday = day === today;
                  const events = day ? (DAY_EVENTS[day] ?? []) : [];

                  const isSpanStart = span && day === span.start;
                  const colInWeek = colIdx;
                  const isWeekStart = colInWeek === 0;
                  const isWeekEnd = colInWeek === 6;

                  return (
                    <div
                      key={colIdx}
                      onClick={() => day && setSelectedDay(day)}
                      className={`min-h-[100px] p-2 border-r border-white/5 last:border-r-0 cursor-pointer transition-colors ${
                        day ? (isSelected ? 'bg-blue-900/20' : 'hover:bg-white/[0.02]') : 'opacity-30'
                      }`}
                    >
                      {/* Day number */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                            isToday
                              ? 'bg-blue-600 text-white'
                              : isSelected
                              ? 'bg-blue-600/30 text-blue-300'
                              : 'text-slate-400'
                          }`}
                        >
                          {day ?? ''}
                        </span>
                      </div>

                      {/* Production span bar */}
                      {span && day && (
                        <div
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded mb-1 border truncate ${span.color} ${
                            isSpanStart
                              ? 'rounded-l-full'
                              : span.end === day || isWeekEnd
                              ? 'rounded-r-full'
                              : ''
                          } ${!isSpanStart && !isWeekStart ? 'rounded-l-none' : ''}`}
                        >
                          {isSpanStart || isWeekStart ? span.label : ''}
                        </div>
                      )}

                      {/* Day events */}
                      {events.map((ev) => (
                        <div key={ev.label} className={`text-[10px] font-medium px-1.5 py-0.5 rounded mb-0.5 truncate ${ev.color}`}>
                          {ev.label}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Selected day detail */}
        {selectedDay && (
          <div className="mt-4 rounded-xl bg-slate-900 border border-white/5 p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-blue-400">event</span>
              <h3 className="text-sm font-bold text-white">October {selectedDay}, 2024</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSpanForDay(selectedDay)?.color ?? 'text-slate-400 bg-white/5 border-white/10'}`}>
                {getSpanForDay(selectedDay)?.label ?? 'No Phase'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(DAY_EVENTS[selectedDay] ?? [{ label: 'No events scheduled', color: 'bg-white/5 text-slate-500' }]).map((ev) => (
                <span key={ev.label} className={`text-xs font-medium px-3 py-1.5 rounded-lg ${ev.color}`}>
                  {ev.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}
