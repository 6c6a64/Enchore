import { MinusCircle, UserRound } from 'lucide-react';

export default function MemberInput({ member, onChange, onRemove, canRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold text-white"
        style={{ background: member.avatarColor }}
      >
        <UserRound className="h-6 w-6" />
      </div>
      <input
        type="text"
        value={member.name}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Member name"
        className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500"
      />
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-slate-400 transition hover:text-rose-400"
        >
          <MinusCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
