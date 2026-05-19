import Modal from './Modal';
import { useLanguage } from '../i18n/useLanguage';
import { useToast } from '../toast/useToast';
import Countdown from './Countdown';
import { ACHIEVEMENTS, achievementsUnlocked } from '../utils/achievements';

const SHARE_BASE_URL = 'https://tech-dle.vercel.app';

const StatsModal = ({ isOpen, onClose, stats, gameState, onOpenHistory }) => {
  const { t } = useLanguage();
  const toast = useToast();
  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const maxGuessCount = Math.max(...stats.guessDistribution, 1);

  const yearEmoji = (m) => {
    if (m === 'correct') return '🟩';
    if (m === 'partial') return '🟨';
    if (m === 'higher' || m === 'lower') return '🟧';
    return '⬛';
  };
  const fieldEmoji = (m) => {
    if (m === 'correct') return '🟩';
    if (m === 'partial') return '🟨';
    return '⬛';
  };

  const copyResults = () => {
    const emojiGrid = gameState.guesses.map(guess =>
      yearEmoji(guess.year.match) + fieldEmoji(guess.type) + fieldEmoji(guess.paradigm) + fieldEmoji(guess.typing)
    ).join('\n');

    const url = gameState.currentDate ? `${SHARE_BASE_URL}/?d=${gameState.currentDate}` : SHARE_BASE_URL;
    const header = gameState.currentDate
      ? `Tech-dle ${gameState.currentDate} ${gameState.guesses.length}/6`
      : `Tech-dle ${gameState.guesses.length}/6`;
    const text = `${header}\n\n${emojiGrid}\n\n${url}`;
    navigator.clipboard.writeText(text)
      .then(() => toast.success(t('results.resultsCopied')))
      .catch(() => toast.error(t('results.copyFailed')));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('stats.title')}>
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('stats.gamesPlayed')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{winPercentage}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('stats.winPercentage')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('stats.currentStreak')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('stats.maxStreak')}</div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">{t('stats.guessDistribution')}</h3>
          <div className="space-y-1">
            {stats.guessDistribution.map((count, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-4 text-sm">{index + 1}</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-sm overflow-hidden">
                  <div
                    className="bg-blue-600 h-6 flex items-center justify-end pr-2 text-xs font-bold transition-all"
                    style={{
                      width: `${maxGuessCount > 0 ? (count / maxGuessCount) * 100 : 0}%`,
                      minWidth: count > 0 ? '2rem' : '0'
                    }}
                  >
                    {count > 0 && count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {gameState.gameWon && (
          <button
            onClick={copyResults}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {t('results.shareResults')}
          </button>
        )}

        {gameState.gameOver && !gameState.gameWon && (
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-300 dark:border-red-900">
            <p className="text-sm mb-2">{t('results.correctAnswer')}</p>
            <p className="text-xl font-bold">{gameState.targetTechnology?.name}</p>
          </div>
        )}

        {gameState.gameOver && !gameState.isShared && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Countdown />
          </div>
        )}

        {onOpenHistory && (
          <button
            type="button"
            onClick={onOpenHistory}
            className="w-full px-3 py-2 rounded-md text-sm font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {t('stats.viewHistory')}
          </button>
        )}

        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="font-bold">{t('stats.achievementsTitle')}</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {t('stats.achievementsCount')
                .replace('{n}', achievementsUnlocked(stats).size)
                .replace('{total}', ACHIEVEMENTS.length)}
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-2">
            {ACHIEVEMENTS.map((a) => {
              const unlocked = achievementsUnlocked(stats).has(a.id);
              return (
                <li
                  key={a.id}
                  className={`flex items-start gap-2 px-3 py-2 rounded-md border ${
                    unlocked
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700'
                      : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 opacity-60'
                  }`}
                  aria-label={`${unlocked ? '✓' : '✗'} ${t(`achievements.${a.id}.title`)}`}
                >
                  <span className={`text-xl leading-none ${unlocked ? '' : 'grayscale'}`} aria-hidden="true">{a.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {t(`achievements.${a.id}.title`)}
                    </span>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">
                      {t(`achievements.${a.id}.desc`)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default StatsModal;
