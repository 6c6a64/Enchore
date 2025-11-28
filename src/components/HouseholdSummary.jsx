import ComparisonBarChart from './ComparisonBarChart';
import DistributionChart from './DistributionChart';

const fairnessText = (spread) => {
  if (spread > 120) return 'Highly uneven';
  if (spread > 70) return 'Needs attention';
  return 'Fairly balanced';
};

export default function HouseholdSummary({ results }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Household load</p>
          <h3 className="text-3xl font-semibold">{Math.round(results.householdTotal)} pts</h3>
          <p className="text-sm text-slate-400">{fairnessText(results.loadBalance)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-wide text-slate-400">Load spread</p>
          <p className="text-2xl font-semibold">{Math.round(results.loadBalance)}</p>
        </div>
      </div>
      <div>
        <h4 className="text-sm uppercase tracking-wide text-slate-400">Member comparison</h4>
        <ComparisonBarChart members={results.memberScores} />
      </div>
      <div>
        <h4 className="text-sm uppercase tracking-wide text-slate-400">Factor distribution</h4>
        <DistributionChart members={results.memberScores} />
      </div>
    </div>
  );
}
