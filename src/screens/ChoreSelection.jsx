import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useEnchore } from '../context/EnchoreContext';
import ChoreCard from '../components/ChoreCard';

export default function ChoreSelection({ onNext, onBack }) {
  const { chores, selectedChores, toggleChoreSelection, addCustomChore, removeChore } = useEnchore();
  const [customName, setCustomName] = useState('');
  const canProceed = selectedChores.length > 0;

  const handleAddCustom = () => {
    if (!customName.trim()) return;
    addCustomChore(customName);
    setCustomName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-widest text-slate-400">Step 2 · Chore selection</p>
        <h2 className="text-3xl font-semibold">Select the work to measure.</h2>
        <p className="text-slate-300">Tap to include, add more if needed.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {chores.map((chore) => (
          <ChoreCard
            key={chore.id}
            chore={chore}
            active={selectedChores.includes(chore.id)}
            onToggle={toggleChoreSelection}
            onRemove={removeChore}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-white/10 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={customName}
            onChange={(event) => setCustomName(event.target.value)}
            placeholder="Add custom chore"
            className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={handleAddCustom}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white"
          >
            <PlusCircle className="h-4 w-4" />
            Add
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-400">Selected: {selectedChores.length} chores</p>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} className="text-sm text-slate-400">
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white disabled:bg-slate-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
