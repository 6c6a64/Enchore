import { loadLevelLabel, scoreColor } from '../utils/chartHelpers';
import ScoreGauge from './ScoreGauge';
import FactorBreakdownChart from './FactorBreakdownChart';

export default function MemberCard({ entry }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Member</p>
          <h3 className="text-2xl font-semibold">{entry.member.name || 'Unnamed'}</h3>
          <p className="text-sm text-slate-400">{loadLevelLabel(entry.totalScore)} load</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold" style={{ color: scoreColor(entry.totalScore) }}>
          {Math.round(entry.totalScore)} pts
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <ScoreGauge score={entry.totalScore} />
        <FactorBreakdownChart data={entry.factorPercentages} />
      </div>

      {(entry.choreScores?.length || 0) > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs uppercase tracking-wide text-slate-400">Chore impact</p>
          {entry.choreScores.map((chore) => (
            <div key={`${entry.member.id}-${chore.choreId}`} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2 text-sm">
              <span>{chore.choreName || 'Chore'}</span>
              <span className="font-semibold" style={{ color: scoreColor(chore.score) }}>
                {Math.round(chore.score)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
