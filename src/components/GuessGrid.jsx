import { useState } from 'react';
import { MATCH_TYPES, matchSymbol } from '../utils/gameLogic';
import { useLanguage } from '../i18n/useLanguage';
import { useSettings } from '../settings/useSettings';

const yearArrow = (yearComparison) => {
  if (!yearComparison) return '';
  if (yearComparison.match === MATCH_TYPES.CORRECT) return '✓';
  if (yearComparison.match === MATCH_TYPES.HIGHER) return '↑';
  return '↓';
};

const cellColor = (match) => {
  switch (match) {
    case MATCH_TYPES.CORRECT:
      return 'bg-green-600 text-white';
    case MATCH_TYPES.PARTIAL:
      return 'bg-yellow-500 dark:bg-yellow-600 text-white';
    case MATCH_TYPES.HIGHER:
    case MATCH_TYPES.LOWER:
      return 'bg-orange-500 dark:bg-orange-600 text-white';
    default:
      return 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white';
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

const Cell = ({ value, ariaLabel, color, animate, delayIndex, extra, badge }) => (
  <div
    role="cell"
    aria-label={ariaLabel}
    className={`${color} relative rounded p-2 sm:p-3 min-h-16 sm:min-h-20 text-center flex flex-col justify-center items-center ${animate ? 'animate-[cell-flip_550ms_ease-out_both]' : ''}`}
    style={animate ? { animationDelay: `${delayIndex * 140}ms` } : undefined}
  >
    {badge && (
      <span
        aria-hidden="true"
        className="absolute top-1 right-1 text-[0.65rem] sm:text-xs font-bold leading-none bg-black/30 text-white rounded px-1 py-0.5 min-w-[1rem] text-center"
      >
        {badge}
      </span>
    )}
    <div className="font-bold text-xs sm:text-sm break-words leading-tight">{value}</div>
    {extra}
  </div>
);

const GuessRow = ({ comparison, rowIndex, totalRows, isJustAdded, colorBlind }) => {
  const { t } = useLanguage();

  if (!comparison) {
    return (
      <div
        className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-1.5 sm:mb-2"
        role="row"
        aria-label={t('a11y.emptyRow').replace('{n}', rowIndex + 1).replace('{total}', totalRows)}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded min-h-16 sm:min-h-20 border border-gray-300 dark:border-gray-700" aria-hidden="true" />
        ))}
      </div>
    );
  }

  const tech = comparison.technology;
  const summary = buildRowSummary(t, comparison);

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-1.5 sm:mb-2" role="row" aria-label={summary}>
      <Cell
        color="bg-blue-600 text-white"
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
        badge={colorBlind ? matchSymbol(comparison.year.match) : null}
        extra={<div className="text-base sm:text-lg leading-none mt-0.5" aria-hidden="true">{yearArrow(comparison.year)}</div>}
      />
      <Cell
        color={cellColor(comparison.type)}
        value={t(`techTypes.${tech.type}`)}
        ariaLabel={`${t('grid.type')} ${t(`techTypes.${tech.type}`)}, ${matchLabel(t, comparison.type)}`}
        animate={isJustAdded}
        delayIndex={2}
        badge={colorBlind ? matchSymbol(comparison.type) : null}
      />
      <Cell
        color={cellColor(comparison.paradigm)}
        value={t(`paradigms.${tech.paradigm}`)}
        ariaLabel={`${t('grid.paradigm')} ${t(`paradigms.${tech.paradigm}`)}, ${matchLabel(t, comparison.paradigm)}`}
        animate={isJustAdded}
        delayIndex={3}
        badge={colorBlind ? matchSymbol(comparison.paradigm) : null}
      />
      <Cell
        color={cellColor(comparison.typing)}
        value={t(`typings.${tech.typing}`)}
        ariaLabel={`${t('grid.typing')} ${t(`typings.${tech.typing}`)}, ${matchLabel(t, comparison.typing)}`}
        animate={isJustAdded}
        delayIndex={4}
        badge={colorBlind ? matchSymbol(comparison.typing) : null}
      />
    </div>
  );
};

const GuessGrid = ({ guesses, maxGuesses = 6 }) => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const colorBlind = settings.colorBlind;
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
        className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2 px-1 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center"
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
          colorBlind={colorBlind}
        />
      ))}

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {lastGuess ? buildRowSummary(t, lastGuess) : ''}
      </div>
    </div>
  );
};

export default GuessGrid;
