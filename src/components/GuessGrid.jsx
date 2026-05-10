import { useState } from 'react';
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
  return [
    `${t('grid.name')}: ${comparison.technology.name}`,
    `${t('grid.year')} ${comparison.technology.year} (${matchLabel(t, comparison.year.match)})`,
    `${t('grid.type')} ${t(`techTypes.${comparison.technology.type}`)} (${matchLabel(t, comparison.type)})`,
    `${t('grid.paradigm')} ${t(`paradigms.${comparison.technology.paradigm}`)} (${matchLabel(t, comparison.paradigm)})`,
    `${t('grid.typing')} ${t(`typings.${comparison.technology.typing}`)} (${matchLabel(t, comparison.typing)})`,
  ].join('. ');
};

const Cell = ({ value, ariaLabel, color, animate, delayIndex, extra }) => (
  <div
    role="cell"
    aria-label={ariaLabel}
    className={`${color} rounded p-2 sm:p-3 min-h-16 sm:min-h-20 text-center flex flex-col justify-center items-center ${animate ? 'animate-[cell-flip_550ms_ease-out_both]' : ''}`}
    style={animate ? { animationDelay: `${delayIndex * 140}ms` } : undefined}
  >
    <div className="font-bold text-xs sm:text-sm break-words leading-tight">{value}</div>
    {extra}
  </div>
);

const GuessRow = ({ comparison, rowIndex, totalRows, isJustAdded }) => {
  const { t } = useLanguage();

  if (!comparison) {
    return (
      <div
        className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-1.5 sm:mb-2"
        role="row"
        aria-label={t('a11y.emptyRow').replace('{n}', rowIndex + 1).replace('{total}', totalRows)}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded min-h-16 sm:min-h-20 border border-gray-700" aria-hidden="true" />
        ))}
      </div>
    );
  }

  const tech = comparison.technology;
  const summary = buildRowSummary(t, comparison);

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-1.5 sm:mb-2" role="row" aria-label={summary}>
      <Cell
        color="bg-blue-600"
        value={tech.name}
        ariaLabel={`${t('grid.name')}: ${tech.name}`}
        animate={isJustAdded}
        delayIndex={0}
      />
      <Cell
        color={cellColor(comparison.year.match)}
        value={tech.year}
        ariaLabel={`${t('grid.year')} ${tech.year}, ${matchLabel(t, comparison.year.match)}`}
        animate={isJustAdded}
        delayIndex={1}
        extra={<div className="text-base sm:text-lg leading-none mt-0.5" aria-hidden="true">{yearArrow(comparison.year)}</div>}
      />
      <Cell
        color={cellColor(comparison.type)}
        value={t(`techTypes.${tech.type}`)}
        ariaLabel={`${t('grid.type')} ${t(`techTypes.${tech.type}`)}, ${matchLabel(t, comparison.type)}`}
        animate={isJustAdded}
        delayIndex={2}
      />
      <Cell
        color={cellColor(comparison.paradigm)}
        value={t(`paradigms.${tech.paradigm}`)}
        ariaLabel={`${t('grid.paradigm')} ${t(`paradigms.${tech.paradigm}`)}, ${matchLabel(t, comparison.paradigm)}`}
        animate={isJustAdded}
        delayIndex={3}
      />
      <Cell
        color={cellColor(comparison.typing)}
        value={t(`typings.${tech.typing}`)}
        ariaLabel={`${t('grid.typing')} ${t(`typings.${tech.typing}`)}, ${matchLabel(t, comparison.typing)}`}
        animate={isJustAdded}
        delayIndex={4}
      />
    </div>
  );
};

const GuessGrid = ({ guesses, maxGuesses = 6 }) => {
  const { t } = useLanguage();
  const [prevCount, setPrevCount] = useState(guesses.length);
  const [justAddedIndex, setJustAddedIndex] = useState(-1);

  if (guesses.length !== prevCount) {
    setPrevCount(guesses.length);
    setJustAddedIndex(guesses.length > prevCount ? guesses.length - 1 : -1);
  }

  const rows = [...Array(maxGuesses)].map((_, i) => guesses[i] || null);
  const lastGuess = guesses[guesses.length - 1];

  return (
    <div className="mb-6" role="grid" aria-label={t('a11y.gridLabel')}>
      <div
        className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2 px-1 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 text-center"
        role="row"
        aria-hidden="true"
      >
        <div>{t('grid.name')}</div>
        <div>{t('grid.year')}</div>
        <div>{t('grid.type')}</div>
        <div>{t('grid.paradigm')}</div>
        <div>{t('grid.typing')}</div>
      </div>

      {rows.map((guess, i) => (
        <GuessRow
          key={i}
          comparison={guess}
          rowIndex={i}
          totalRows={maxGuesses}
          isJustAdded={i === justAddedIndex}
        />
      ))}

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {lastGuess ? buildRowSummary(t, lastGuess) : ''}
      </div>
    </div>
  );
};

export default GuessGrid;
