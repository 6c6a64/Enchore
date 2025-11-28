import * as Icons from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function ChoreCard({ chore, active, onToggle, onRemove }) {
  const Icon = Icons[chore.icon] || Icons.ListChecks;

  const handleKey = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle(chore.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggle(chore.id)}
      onKeyDown={handleKey}
      className={`flex h-full flex-col gap-2 rounded-2xl border p-4 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
        active
          ? 'border-brand-teal bg-brand-teal/10 text-white'
          : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30'
      }`}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <span className="font-semibold">{chore.name}</span>
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(chore.id);
            }}
            className="rounded-full p-1 text-slate-400 transition hover:text-rose-400"
            aria-label={`Remove ${chore.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <span className="text-[0.7rem] text-slate-400">{active ? 'Selected' : 'Tap to include'}</span>
    </div>
  );
}
