import { describe, it, expect } from 'vitest';
import {
  getDateKey,
  getTechnologyOfTheDay,
  getTechnologyForDateKey,
  isValidDateKey,
  millisUntilNextUtcMidnight,
  technologies,
} from './technologies';

describe('getDateKey', () => {
  it('formats a UTC YYYY-MM-DD string', () => {
    const d = new Date(Date.UTC(2025, 0, 5, 15, 30));
    expect(getDateKey(d)).toBe('2025-01-05');
  });
  it('is timezone-stable: late-night local time still yields the same UTC day', () => {
    const sameUtcDay = new Date(Date.UTC(2025, 5, 10, 23, 59, 59));
    expect(getDateKey(sameUtcDay)).toBe('2025-06-10');
  });
});

describe('getTechnologyOfTheDay', () => {
  it('returns the same technology for two times within the same UTC day', () => {
    const morning = new Date(Date.UTC(2025, 2, 14, 1, 0));
    const evening = new Date(Date.UTC(2025, 2, 14, 22, 0));
    expect(getTechnologyOfTheDay(morning).id).toBe(getTechnologyOfTheDay(evening).id);
  });
  it('returns different technologies on consecutive days', () => {
    const day1 = new Date(Date.UTC(2025, 2, 14));
    const day2 = new Date(Date.UTC(2025, 2, 15));
    expect(getTechnologyOfTheDay(day1).id).not.toBe(getTechnologyOfTheDay(day2).id);
  });
  it('cycles through the dataset', () => {
    const day1 = new Date(Date.UTC(2024, 0, 1));
    const dayAfterCycle = new Date(Date.UTC(2024, 0, 1 + technologies.length));
    expect(getTechnologyOfTheDay(day1).id).toBe(getTechnologyOfTheDay(dayAfterCycle).id);
  });
});

describe('isValidDateKey', () => {
  it('accepts well-formed YYYY-MM-DD', () => {
    expect(isValidDateKey('2025-01-05')).toBe(true);
    expect(isValidDateKey('2024-12-31')).toBe(true);
  });
  it('rejects malformed input', () => {
    expect(isValidDateKey(null)).toBe(false);
    expect(isValidDateKey('2025-1-5')).toBe(false);
    expect(isValidDateKey('not-a-date')).toBe(false);
    expect(isValidDateKey(20250105)).toBe(false);
  });
});

describe('getTechnologyForDateKey', () => {
  it('returns same tech as getTechnologyOfTheDay for the equivalent date', () => {
    const date = new Date(Date.UTC(2025, 4, 10));
    expect(getTechnologyForDateKey('2025-05-10').id).toBe(getTechnologyOfTheDay(date).id);
  });
  it('returns null for invalid input', () => {
    expect(getTechnologyForDateKey('2025-1-1')).toBeNull();
    expect(getTechnologyForDateKey(undefined)).toBeNull();
  });
});

describe('millisUntilNextUtcMidnight', () => {
  it('returns 24h when called at UTC midnight', () => {
    const t = new Date(Date.UTC(2025, 5, 10, 0, 0, 0, 0));
    expect(millisUntilNextUtcMidnight(t)).toBe(86_400_000);
  });
  it('returns 1h when called at 23:00 UTC', () => {
    const t = new Date(Date.UTC(2025, 5, 10, 23, 0, 0, 0));
    expect(millisUntilNextUtcMidnight(t)).toBe(3_600_000);
  });
  it('never returns negative', () => {
    expect(millisUntilNextUtcMidnight(new Date(Date.UTC(2025, 5, 10, 12, 0)))).toBeGreaterThan(0);
  });
});
