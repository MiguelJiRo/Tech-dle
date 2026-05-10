const SETTINGS_KEY = 'techdle-settings';

export const DEFAULT_SETTINGS = {
  theme: 'system',
};

const VALID_THEMES = new Set(['system', 'dark', 'light']);

const safeGet = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};

const safeSet = (key, value) => {
  try { localStorage.setItem(key, value); return true; } catch { return false; }
};

export const normalizeSettings = (raw) => {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_SETTINGS };
  const theme = VALID_THEMES.has(raw.theme) ? raw.theme : DEFAULT_SETTINGS.theme;
  return { theme };
};

export const loadSettings = () => {
  const saved = safeGet(SETTINGS_KEY);
  if (!saved) return { ...DEFAULT_SETTINGS };
  try {
    return normalizeSettings(JSON.parse(saved));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
};

export const saveSettings = (settings) => safeSet(SETTINGS_KEY, JSON.stringify(settings));
