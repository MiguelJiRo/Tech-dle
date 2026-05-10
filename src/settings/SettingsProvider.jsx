import { useCallback, useEffect, useMemo, useState } from 'react';
import { SettingsContext } from './context';
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from './storage';

const getSystemPrefersDark = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (resolved) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.style.colorScheme = resolved;
  root.dataset.theme = resolved;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    if (typeof window === 'undefined') return { ...DEFAULT_SETTINGS };
    return loadSettings();
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark);

  const resolvedTheme = settings.theme === 'system'
    ? (systemPrefersDark ? 'dark' : 'light')
    : settings.theme;

  // Apply DOM side effects when the resolved theme changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Persist settings on change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Listen to system preference changes (only matters when theme is 'system')
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const setTheme = useCallback((theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const setColorBlind = useCallback((value) => {
    setSettings((prev) => ({ ...prev, colorBlind: Boolean(value) }));
  }, []);

  const setHardMode = useCallback((value) => {
    setSettings((prev) => ({ ...prev, hardMode: Boolean(value) }));
  }, []);

  const value = useMemo(
    () => ({ settings, resolvedTheme, setTheme, setColorBlind, setHardMode }),
    [settings, resolvedTheme, setTheme, setColorBlind, setHardMode],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
