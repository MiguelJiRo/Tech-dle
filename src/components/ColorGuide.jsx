import { useLanguage } from '../i18n/useLanguage';
import { useSettings } from '../settings/useSettings';

const Swatch = ({ className, symbol }) => (
  <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold text-white ${className}`}>
    {symbol}
  </div>
);

const ColorGuide = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const cb = settings.colorBlind;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-lg mb-3 text-center text-gray-900 dark:text-white">{t('colorGuide.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <Swatch className="bg-green-600" symbol={cb ? '✓' : null} />
          <span>{t('colorGuide.correct')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Swatch className="bg-yellow-500 dark:bg-yellow-600" symbol={cb ? '~' : null} />
          <span>{t('colorGuide.partial')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Swatch className="bg-orange-500 dark:bg-orange-600" symbol={cb ? '↑↓' : null} />
          <span>{t('colorGuide.yearWrong')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Swatch className="bg-gray-300 dark:bg-gray-700 !text-gray-800 dark:!text-white" symbol={cb ? '✕' : null} />
          <span>{t('colorGuide.incorrect')}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorGuide;
