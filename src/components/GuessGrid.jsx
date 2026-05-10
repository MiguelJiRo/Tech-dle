import { MATCH_TYPES } from '../utils/gameLogic';
import { useLanguage } from '../i18n/useLanguage';

const yearArrow = (yearComparison) => {
  if (!yearComparison) return '';
  if (yearComparison.match === MATCH_TYPES.CORRECT) return '✓';
  if (yearComparison.match === MATCH_TYPES.HIGHER) return '↑';
  return '↓';
};

const cellColor = (match) => {
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

const matchLabel = (t, match) => {
  switch (match) {
    case MATCH_TYPES.CORRECT: return t('a11y.match.correct');
    case MATCH_TYPES.PARTIAL: return t('a11y.match.partial');
    case MATCH_TYPES.HIGHER:  return t('a11y.match.higher');
    case MATCH_TYPES.LOWER:   return t('a11y.match.lower');
    default:                  return t('a11y.match.incorrect');
  }
};

const buildRowSummary = (t, comparison) => {
  if (!comparison) return '';
  const parts = [
    `${t('grid.name')}: ${comparison.technology.name}`,
    `${t('grid.year')} ${comparison.technology.year} (${matchLabel(t, comparison.year.match)})`,
    `${t('grid.type')} ${t(`techTypes.${comparison.technology.type}`)} (${matchLabel(t, comparison.type)})`,
    `${t('grid.paradigm')} ${t(`paradigms.${comparison.technology.paradigm}`)} (${matchLabel(t, comparison.paradigm)})`,
    `${t('grid.typing')} ${t(`typings.${comparison.technology.typing}`)} (${matchLabel(t, comparison.typing)})`,
  ];
  return parts.join('. ');
};

const GuessRow = ({ comparison, rowIndex, totalRows }) => {
  const { t } = useLanguage();

  if (!comparison) {
    return (
      <div
        className="grid grid-cols-5 gap-2 mb-2"
        role="row"
        aria-label={t('a11y.emptyRow').replace('{n}', rowIndex + 1).replace('{total}', totalRows)}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded p-3 h-20 border border-gray-700" aria-hidden="true" />
        ))}
      </div>
    );
  }

  const tech = comparison.technology;
  const summary = buildRowSummary(t, comparison);

  return (
    <div className="grid grid-cols-5 gap-2 mb-2" role="row" aria-label={summary}>
      <div
        className="rounded p-3 text-center flex flex-col justify-center items-center bg-blue-600"
        role="cell"
        aria-label={`${t('grid.name')}: ${tech.name}`}
      >
        <div className="text-xs text-gray-200 mb-1" aria-hidden="true">{t('grid.name')}</div>
        <div className="font-bold text-sm">{tech.name}</div>
      </div>

      <div
        className={`${cellColor(comparison.year.match)} rounded p-3 text-center flex flex-col justify-center items-center`}
        role="cell"
        aria-label={`${t('grid.year')} ${tech.year}, ${matchLabel(t, comparison.year.match)}`}
      >
        <div className="text-xs text-gray-200 mb-1" aria-hidden="true">{t('grid.year')}</div>
        <div className="font-bold">{tech.year}</div>
        <div className="text-xl" aria-hidden="true">{yearArrow(comparison.year)}</div>
      </div>

      <div
        className={`${cellColor(comparison.type)} rounded p-3 text-center flex flex-col justify-center items-center`}
        role="cell"
        aria-label={`${t('grid.type')} ${t(`techTypes.${tech.type}`)}, ${matchLabel(t, comparison.type)}`}
      >
        <div className="text-xs text-gray-200 mb-1" aria-hidden="true">{t('grid.type')}</div>
        <div className="font-bold text-sm">{t(`techTypes.${tech.type}`)}</div>
      </div>

      <div
        className={`${cellColor(comparison.paradigm)} rounded p-3 text-center flex flex-col justify-center items-center`}
        role="cell"
        aria-label={`${t('grid.paradigm')} ${t(`paradigms.${tech.paradigm}`)}, ${matchLabel(t, comparison.paradigm)}`}
      >
        <div className="text-xs text-gray-200 mb-1" aria-hidden="true">{t('grid.paradigm')}</div>
        <div className="font-bold text-sm">{t(`paradigms.${tech.paradigm}`)}</div>
      </div>

      <div
        className={`${cellColor(comparison.typing)} rounded p-3 text-center flex flex-col justify-center items-center`}
        role="cell"
        aria-label={`${t('grid.typing')} ${t(`typings.${tech.typing}`)}, ${matchLabel(t, comparison.typing)}`}
      >
        <div className="text-xs text-gray-200 mb-1" aria-hidden="true">{t('grid.typing')}</div>
        <div className="font-bold text-sm">{t(`typings.${tech.typing}`)}</div>
      </div>
    </div>
  );
};

const GuessGrid = ({ guesses, maxGuesses = 6 }) => {
  const { t } = useLanguage();
  const rows = [...Array(maxGuesses)].map((_, i) => guesses[i] || null);
  const lastGuess = guesses[guesses.length - 1];

  return (
    <div className="mb-6" role="grid" aria-label={t('a11y.gridLabel')}>
      {rows.map((guess, i) => (
        <GuessRow key={i} comparison={guess} rowIndex={i} totalRows={maxGuesses} />
      ))}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {lastGuess ? buildRowSummary(t, lastGuess) : ''}
      </div>
    </div>
  );
};

export default GuessGrid;
