import Modal from './Modal';
import { useLanguage } from '../i18n/useLanguage';
import { useSettings } from '../settings/useSettings';

const THEMES = ['system', 'dark', 'light'];

const ThemeIcon = ({ theme }) => {
  const common = 'w-5 h-5';
  if (theme === 'dark') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  if (theme === 'light') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
};

const Toggle = ({ checked, onChange, label, describedBy }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    aria-describedby={describedBy}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
      checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0.5'
      }`}
    />
  </button>
);

const SettingsModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { settings, setTheme, setColorBlind } = useSettings();
  const colorBlindHelpId = 'settings-colorblind-help';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('settings.title')}>
      <div className="space-y-6">
        <fieldset>
          <legend className="font-bold text-base mb-2 text-gray-900 dark:text-white">{t('settings.theme')}</legend>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('settings.themeHelp')}</p>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t('settings.theme')}>
            {THEMES.map((theme) => {
              const active = settings.theme === theme;
              return (
                <button
                  key={theme}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTheme(theme)}
                  className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-400'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/60'
                  }`}
                >
                  <ThemeIcon theme={theme} />
                  <span className="text-sm font-medium">{t(`settings.themeOptions.${theme}`)}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base text-gray-900 dark:text-white">{t('settings.colorBlind')}</p>
              <p id={colorBlindHelpId} className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('settings.colorBlindHelp')}
              </p>
            </div>
            <Toggle
              checked={settings.colorBlind}
              onChange={setColorBlind}
              label={t('settings.colorBlind')}
              describedBy={colorBlindHelpId}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
