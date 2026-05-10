// Achievement definitions. Each entry is pure data; predicate computes from stats.
// Adding a new one: pick a unique id, add to ACHIEVEMENTS, add i18n keys
// achievements.<id>.title and achievements.<id>.desc in both locales.

export const ACHIEVEMENTS = [
  { id: 'first_win',    icon: '🏆', predicate: (s) => s.gamesWon >= 1 },
  { id: 'ace',          icon: '🎯', predicate: (s) => s.guessDistribution[0] >= 1 },
  { id: 'second_try',   icon: '✌️',  predicate: (s) => s.guessDistribution[1] >= 1 },
  { id: 'streak_3',     icon: '🔥', predicate: (s) => s.maxStreak >= 3 },
  { id: 'streak_7',     icon: '⚡',  predicate: (s) => s.maxStreak >= 7 },
  { id: 'streak_14',    icon: '🌟', predicate: (s) => s.maxStreak >= 14 },
  { id: 'streak_30',    icon: '🚀', predicate: (s) => s.maxStreak >= 30 },
  { id: 'games_10',     icon: '📚', predicate: (s) => s.gamesPlayed >= 10 },
  { id: 'games_50',     icon: '🎓', predicate: (s) => s.gamesPlayed >= 50 },
  { id: 'games_100',    icon: '💯', predicate: (s) => s.gamesPlayed >= 100 },
];

export const achievementsUnlocked = (stats) => {
  if (!stats) return new Set();
  const unlocked = new Set();
  for (const a of ACHIEVEMENTS) {
    try {
      if (a.predicate(stats)) unlocked.add(a.id);
    } catch {
      // Defensive: malformed stats shouldn't crash the calculation
    }
  }
  return unlocked;
};

export const newlyUnlocked = (prevStats, nextStats) => {
  const before = achievementsUnlocked(prevStats);
  const after = achievementsUnlocked(nextStats);
  const out = [];
  for (const id of after) {
    if (!before.has(id)) out.push(id);
  }
  return out;
};
