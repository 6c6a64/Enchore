import { CheckCircle2 } from 'lucide-react';

export default function AssignmentCard({ chore, members, assignments = [], onToggle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{chore.name}</h3>
        </div>
        <span className="text-xs text-slate-400">Assign members</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {members.map((member) => {
          const active = assignments.includes(member.id);
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onToggle(chore.id, member.id)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? 'border-brand-teal/70 bg-brand-teal/10 text-white'
                  : 'border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/30'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: member.avatarColor }} />
              {member.name || 'Unnamed'}
              {active && <CheckCircle2 className="h-3.5 w-3.5 text-brand-teal" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
