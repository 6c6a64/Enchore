const normalize = (rating) => {
  if (!rating) return 0;
  return Math.max(0, Math.min(1, (rating - 1) / 4));
};

const calculateAverageWeights = (weights) => {
  const entries = Object.values(weights || {});
  if (!entries.length) {
    return { time: 0.25, physical: 0.25, mental: 0.25, constraints: 0.25 };
  }

  const sums = entries.reduce(
    (acc, weight) => {
      acc.time += weight.time || 0;
      acc.physical += weight.physical || 0;
      acc.mental += weight.mental || 0;
      acc.constraints += weight.constraints || 0;
      return acc;
    },
    { time: 0, physical: 0, mental: 0, constraints: 0 }
  );

  const count = entries.length;
  return {
    time: sums.time / count,
    physical: sums.physical / count,
    mental: sums.mental / count,
    constraints: sums.constraints / count,
  };
};

const calculateChoreScore = (rating, avgWeights) => {
  if (!rating) {
    return { total: 0, factors: { time: 0, physical: 0, mental: 0, constraints: 0 } };
  }
  const normalized = {
    time: normalize(rating.time),
    physical: normalize(rating.physical),
    mental: normalize(rating.mental),
    constraints: normalize(rating.constraints),
  };

  const factors = {
    time: avgWeights.time * normalized.time * 100,
    physical: avgWeights.physical * normalized.physical * 100,
    mental: avgWeights.mental * normalized.mental * 100,
    constraints: avgWeights.constraints * normalized.constraints * 100,
  };

  const total = Object.values(factors).reduce((sum, value) => sum + value, 0);

  return { total, factors, normalized };
};

const calculateMemberScore = (member, assignments, ratings, avgWeights, selectedChores) => {
  let totalScore = 0;
  const factorTotals = { time: 0, physical: 0, mental: 0, constraints: 0 };
  const choreScores = [];

  Object.entries(assignments || {}).forEach(([choreId, memberIds]) => {
    if (!memberIds.includes(member.id)) return;
    const rating = ratings[choreId];
    const { total, factors } = calculateChoreScore(rating, avgWeights);
    if (!total) return;
    totalScore += total;
    factorTotals.time += factors.time;
    factorTotals.physical += factors.physical;
    factorTotals.mental += factors.mental;
    factorTotals.constraints += factors.constraints;

    const choreMeta = selectedChores.find((c) => c.id === choreId) || {};
    choreScores.push({ choreId, choreName: choreMeta.name, score: total, factors, rating });
  });

  const factorPercentages = totalScore
    ? Object.fromEntries(
        Object.entries(factorTotals).map(([key, val]) => [key, (val / totalScore) * 100])
      )
    : { ...factorTotals };

  return { totalScore, factorTotals, factorPercentages, choreScores };
};

export const calculateResults = ({ members, assignments, ratings, weights, selectedChores }) => {
  const avgWeights = calculateAverageWeights(weights);

  const memberScores = (members || []).map((member) => {
    const memberData = calculateMemberScore(member, assignments, ratings, avgWeights, selectedChores);
    return {
      ...memberData,
      member,
    };
  });

  const householdTotal = memberScores.reduce((sum, entry) => sum + entry.totalScore, 0);
  const householdFactors = memberScores.reduce(
    (acc, entry) => {
      acc.time += entry.factorTotals.time;
      acc.physical += entry.factorTotals.physical;
      acc.mental += entry.factorTotals.mental;
      acc.constraints += entry.factorTotals.constraints;
      return acc;
    },
    { time: 0, physical: 0, mental: 0, constraints: 0 }
  );

  const heaviestMember = memberScores.reduce((best, entry) => {
    if (!best || entry.totalScore > best.totalScore) {
      return entry;
    }
    return best;
  }, null);

  const loadBalance = memberScores.length
    ? Math.max(...memberScores.map((entry) => entry.totalScore)) -
      Math.min(...memberScores.map((entry) => entry.totalScore))
    : 0;

  return {
    avgWeights,
    memberScores,
    householdTotal,
    householdFactors,
    heaviestMember,
    isReady: memberScores.some((entry) => entry.totalScore > 0),
    loadBalance,
  };
};

export { normalize, calculateAverageWeights, calculateChoreScore, calculateMemberScore };
