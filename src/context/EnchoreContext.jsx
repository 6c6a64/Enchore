import { createContext, useContext, useMemo, useState } from 'react';
import { calculateResults } from '../utils/calculations';

const DEFAULT_CHORES = [
  { id: 'dishes', name: 'Dishes', icon: 'Utensils' },
  { id: 'cooking', name: 'Cooking', icon: 'ChefHat' },
  { id: 'laundry', name: 'Laundry', icon: 'Shirt' },
  { id: 'vacuuming', name: 'Vacuuming', icon: 'Broom' },
  { id: 'bathroom', name: 'Bathroom Cleaning', icon: 'Sparkles' },
  { id: 'trash', name: 'Trash & Recycling', icon: 'Trash2' },
  { id: 'grocery', name: 'Grocery Shopping', icon: 'ShoppingBag' },
  { id: 'planning', name: 'Planning & Scheduling', icon: 'Calendar' },
  { id: 'recycling', name: 'Recycling', icon: 'Recycle' },
  { id: 'pet-care', name: 'Pet Care', icon: 'PawPrint' },
  { id: 'yard', name: 'Garden & Yardwork', icon: 'Leaf' },
  { id: 'bills', name: 'Bills & Finances', icon: 'Wallet' },
  { id: 'maintenance', name: 'Home Maintenance', icon: 'Wrench' },
  { id: 'homework', name: 'Homework Help', icon: 'BookOpenCheck' },
  { id: 'bedtime', name: 'Bedtime Routine', icon: 'MoonStar' },
  { id: 'school', name: 'School Drop-offs', icon: 'School' },
];

const palette = ['#0ea5e9', '#9333ea', '#f97316', '#14b8a6', '#eab308'];
const defaultWeights = { time: 0.25, physical: 0.25, mental: 0.25, constraints: 0.25 };
const defaultRating = { time: 3, physical: 3, mental: 3, constraints: 3 };
const factorOrder = ['time', 'physical', 'mental', 'constraints'];

const EnchoreContext = createContext();

const createId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const createMember = (name, index) => ({
  id: createId(),
  name,
  avatarColor: palette[index % palette.length],
});

export const useEnchore = () => useContext(EnchoreContext);

export const EnchoreProvider = ({ children }) => {
  const [members, setMembers] = useState(() => [
    createMember('Alex', 0),
    createMember('Jordan', 1),
  ]);
  const [chores, setChores] = useState(() => [...DEFAULT_CHORES]);
  const [selectedChores, setSelectedChores] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [ratings, setRatings] = useState({});
  const [weights, setWeights] = useState(() =>
    members.reduce((acc, member) => {
      acc[member.id] = { ...defaultWeights };
      return acc;
    }, {})
  );

  const selectedChoreDetails = useMemo(
    () => selectedChores.map((id) => chores.find((chore) => chore.id === id)).filter(Boolean),
    [selectedChores, chores]
  );

  const addMember = () => {
    const newMember = createMember('', members.length);
    setMembers((prev) => [...prev, newMember]);
    setWeights((prev) => ({ ...prev, [newMember.id]: { ...defaultWeights } }));
  };

  const updateMemberName = (memberId, name) => {
    setMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, name } : member)));
  };

  const removeMember = (memberId) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
    setWeights((prev) => {
      const next = { ...prev };
      delete next[memberId];
      return next;
    });
    setAssignments((prev) => {
      const next = {};
      Object.entries(prev).forEach(([choreId, memberIds]) => {
        next[choreId] = memberIds.filter((id) => id !== memberId);
      });
      return next;
    });
  };

  const toggleChoreSelection = (choreId) => {
    setSelectedChores((prev) => {
      if (prev.includes(choreId)) {
        setAssignments((assignPrev) => {
          const next = { ...assignPrev };
          delete next[choreId];
          return next;
        });
        setRatings((ratingPrev) => {
          const next = { ...ratingPrev };
          delete next[choreId];
          return next;
        });
        return prev.filter((id) => id !== choreId);
      }
      setRatings((prevRatings) => ({
        ...prevRatings,
        [choreId]: prevRatings[choreId] || { ...defaultRating },
      }));
      return [...prev, choreId];
    });
  };

  const addCustomChore = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newChore = { id: createId(), name: trimmed, icon: 'Sparkles' };
    setChores((prev) => [...prev, newChore]);
    setSelectedChores((prev) => [...prev, newChore.id]);
    setRatings((prev) => ({ ...prev, [newChore.id]: { ...defaultRating } }));
  };

  const removeChore = (choreId) => {
    setChores((prev) => prev.filter((chore) => chore.id !== choreId));
    setSelectedChores((prev) => prev.filter((id) => id !== choreId));
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[choreId];
      return next;
    });
    setRatings((prev) => {
      const next = { ...prev };
      delete next[choreId];
      return next;
    });
  };

  const toggleAssignment = (choreId, memberId) => {
    setAssignments((prev) => {
      const current = prev[choreId] || [];
      const exists = current.includes(memberId);
      const updated = exists ? current.filter((id) => id !== memberId) : [...current, memberId];
      const next = { ...prev, [choreId]: updated };
      if (updated.length === 0) delete next[choreId];
      return next;
    });
  };

  const updateRating = (choreId, factor, value) => {
    setRatings((prev) => ({
      ...prev,
      [choreId]: {
        ...(prev[choreId] || defaultRating),
        [factor]: value,
      },
    }));
  };

  const applyPresetWeights = (memberId, preset) => {
    const presets = {
      balanced: defaultWeights,
      physical: { time: 0.2, physical: 0.45, mental: 0.2, constraints: 0.15 },
      mental: { time: 0.2, physical: 0.15, mental: 0.45, constraints: 0.2 },
    };
    setWeights((prev) => ({
      ...prev,
      [memberId]: { ...presets[preset] },
    }));
  };

  const clamp = (num, min = 0, max = 1) => Math.min(Math.max(num, min), max);

  const updateWeight = (memberId, factor, value) => {
    setWeights((prev) => {
      const memberWeights = prev[memberId] || { ...defaultWeights };
      const currentValue = memberWeights[factor] ?? 0;
      const desiredValue = clamp(value);
      const diff = Number((desiredValue - currentValue).toFixed(4));

      if (Math.abs(diff) < 0.0001) {
        return prev;
      }

      const updated = { ...memberWeights, [factor]: desiredValue };
      let remaining = diff;
      const startIndex = factorOrder.indexOf(factor);

      for (let step = 1; step < factorOrder.length && Math.abs(remaining) > 0.0001; step += 1) {
        const key = factorOrder[(startIndex + step) % factorOrder.length];
        const current = updated[key] ?? 0;

        if (diff > 0) {
          const reducible = Math.min(current, remaining);
          updated[key] = clamp(current - reducible);
          remaining = Number((remaining - reducible).toFixed(4));
        } else {
          const addable = Math.min(1 - current, -remaining);
          updated[key] = clamp(current + addable);
          remaining = Number((remaining + addable).toFixed(4));
        }
      }

      const total = Object.values(updated).reduce((sum, val) => sum + val, 0);
      if (Math.abs(total - 1) > 0.0001) {
        const nextKey = factorOrder[(startIndex + 1) % factorOrder.length];
        updated[nextKey] = clamp(updated[nextKey] - (total - 1));
      }

      return { ...prev, [memberId]: updated };
    });
  };

  const results = useMemo(
    () =>
      calculateResults({
        members,
        assignments,
        ratings,
        weights,
        selectedChores: selectedChoreDetails,
      }),
    [members, assignments, ratings, weights, selectedChoreDetails]
  );

  const resetSimulation = () => {
    const baseMembers = [createMember('Alex', 0), createMember('Jordan', 1)];
    setMembers(baseMembers);
    setChores([...DEFAULT_CHORES]);
    setSelectedChores([]);
    setAssignments({});
    setRatings({});
    setWeights(
      baseMembers.reduce((acc, member) => {
        acc[member.id] = { ...defaultWeights };
        return acc;
      }, {})
    );
  };

  const value = {
    members,
    chores,
    selectedChores,
    selectedChoreDetails,
    assignments,
    ratings,
    weights,
    results,
    addMember,
    updateMemberName,
    removeMember,
    toggleChoreSelection,
    addCustomChore,
    removeChore,
    toggleAssignment,
    updateRating,
    applyPresetWeights,
    updateWeight,
    resetSimulation,
  };

  return <EnchoreContext.Provider value={value}>{children}</EnchoreContext.Provider>;
};
