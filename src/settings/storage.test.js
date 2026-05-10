import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadSettings, saveSettings, normalizeSettings, DEFAULT_SETTINGS } from './storage';

const KEY = 'techdle-settings';

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

describe('settings storage', () => {
  let mem;
  beforeEach(() => {
    mem = makeMemoryStorage();
    installStorage(mem);
  });
  afterEach(() => {
    delete globalThis.localStorage;
  });

  it('returns DEFAULT_SETTINGS when nothing stored', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('round-trips a valid theme', () => {
    saveSettings({ theme: 'light', colorBlind: false, hardMode: false });
    expect(loadSettings()).toEqual({ theme: 'light', colorBlind: false, hardMode: false });
  });

  it('round-trips colorBlind enabled', () => {
    saveSettings({ theme: 'dark', colorBlind: true, hardMode: false });
    expect(loadSettings()).toEqual({ theme: 'dark', colorBlind: true, hardMode: false });
  });

  it('round-trips hardMode enabled', () => {
    saveSettings({ theme: 'dark', colorBlind: false, hardMode: true });
    expect(loadSettings().hardMode).toBe(true);
  });

  it('coerces non-boolean colorBlind to default false', () => {
    mem._store.set(KEY, JSON.stringify({ theme: 'dark', colorBlind: 'yes' }));
    expect(loadSettings()).toEqual({ theme: 'dark', colorBlind: false, hardMode: false });
  });

  it('coerces non-boolean hardMode to default false', () => {
    mem._store.set(KEY, JSON.stringify({ theme: 'dark', hardMode: 'true' }));
    expect(loadSettings().hardMode).toBe(false);
  });

  it('keeps a valid theme even when colorBlind is missing', () => {
    mem._store.set(KEY, JSON.stringify({ theme: 'light' }));
    expect(loadSettings()).toEqual({ theme: 'light', colorBlind: false, hardMode: false });
  });

  it('rejects unknown theme values and falls back to default', () => {
    mem._store.set(KEY, JSON.stringify({ theme: 'amoled' }));
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('returns defaults on corrupt JSON', () => {
    mem._store.set(KEY, '{not json');
    expect(() => loadSettings()).not.toThrow();
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('normalizeSettings handles non-object input', () => {
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings('foo')).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings(42)).toEqual(DEFAULT_SETTINGS);
  });

  it('does not throw when localStorage write fails', () => {
    installStorage({
      getItem: () => null,
      setItem: () => { throw new Error('Quota'); },
      removeItem: () => {},
    });
    expect(() => saveSettings({ theme: 'dark' })).not.toThrow();
    expect(saveSettings({ theme: 'dark' })).toBe(false);
  });
});
