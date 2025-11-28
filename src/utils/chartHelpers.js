export const scoreColor = (score) => {
  if (score >= 70) return '#f97316';
  if (score >= 40) return '#fbbf24';
  return '#4ade80';
};

export const loadLevelLabel = (score) => {
  if (score >= 70) return 'Heavy';
  if (score >= 40) return 'Moderate';
  return 'Light';
};

export const formatScore = (score) => Math.round(score);
