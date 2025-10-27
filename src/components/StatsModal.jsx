import Modal from './Modal';
import { useLanguage } from '../i18n/LanguageContext';

const StatsModal = ({ isOpen, onClose, stats, gameState }) => {
  const { t } = useLanguage();
  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const maxGuessCount = Math.max(...stats.guessDistribution, 1);

  const copyResults = () => {
    const emojiGrid = gameState.guesses.map(guess => {
      const emojis = [];
      // Year
      if (guess.year.match === 'correct') emojis.push('🟩');
      else emojis.push('🟧');
      // Type
      if (guess.type === 'correct') emojis.push('🟩');
      else if (guess.type === 'partial') emojis.push('🟨');
      else emojis.push('⬛');
      // Paradigm
      if (guess.paradigm === 'correct') emojis.push('🟩');
      else if (guess.paradigm === 'partial') emojis.push('🟨');
      else emojis.push('⬛');
      // Typing
      if (guess.typing === 'correct') emojis.push('🟩');
      else if (guess.typing === 'partial') emojis.push('🟨');
      else emojis.push('⬛');
      return emojis.join('');
    }).join('\n');

    const text = `Tech-dle ${gameState.guesses.length}/6\n\n${emojiGrid}\n\nhttps://tech-dle.app`;
    navigator.clipboard.writeText(text);
    alert(t('results.resultsCopied'));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('stats.title')}>
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-xs text-gray-400">{t('stats.gamesPlayed')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{winPercentage}%</div>
            <div className="text-xs text-gray-400">{t('stats.winPercentage')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-gray-400">{t('stats.currentStreak')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-xs text-gray-400">{t('stats.maxStreak')}</div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">{t('stats.guessDistribution')}</h3>
          <div className="space-y-1">
            {stats.guessDistribution.map((count, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-4 text-sm">{index + 1}</span>
                <div className="flex-1 bg-gray-700 rounded overflow-hidden">
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
          <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-900">
            <p className="text-sm mb-2">{t('results.correctAnswer')}</p>
            <p className="text-xl font-bold">{gameState.targetTechnology?.name}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default StatsModal;
