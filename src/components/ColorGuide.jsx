import { useLanguage } from '../i18n/useLanguage';

const ColorGuide = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-lg mb-3 text-center text-gray-900 dark:text-white">{t('colorGuide.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded"></div>
          <span>{t('colorGuide.correct')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-500 dark:bg-yellow-600 rounded"></div>
          <span>{t('colorGuide.partial')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 dark:bg-orange-600 rounded"></div>
          <span>{t('colorGuide.yearWrong')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <span>{t('colorGuide.incorrect')}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorGuide;
