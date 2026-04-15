import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Oct 2023 starts on Sunday
const CALENDAR_CELLS = [
  { day: 27, currentMonth: false },
  { day: 28, currentMonth: false },
  { day: 29, currentMonth: false },
  { day: 30, currentMonth: false },
  { day: 1, currentMonth: true, hasEvent: true },
  { day: 2, currentMonth: true },
  { day: 3, currentMonth: true },
  { day: 4, currentMonth: true },
  { day: 5, currentMonth: true, isToday: true },
  { day: 6, currentMonth: true },
  { day: 7, currentMonth: true, hasEventFaint: true },
  { day: 8, currentMonth: true },
  { day: 9, currentMonth: true },
  { day: 10, currentMonth: true },
  { day: 11, currentMonth: true },
  { day: 12, currentMonth: true },
  { day: 13, currentMonth: true },
  { day: 14, currentMonth: true },
  { day: 15, currentMonth: true },
  { day: 16, currentMonth: true, hasEvent: true },
  { day: 17, currentMonth: true },
];

interface AgendaItem {
  id: number;
  time: string;
  period: string;
  title: string;
  subtitle: string;
  variant: 'primary' | 'neutral' | 'highlight';
  icon?: string;
  avatars?: string[];
}

const AGENDA: AgendaItem[] = [
  {
    id: 1,
    time: '09:00',
    period: 'AM',
    title: 'Morning Standup',
    subtitle: 'Project Delta Sync • Team Lead Office',
    variant: 'primary',
    icon: 'videocam',
  },
  {
    id: 2,
    time: '11:30',
    period: 'AM',
    title: 'Client Review',
    subtitle: 'Feedback session for UX Audit',
    variant: 'neutral',
    avatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWZ6BjRSqvurdnA-LxvJkICLM-eKLP2k2YAXZRnEEm933cOo20BpeAmccupjVf6cHKyCxTqssaqBQy66dx9CvbzBEZGQ_UMcxtM3_i045BP5v6uCw9QaGkyACpdjUgIn2td55MlTw6TZZ6pYSG964oygeyFDSG01BSYs-2Jf37bFWdzeRgyNNuWpIs3mBsBJnmWSGoMMYxH_5sF2ZaDkWD1a3jQHos_YtJyAifRXiXxaRdBfaHHHFPKWCg-scN8z9y55slA5A877fB',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgeLFClRPBi0zUjcN1HdibLJpY4VPu5eMWrj4xwh64MvIkZUmw-9CIp5SYasaDxulT280osG18GLvRsdeDDDZtt1MAWFfMYzcxNY35yHFdnziD33ri1q3RaGz6cRzR1hySfl57-rN0cDRqBhWEYdQVjpPiPbAx-yIu-5wB6YNLQmaFU_-X34J4kyUxsOLN6SbH_w-skJ4PcKvifZqIvMJn8zXvugcLwG6jE-XUgQ8BPQaGttik2Wnz3imAQXKgXi0XjauLvlWR86-7',
    ],
  },
  {
    id: 3,
    time: '02:00',
    period: 'PM',
    title: 'Design Sprint',
    subtitle: 'Workshop Room B • Core Design Team',
    variant: 'highlight',
    icon: 'location_on',
  },
  {
    id: 4,
    time: '04:30',
    period: 'PM',
    title: 'Email Triage',
    subtitle: 'Review pending tasks',
    variant: 'neutral',
  },
];

export default function ScheduleScreen() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(5);

  return (
    <div className="relative flex flex-col min-h-screen max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">menu</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight">Schedule</h1>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">search</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Calendar */}
        <section className="p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                <span className="material-symbols-outlined text-primary">chevron_left</span>
              </button>
              <h2 className="text-base font-bold">October 2023</h2>
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </button>
            </div>
            <div className="grid grid-cols-7 text-center py-2 bg-slate-50/50 dark:bg-slate-800/50">
              {DAYS.map((d) => (
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {d}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800">
              {CALENDAR_CELLS.map((cell, i) => (
                <button
                  key={i}
                  onClick={() => cell.currentMonth && setSelectedDay(cell.day)}
                  className={`h-14 flex items-center justify-center text-sm relative transition-colors ${
                    cell.isToday && selectedDay === cell.day
                      ? 'bg-primary text-white font-bold shadow-[0_0_15px_rgba(236,91,19,0.3)]'
                      : cell.currentMonth
                      ? selectedDay === cell.day
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
                      : 'bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-600'
                  }`}
                >
                  {cell.day}
                  {cell.hasEvent && selectedDay !== cell.day && (
                    <div className="absolute bottom-2 size-1 bg-primary rounded-full" />
                  )}
                  {cell.hasEventFaint && selectedDay !== cell.day && (
                    <div className="absolute bottom-2 size-1 bg-primary/40 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda */}
        <section className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4 mt-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Today's Agenda</h3>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">Thu, Oct 5</span>
          </div>
          <div className="space-y-3">
            {AGENDA.map((item) => (
              <div
                key={item.id}
                className={`group flex items-start gap-4 p-4 rounded-xl shadow-sm transition-all ${
                  item.variant === 'primary'
                    ? 'bg-white dark:bg-slate-900 border-l-4 border-primary hover:shadow-md'
                    : item.variant === 'highlight'
                    ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-primary'
                    : 'bg-white dark:bg-slate-900 border-l-4 border-slate-300 dark:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex flex-col items-center justify-center min-w-[50px]">
                  <span
                    className={`text-sm font-bold ${item.variant === 'highlight' ? 'text-primary' : 'text-slate-900 dark:text-slate-100'}`}
                  >
                    {item.time}
                  </span>
                  <span
                    className={`text-[10px] font-medium uppercase ${item.variant === 'highlight' ? 'text-primary' : 'text-slate-400'}`}
                  >
                    {item.period}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                </div>
                {item.icon && (
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                )}
                {item.avatars && (
                  <div className="flex -space-x-2">
                    {item.avatars.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="Avatar"
                        className="size-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav onAdd={() => navigate('/new-project')} />
    </div>
  );
}
