import { ArrowLeft, RefreshCcw, Scale, SlidersHorizontal, UsersRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEnchore } from '../context/EnchoreContext';
import MemberCard from '../components/MemberCard';
import HouseholdSummary from '../components/HouseholdSummary';
import ShareSection from '../components/ShareSection';
import TipsSection from '../components/TipsSection';

export default function Results({ onRestart, onAdjustWeights, onReassign }) {
  const { results } = useEnchore();

  if (!results.isReady) {
    return (
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-slate-400">Final step</p>
        <h2 className="text-3xl font-semibold">Almost there!</h2>
        <p className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
          Finish assigning and rating chores to view the household insights.
        </p>
        <button onClick={onReassign} className="inline-flex items-center gap-2 text-brand-teal">
          <ArrowLeft className="h-4 w-4" /> Go back
        </button>
      </div>
    );
  }

  const balanceLabel = (() => {
    if (results.loadBalance > 120) return 'highly uneven';
    if (results.loadBalance > 70) return 'somewhat uneven';
    return 'fairly balanced';
  })();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-brand-teal/30 bg-brand-teal/10 p-6"
      >
        <div className="flex items-center gap-3">
          <Scale className="h-8 w-8 text-brand-teal" />
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-300">Household load snapshot</p>
            <h2 className="text-3xl font-semibold">Distribution is {balanceLabel}</h2>
            <p className="text-sm text-slate-200">
              Adjust weights or assignments to explore different sharing scenarios. Every change recalculates instantly.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onAdjustWeights}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white"
          >
            <SlidersHorizontal className="h-4 w-4" /> Adjust weights
          </button>
          <button
            type="button"
            onClick={onReassign}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white"
          >
            <UsersRound className="h-4 w-4" /> Reassign chores
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white"
          >
            <RefreshCcw className="h-4 w-4" /> Start over
          </button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {results.memberScores.map((entry) => (
          <MemberCard key={entry.member.id} entry={entry} />
        ))}
      </div>

      <HouseholdSummary results={results} />

      <div className="grid gap-6 md:grid-cols-2">
        <ShareSection results={results} />
        <TipsSection results={results} />
      </div>
    </div>
  );
}
