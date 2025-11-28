import { Plus, Users } from 'lucide-react';
import MemberInput from '../components/MemberInput';
import { useEnchore } from '../context/EnchoreContext';

export default function HouseholdSetup({ onNext }) {
  const { members, addMember, updateMemberName, removeMember } = useEnchore();
  const canProceed = members.every((member) => member.name.trim().length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400">Step 1 · Household setup</p>
          <h2 className="mt-2 text-3xl font-semibold">List everyone involved.</h2>
          <p className="mt-2 max-w-2xl text-slate-300">Names only—colors are automatic.</p>
        </div>
        <Users className="hidden h-12 w-12 text-slate-500 md:block" />
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <MemberInput
            key={member.id}
            member={member}
            canRemove={members.length > 1}
            onChange={(value) => updateMemberName(member.id, value)}
            onRemove={() => removeMember(member.id)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={addMember}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30"
        >
          <Plus className="h-4 w-4" />
          Add member
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition disabled:bg-slate-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
