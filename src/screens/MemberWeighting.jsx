import { useMemo } from 'react';
import { useEnchore } from '../context/EnchoreContext';
import PresetProfileCard from '../components/PresetProfileCard';
import CustomWeightEditor from '../components/CustomWeightEditor';

const presetWeights = {
  balanced: { time: 0.25, physical: 0.25, mental: 0.25, constraints: 0.25 },
  physical: { time: 0.2, physical: 0.45, mental: 0.2, constraints: 0.15 },
  mental: { time: 0.2, physical: 0.15, mental: 0.45, constraints: 0.2 },
};

const presetLabels = {
  balanced: 'Balanced',
  physical: 'Physical focus',
  mental: 'Mental focus',
};

const presetTypes = Object.keys(presetWeights);

export default function MemberWeighting({ onNext, onBack }) {
  const { members, weights, applyPresetWeights, updateWeight } = useEnchore();
  const ready = members.length > 0;

  const presetMatches = useMemo(() => {
    const matches = {};
    members.forEach((member) => {
      const memberWeights = weights[member.id];
      matches[member.id] = presetTypes.find((type) => {
        const preset = presetWeights[type];
        return Object.keys(preset).every((key) => Math.abs((memberWeights?.[key] || 0) - preset[key]) < 0.05);
      });
    });
    return matches;
  }, [members, weights]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-widest text-slate-400">Step 5 · Weighting</p>
        <h2 className="text-3xl font-semibold">Set personal weights.</h2>
        <p className="text-slate-300">Choose a preset or drag sliders; values always sum to 100%.</p>
      </div>

      <div className="space-y-6">
        {members.map((member) => (
          <div key={member.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Member</p>
                <h3 className="text-2xl font-semibold">{member.name || 'Unnamed'}</h3>
              </div>
              <span className="text-sm text-slate-400">
                Profile: {presetMatches[member.id] ? presetLabels[presetMatches[member.id]] : 'Custom'}
              </span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {presetTypes.map((preset) => (
                <PresetProfileCard
                  key={preset}
                  type={preset}
                  active={presetMatches[member.id] === preset}
                  onSelect={() => applyPresetWeights(member.id, preset)}
                />
              ))}
            </div>
            <div className="mt-6">
              <CustomWeightEditor
                weights={weights[member.id] || presetWeights.balanced}
                onChange={(factor, value) => updateWeight(member.id, factor, value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onBack} type="button" className="text-sm text-slate-400">
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!ready}
          className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white disabled:bg-slate-700"
        >
          See results
        </button>
      </div>
    </div>
  );
}
