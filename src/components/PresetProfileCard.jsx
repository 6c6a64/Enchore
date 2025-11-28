import { Brain, Dumbbell, Scale } from 'lucide-react';

const presetConfig = {
  balanced: {
    title: 'Balanced',
    description: 'All factors weighted equally',
    icon: Scale,
  },
  physical: {
    title: 'Physical Focus',
    description: 'Highlights physical strain',
    icon: Dumbbell,
  },
  mental: {
    title: 'Mental Focus',
    description: 'Spotlights mental load',
    icon: Brain,
  },
};

export default function PresetProfileCard({ type, active, onSelect }) {
  const preset = presetConfig[type];
  const Icon = preset.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={`flex flex-col gap-2 rounded-2xl border p-4 text-left transition ${
        active ? 'border-brand-teal bg-brand-teal/10' : 'border-white/10 hover:border-white/30'
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4" />
        {preset.title}
      </div>
      <p className="text-xs text-slate-400">{preset.description}</p>
    </button>
  );
}
