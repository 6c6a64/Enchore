import { useEnchore } from '../context/EnchoreContext';
import AssignmentCard from '../components/AssignmentCard';

export default function ChoreAssignment({ onNext, onBack }) {
  const { members, selectedChoreDetails, assignments, toggleAssignment } = useEnchore();
  const allAssigned =
    selectedChoreDetails.length > 0 &&
    selectedChoreDetails.every((chore) => (assignments[chore.id]?.length || 0) > 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-widest text-slate-400">Step 3 · Assignment</p>
        <h2 className="text-3xl font-semibold">Tag owners for every task.</h2>
        <p className="text-slate-300">Pick one or more people per card.</p>
      </div>

      {selectedChoreDetails.length === 0 && (
        <p className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
          Select chores first to continue.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {selectedChoreDetails.map((chore) => (
          <AssignmentCard
            key={chore.id}
            chore={chore}
            members={members}
            assignments={assignments[chore.id] || []}
            onToggle={toggleAssignment}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onBack} type="button" className="text-sm text-slate-400">
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!allAssigned}
          className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white disabled:bg-slate-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
