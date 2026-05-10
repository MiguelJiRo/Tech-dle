const STORAGE_KEY = 'techdle-game-state';
const STATS_KEY = 'techdle-stats';
const ACHIEVEMENTS_KEY = 'techdle-achievements';
const HISTORY_KEY = 'techdle-history';

export const HISTORY_LIMIT = 60;

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

export const loadAchievements = () => {
  const saved = safeGetItem(ACHIEVEMENTS_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === 'string');
    return [];
  } catch {
    return [];
  }
};

export const saveAchievements = (ids) => safeSetItem(ACHIEVEMENTS_KEY, JSON.stringify(ids));

const isHistoryEntry = (e) =>
  e && typeof e === 'object'
  && typeof e.date === 'string'
  && typeof e.targetName === 'string'
  && Number.isFinite(e.attempts)
  && typeof e.won === 'boolean';

export const loadHistory = () => {
  const saved = safeGetItem(HISTORY_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isHistoryEntry);
  } catch {
    return [];
  }
};

export const appendHistoryEntry = (entry) => {
  if (!isHistoryEntry(entry)) return false;
  const current = loadHistory();
  // Replace any existing entry for the same date (idempotent), then unshift the new one.
  const filtered = current.filter((e) => e.date !== entry.date);
  const next = [entry, ...filtered].slice(0, HISTORY_LIMIT);
  return safeSetItem(HISTORY_KEY, JSON.stringify(next));
};
