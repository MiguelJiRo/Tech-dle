const STORAGE_KEY = 'techdle-game-state';
const STATS_KEY = 'techdle-stats';

export const saveGameState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadGameState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  return JSON.parse(saved);
};

export const saveStats = (stats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const loadStats = () => {
  const saved = localStorage.getItem(STATS_KEY);
  if (!saved) {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0], // índices 0-5 para intentos 1-6
    };
  }
  return JSON.parse(saved);
};
