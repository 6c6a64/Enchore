import { useEnchore } from '../context/EnchoreContext';
import RatingSlider from '../components/RatingSlider';

const factors = ['time', 'physical', 'mental', 'constraints'];
const fallbackRating = { time: 3, physical: 3, mental: 3, constraints: 3 };

export default function ChoreRating({ onNext, onBack }) {
  const { selectedChoreDetails, ratings, updateRating } = useEnchore();
  const hasChores = selectedChoreDetails.length > 0;
  const canProceed = hasChores;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-widest text-slate-400">Step 4 · Ratings</p>
        <h2 className="text-3xl font-semibold">Rate each chore once.</h2>
        <p className="text-slate-300">Use 1-5 for time, physical, mental, constraints.</p>
      </div>

      {!hasChores && (
        <p className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
          Select chores first to continue.
        </p>
      )}

      <div className="space-y-4">
        {selectedChoreDetails.map((chore) => {
          const rating = ratings[chore.id] || fallbackRating;
          return (
            <div key={chore.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {chore.name}
                  </p>
                </div>
                <span className="text-sm text-slate-400">Shared rating · 1 to 5</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {factors.map((factor) => (
                  <RatingSlider
                    key={factor}
                    factor={factor}
                    value={rating[factor]}
                    onChange={(val) => updateRating(chore.id, factor, val)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onBack} type="button" className="text-sm text-slate-400">
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
