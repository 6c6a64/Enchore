import { Brain, CalendarClock, Clock4, Dumbbell, Info } from 'lucide-react';

const factorMeta = {
  time: {
    label: 'Time',
    icon: Clock4,
    gradient: 'from-blue-500/50 to-blue-600/30',
    description: 'Hours spent, repetition, and how often it interrupts other work.',
  },
  physical: {
    label: 'Physical',
    icon: Dumbbell,
    gradient: 'from-purple-500/50 to-purple-600/30',
    description: 'Muscular effort, posture strain, and how taxing it feels on the body.',
  },
  mental: {
    label: 'Mental',
    icon: Brain,
    gradient: 'from-amber-500/60 to-amber-600/30',
    description: 'Planning, organization, and decision-making effort required.',
  },
  constraints: {
    label: 'Constraints',
    icon: CalendarClock,
    gradient: 'from-rose-500/60 to-rose-600/30',
    description: 'Urgency, fixed timing, deadlines, or hard-to-move commitments.',
  },
};

const intensityLabels = ['Very light', 'Light', 'Medium', 'Heavy', 'Intense'];
const points = [1, 2, 3, 4, 5];

export default function RatingSlider({ factor, value, onChange }) {
  const meta = factorMeta[factor];
  const Icon = meta.icon;

  return (
    <div className={`rounded-2xl bg-gradient-to-r ${meta.gradient} p-3 text-slate-950`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-wide" title={meta.description}>
          <Icon className="h-3.5 w-3.5" />
          {meta.label}
          <Info className="h-3 w-3 opacity-70" />
        </div>
        <span className="text-xs font-semibold">{value}</span>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1.5 text-[0.55rem]" aria-label={`${meta.label} intensity`}>
        {points.map((point, index) => {
          const active = point === value;
          const filled = point <= value;
          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              className={`rounded-lg border px-1 py-2 text-center font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/60 ${
                active
                  ? 'border-white bg-white text-slate-900'
                  : filled
                  ? 'border-white/70 bg-white/30 text-slate-900'
                  : 'border-white/20 bg-white/5 text-white'
              }`}
              title={`${meta.label}: ${intensityLabels[index]}`}
            >
              <span className="block text-sm font-bold leading-tight">{point}</span>
              <span className="leading-tight uppercase tracking-wide">{intensityLabels[index]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
