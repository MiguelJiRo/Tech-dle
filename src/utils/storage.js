const STORAGE_KEY = 'techdle-game-state';
const STATS_KEY = 'techdle-stats';

export const sharedStorageKey = (dateKey) => `${STORAGE_KEY}-shared-${dateKey}`;

export const getSharedSummary = (dateKey) => {
  const raw = safeGetItem(sharedStorageKey(dateKey));
  if (!raw) return { played: false };
  try {
    const parsed = JSON.parse(raw);
    return {
      played: true,
      gameOver: Boolean(parsed.gameOver),
      gameWon: Boolean(parsed.gameWon),
      attempts: Array.isArray(parsed.guesses) ? parsed.guesses.length : 0,
    };
  } catch {
    return { played: false };
  }
};

const DEFAULT_STATS = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
};

const safeGetItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

export const saveGameState = (state, key = STORAGE_KEY) => safeSetItem(key, JSON.stringify(state));

export const loadGameState = (key = STORAGE_KEY) => {
  const saved = safeGetItem(key);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const saveStats = (stats) => safeSetItem(STATS_KEY, JSON.stringify(stats));

const normalizeStats = (raw) => {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_STATS };
  const distribution = Array.isArray(raw.guessDistribution) && raw.guessDistribution.length === 6
    ? raw.guessDistribution.map((n) => (Number.isFinite(n) ? n : 0))
    : [...DEFAULT_STATS.guessDistribution];
  return {
    gamesPlayed: Number.isFinite(raw.gamesPlayed) ? raw.gamesPlayed : 0,
    gamesWon: Number.isFinite(raw.gamesWon) ? raw.gamesWon : 0,
    currentStreak: Number.isFinite(raw.currentStreak) ? raw.currentStreak : 0,
    maxStreak: Number.isFinite(raw.maxStreak) ? raw.maxStreak : 0,
    guessDistribution: distribution,
  };
};

export const loadStats = () => {
  const saved = safeGetItem(STATS_KEY);
  if (!saved) return { ...DEFAULT_STATS };
  try {
    return normalizeStats(JSON.parse(saved));
  } catch {
    return { ...DEFAULT_STATS };
  }
};
