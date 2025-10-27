import { MATCH_TYPES } from '../utils/gameLogic';
import { useLanguage } from '../i18n/LanguageContext';

const GuessRow = ({ comparison }) => {
  const { t } = useLanguage();
  const getYearDisplay = (yearComparison) => {
    if (!yearComparison) return '';
    if (yearComparison.match === MATCH_TYPES.CORRECT) {
      return '✓';
    } else if (yearComparison.match === MATCH_TYPES.HIGHER) {
      return '↑';
    } else {
      return '↓';
    }
  };

  const getCellColor = (match) => {
    switch (match) {
      case MATCH_TYPES.CORRECT:
        return 'bg-green-600';
      case MATCH_TYPES.PARTIAL:
        return 'bg-yellow-600';
      case MATCH_TYPES.HIGHER:
      case MATCH_TYPES.LOWER:
        return 'bg-orange-600';
      default:
        return 'bg-gray-700';
    }
  };

  if (!comparison) {
    return (
      <div className="grid grid-cols-5 gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded p-3 h-20 border border-gray-700"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      <div className="rounded p-3 text-center flex flex-col justify-center items-center bg-blue-600">
        <div className="text-xs text-gray-200 mb-1">{t('grid.name')}</div>
        <div className="font-bold text-sm">{comparison.technology.name}</div>
      </div>

      <div className={`${getCellColor(comparison.year.match)} rounded p-3 text-center flex flex-col justify-center items-center`}>
        <div className="text-xs text-gray-200 mb-1">{t('grid.year')}</div>
        <div className="font-bold">{comparison.technology.year}</div>
        <div className="text-xl">{getYearDisplay(comparison.year)}</div>
      </div>

      <div className={`${getCellColor(comparison.type)} rounded p-3 text-center flex flex-col justify-center items-center`}>
        <div className="text-xs text-gray-200 mb-1">{t('grid.type')}</div>
        <div className="font-bold text-sm">{t(`techTypes.${comparison.technology.type}`)}</div>
      </div>

      <div className={`${getCellColor(comparison.paradigm)} rounded p-3 text-center flex flex-col justify-center items-center`}>
        <div className="text-xs text-gray-200 mb-1">{t('grid.paradigm')}</div>
        <div className="font-bold text-sm">{t(`paradigms.${comparison.technology.paradigm}`)}</div>
      </div>

      <div className={`${getCellColor(comparison.typing)} rounded p-3 text-center flex flex-col justify-center items-center`}>
        <div className="text-xs text-gray-200 mb-1">{t('grid.typing')}</div>
        <div className="font-bold text-sm">{t(`typings.${comparison.technology.typing}`)}</div>
      </div>
    </div>
  );
};

const GuessGrid = ({ guesses, maxGuesses = 6 }) => {
  const rows = [...Array(maxGuesses)].map((_, i) => guesses[i] || null);

  return (
    <div className="mb-6">
      {rows.map((guess, i) => (
        <GuessRow key={i} comparison={guess} />
      ))}
    </div>
  );
};

export default GuessGrid;
