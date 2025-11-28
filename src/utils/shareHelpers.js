export const buildSharePayload = (results) => {
  if (!results?.isReady) return '';
  const summary = {
    householdTotal: Math.round(results.householdTotal || 0),
    members: results.memberScores.map((entry) => ({
      name: entry.member.name,
      score: Math.round(entry.totalScore),
    })),
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(summary))));
};

export const buildShareUrl = (results) => {
  if (typeof window === 'undefined') return '';
  const payload = buildSharePayload(results);
  if (!payload) return window.location.origin;
  const url = new URL(window.location.href);
  url.searchParams.set('data', payload);
  return url.toString();
};
