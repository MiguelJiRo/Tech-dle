import { describe, it, expect } from 'vitest';
import { getDateKey, getTechnologyOfTheDay, technologies } from './technologies';

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
