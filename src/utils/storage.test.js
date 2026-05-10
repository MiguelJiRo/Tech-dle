import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  saveGameState,
  loadGameState,
  saveStats,
  loadStats,
  loadHistory,
  appendHistoryEntry,
  HISTORY_LIMIT,
} from './storage';

const STORAGE_KEY = 'techdle-game-state';
const STATS_KEY = 'techdle-stats';
const HISTORY_KEY = 'techdle-history';

const makeMemoryStorage = () => {
  const store = new Map();
  return {
    getItem: vi.fn((k) => (store.has(k) ? store.get(k) : null)),
    setItem: vi.fn((k, v) => { store.set(k, String(v)); }),
    removeItem: vi.fn((k) => { store.delete(k); }),
    clear: vi.fn(() => { store.clear(); }),
    _store: store,
  };
};

const installStorage = (impl) => {
  Object.defineProperty(globalThis, 'localStorage', { value: impl, configurable: true });
};

describe('storage', () => {
  let mem;
  beforeEach(() => {
    mem = makeMemoryStorage();
    installStorage(mem);
  });
  afterEach(() => {
    delete globalThis.localStorage;
  });

  it('saves and loads game state round-trip', () => {
    const state = { date: '2026-01-01', guesses: [], gameOver: false, gameWon: false };
    saveGameState(state);
    expect(loadGameState()).toEqual(state);
  });

  it('returns null when no game state stored', () => {
    expect(loadGameState()).toBeNull();
  });

  it('returns null on corrupt game-state JSON instead of throwing', () => {
    mem._store.set(STORAGE_KEY, '{not valid');
    expect(() => loadGameState()).not.toThrow();
    expect(loadGameState()).toBeNull();
  });

  it('returns default stats when nothing stored', () => {
    expect(loadStats()).toEqual({
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0],
    });
  });

  it('returns default stats on corrupt stats JSON', () => {
    mem._store.set(STATS_KEY, 'broken');
    expect(loadStats().gamesPlayed).toBe(0);
  });

  it('normalizes partially-corrupt stats by filling missing fields', () => {
    mem._store.set(STATS_KEY, JSON.stringify({ gamesPlayed: 7 }));
    const stats = loadStats();
    expect(stats.gamesPlayed).toBe(7);
    expect(stats.gamesWon).toBe(0);
    expect(stats.guessDistribution).toEqual([0, 0, 0, 0, 0, 0]);
  });

  it('rejects non-array guessDistribution and falls back', () => {
    mem._store.set(STATS_KEY, JSON.stringify({ guessDistribution: 'oops' }));
    expect(loadStats().guessDistribution).toEqual([0, 0, 0, 0, 0, 0]);
  });

  it('does not throw when localStorage.setItem throws (quota exceeded)', () => {
    installStorage({
      getItem: () => null,
      setItem: () => { throw new Error('QuotaExceededError'); },
      removeItem: () => {},
    });
    expect(() => saveStats({ gamesPlayed: 1 })).not.toThrow();
    expect(saveStats({ gamesPlayed: 1 })).toBe(false);
  });

  it('does not throw when localStorage.getItem throws', () => {
    installStorage({
      getItem: () => { throw new Error('SecurityError'); },
      setItem: () => {},
      removeItem: () => {},
    });
    expect(() => loadStats()).not.toThrow();
    expect(loadStats().gamesPlayed).toBe(0);
  });
});

describe('history', () => {
  let mem;
  beforeEach(() => {
    mem = makeMemoryStorage();
    installStorage(mem);
  });
  afterEach(() => {
    delete globalThis.localStorage;
  });

  const entry = (date, won, attempts = 3, targetName = 'JavaScript') => ({ date, targetName, attempts, won });

  it('returns empty array when nothing stored', () => {
    expect(loadHistory()).toEqual([]);
  });

  it('appendHistoryEntry stores and reads back', () => {
    appendHistoryEntry(entry('2026-05-10', true));
    expect(loadHistory()).toEqual([entry('2026-05-10', true)]);
  });

  it('newest entry comes first (LIFO)', () => {
    appendHistoryEntry(entry('2026-05-09', true));
    appendHistoryEntry(entry('2026-05-10', false, 6));
    const h = loadHistory();
    expect(h[0].date).toBe('2026-05-10');
    expect(h[1].date).toBe('2026-05-09');
  });

  it('replaces an existing entry for the same date (idempotent)', () => {
    appendHistoryEntry(entry('2026-05-10', false, 6));
    appendHistoryEntry(entry('2026-05-10', true, 4, 'Python'));
    const h = loadHistory();
    expect(h.length).toBe(1);
    expect(h[0]).toEqual(entry('2026-05-10', true, 4, 'Python'));
  });

  it('caps to HISTORY_LIMIT entries', () => {
    for (let i = 0; i < HISTORY_LIMIT + 5; i++) {
      const day = String(i + 1).padStart(2, '0');
      appendHistoryEntry(entry(`2026-01-${day}`, true));
    }
    expect(loadHistory().length).toBe(HISTORY_LIMIT);
  });

  it('rejects malformed entries', () => {
    expect(appendHistoryEntry({ date: '2026-05-10' })).toBe(false);
    expect(appendHistoryEntry(null)).toBe(false);
    expect(loadHistory()).toEqual([]);
  });

  it('filters out malformed entries on load', () => {
    mem._store.set(HISTORY_KEY, JSON.stringify([
      entry('2026-05-10', true),
      { date: 'broken' },
      'not an object',
    ]));
    expect(loadHistory()).toEqual([entry('2026-05-10', true)]);
  });

  it('returns empty array on corrupt JSON', () => {
    mem._store.set(HISTORY_KEY, '{not json');
    expect(() => loadHistory()).not.toThrow();
    expect(loadHistory()).toEqual([]);
  });
});
