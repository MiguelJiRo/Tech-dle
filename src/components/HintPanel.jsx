import { useLanguage } from '../i18n/useLanguage';

const HINT_THRESHOLD = 4;
const MAX_HINTS = 1;

const formatHintValue = (t, field, value) => {
  if (field === 'type') return t(`techTypes.${value}`);
  if (field === 'paradigm') return t(`paradigms.${value}`);
  if (field === 'typing') return t(`typings.${value}`);
  return value;
};

const HintPanel = ({ guesses, gameOver, revealedHints, onReveal, canReveal }) => {
  const { t } = useLanguage();
  const buttonVisible = !gameOver && guesses.length >= HINT_THRESHOLD && revealedHints.length < MAX_HINTS && canReveal;

  if (revealedHints.length === 0 && !buttonVisible) return null;

  return (
    <div className="max-w-md mx-auto -mt-2 mb-6 space-y-2">
      {revealedHints.map((hint) => (
        <div
          key={hint.field}
          role="status"
          className="px-3 py-2 rounded-md text-sm bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100"
        >
          <span className="font-semibold">{t('game.hintLabel')}:</span>{' '}
          {t(`game.hintTypeLabel.${hint.field}`)}{' '}
          <strong>{formatHintValue(t, hint.field, hint.value)}</strong>
        </div>
      ))}
      {buttonVisible && (
        <button
          type="button"
          onClick={onReveal}
          className="w-full px-3 py-2 rounded-md text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {t('game.revealHint')}
        </button>
      )}
    </div>
  );
};

export default HintPanel;
export { HINT_THRESHOLD, MAX_HINTS };
