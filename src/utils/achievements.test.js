import { describe, it, expect } from 'vitest';
import { ACHIEVEMENTS, achievementsUnlocked, newlyUnlocked } from './achievements';

const baseStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
};

describe('achievementsUnlocked', () => {
  it('returns empty set for fresh stats', () => {
    expect(achievementsUnlocked(baseStats).size).toBe(0);
  });
  it('unlocks first_win after first victory', () => {
    const stats = { ...baseStats, gamesWon: 1, gamesPlayed: 1, guessDistribution: [0, 0, 0, 1, 0, 0] };
    expect(achievementsUnlocked(stats).has('first_win')).toBe(true);
  });
  it('unlocks ace when distribution[0] is non-zero', () => {
    expect(achievementsUnlocked({ ...baseStats, guessDistribution: [1, 0, 0, 0, 0, 0] }).has('ace')).toBe(true);
  });
  it('streak ladder fires only at the right thresholds', () => {
    expect(achievementsUnlocked({ ...baseStats, maxStreak: 6 }).has('streak_7')).toBe(false);
    expect(achievementsUnlocked({ ...baseStats, maxStreak: 7 }).has('streak_7')).toBe(true);
    expect(achievementsUnlocked({ ...baseStats, maxStreak: 30 }).has('streak_30')).toBe(true);
    expect(achievementsUnlocked({ ...baseStats, maxStreak: 30 }).has('streak_14')).toBe(true);
  });
  it('handles null stats safely', () => {
    expect(achievementsUnlocked(null).size).toBe(0);
    expect(achievementsUnlocked(undefined).size).toBe(0);
  });
});

describe('newlyUnlocked', () => {
  it('returns empty when nothing changed', () => {
    expect(newlyUnlocked(baseStats, baseStats)).toEqual([]);
  });
  it('detects the diff between two stats', () => {
    const before = { ...baseStats, gamesPlayed: 9, maxStreak: 6 };
    const after = { ...before, gamesPlayed: 10, maxStreak: 7 };
    expect(newlyUnlocked(before, after).sort()).toEqual(['games_10', 'streak_7']);
  });
  it('does not re-emit already unlocked', () => {
    const before = { ...baseStats, gamesWon: 1, guessDistribution: [0, 0, 0, 1, 0, 0] };
    const after = { ...before, gamesWon: 2, guessDistribution: [0, 0, 0, 2, 0, 0] };
    expect(newlyUnlocked(before, after)).toEqual([]);
  });
});

describe('ACHIEVEMENTS list invariants', () => {
  it('all ids are unique', () => {
    const ids = ACHIEVEMENTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('every achievement has icon and predicate', () => {
    ACHIEVEMENTS.forEach((a) => {
      expect(typeof a.icon).toBe('string');
      expect(typeof a.predicate).toBe('function');
    });
  });
});
