import WeightSlider from './WeightSlider';
import WeightDonutChart from './WeightDonutChart';

const factors = ['time', 'physical', 'mental', 'constraints'];

const defaultWeights = { time: 0.25, physical: 0.25, mental: 0.25, constraints: 0.25 };

export default function CustomWeightEditor({ weights = defaultWeights, onChange }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        {factors.map((factor) => (
          <WeightSlider key={factor} factor={factor} value={weights[factor]} onChange={(value) => onChange(factor, value)} />
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h4 className="text-sm uppercase tracking-wide text-slate-400">Live weighting</h4>
        <WeightDonutChart weights={weights} />
        <div className="text-center text-sm text-slate-400">
          Sum: {Math.round(Object.values(weights).reduce((sum, val) => sum + val, 0) * 100)}%
        </div>
      </div>
    </div>
  );
}
