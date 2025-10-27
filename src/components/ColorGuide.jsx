import { useLanguage } from '../i18n/LanguageContext';

const ColorGuide = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="font-bold text-lg mb-3 text-center">{t('colorGuide.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded"></div>
          <span>{t('colorGuide.correct')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-600 rounded"></div>
          <span>{t('colorGuide.partial')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-600 rounded"></div>
          <span>{t('colorGuide.yearWrong')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <span>{t('colorGuide.incorrect')}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorGuide;
