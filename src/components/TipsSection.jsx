import { Lightbulb, Sparkles } from 'lucide-react';

const baseTips = [
  'Rotate high-intensity chores weekly to prevent burnout.',
  'Swap a planning-heavy task with a physical task for balance.',
  'Use shared calendars to distribute constraint-heavy chores.',
];

export default function TipsSection({ results }) {
  const dynamicTip = (() => {
    if (!results) return null;
    if (results.loadBalance > 80) {
      return 'Load spread is highly uneven. Split one of the top-scoring chores or rotate it every other week.';
    }
    if (results.loadBalance > 40) {
      return 'A few chores are weighing heavier on someone. Try trading a planning-heavy task for a physical one.';
    }
    return 'Great balance! Save this snapshot and re-run monthly to keep things fair.';
  })();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-amber-300" />
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Tips</p>
          <h3 className="text-xl font-semibold">Ways to rebalance</h3>
        </div>
      </div>
      <div className="mt-4 space-y-3 text-sm text-slate-300">
        {dynamicTip && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-100">
            <Lightbulb className="mb-2 h-4 w-4" />
            {dynamicTip}
          </div>
        )}
        {baseTips.map((tip) => (
          <p key={tip} className="rounded-2xl border border-white/5 bg-white/5 p-4">
            {tip}
          </p>
        ))}
      </div>
    </div>
  );
}
