import { useState, useEffect, lazy, Suspense } from 'react';
import { technologies, getTechnologyOfTheDay, getDateKey, getTechnologyForDateKey, isValidDateKey } from './data/technologies';
import { compareTechnologies, hasWon, computeHardModeConstraints, validateHardModeGuess, pickHint, availableHintFields } from './utils/gameLogic';
import { saveGameState, loadGameState, saveStats, loadStats, sharedStorageKey, loadAchievements, saveAchievements } from './utils/storage';
import { fireWinConfetti } from './utils/confetti';
import { ACHIEVEMENTS, newlyUnlocked } from './utils/achievements';
import { useLanguage } from './i18n/useLanguage';
import { useToast } from './toast/useToast';
import { useSettings } from './settings/useSettings';

const formatTechValue = (t, field, value) => {
  if (field === 'type') return t(`techTypes.${value}`);
  if (field === 'paradigm') return t(`paradigms.${value}`);
  if (field === 'typing') return t(`typings.${value}`);
  return value;
};
import Header from './components/Header';
import GuessGrid from './components/GuessGrid';
import TechnologyInput from './components/TechnologyInput';
import ColorGuide from './components/ColorGuide';
import Footer from './components/Footer';
import HintPanel, { MAX_HINTS } from './components/HintPanel';
import Countdown from './components/Countdown';

const StatsModal = lazy(() => import('./components/StatsModal'));
const HelpModal = lazy(() => import('./components/HelpModal'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));
const ArchiveModal = lazy(() => import('./components/ArchiveModal'));

const logo = '/logo.png';

const getSharedDateFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('d');
  if (!isValidDateKey(raw)) return null;
  // Reject future dates: only allow today or past
  if (raw > getDateKey()) return null;
  return raw;
};

const initializeGameState = () => {
  const sharedDate = getSharedDateFromUrl();
  const todayKey = getDateKey();
  const isShared = Boolean(sharedDate) && sharedDate !== todayKey;
  const dateKey = isShared ? sharedDate : todayKey;
  const target = isShared ? getTechnologyForDateKey(sharedDate) : getTechnologyOfTheDay();
  const storageKey = isShared ? sharedStorageKey(sharedDate) : undefined;
  const saved = loadGameState(storageKey);
  const resume = saved && saved.date === dateKey;
  return {
    targetTechnology: target,
    currentDate: dateKey,
    storageKey,
    isShared,
    guesses: resume ? saved.guesses : [],
    gameOver: resume ? saved.gameOver : false,
    gameWon: resume ? saved.gameWon : false,
    revealedHints: resume && Array.isArray(saved.revealedHints) ? saved.revealedHints : [],
    autoOpenStats: Boolean(resume && saved.gameOver),
  };
};

function App() {
  const { t } = useLanguage();
  const toast = useToast();
  const { settings } = useSettings();
  const [initialState] = useState(initializeGameState);
  const { targetTechnology, currentDate, autoOpenStats, isShared, storageKey } = initialState;
  const [guesses, setGuesses] = useState(initialState.guesses);
  const [gameOver, setGameOver] = useState(initialState.gameOver);
  const [gameWon, setGameWon] = useState(initialState.gameWon);
  const [revealedHints, setRevealedHints] = useState(initialState.revealedHints);
  const [stats, setStats] = useState(loadStats);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [hasOpenedStats, setHasOpenedStats] = useState(false);
  const [hasOpenedHelp, setHasOpenedHelp] = useState(false);
  const [hasOpenedSettings, setHasOpenedSettings] = useState(false);
  const [hasOpenedArchive, setHasOpenedArchive] = useState(false);

  const openStats = () => { setHasOpenedStats(true); setShowStats(true); };
  const openHelp = () => { setHasOpenedHelp(true); setShowHelp(true); };
  const openSettings = () => { setHasOpenedSettings(true); setShowSettings(true); };
  const openArchive = () => { setHasOpenedArchive(true); setShowArchive(true); };

  const revealHint = () => {
    if (gameOver || revealedHints.length >= MAX_HINTS) return;
    const hint = pickHint(targetTechnology, guesses, revealedHints);
    if (!hint) {
      toast.info(t('game.noMoreHints'));
      return;
    }
    setRevealedHints((prev) => [...prev, hint]);
  };

  const canRevealMore = availableHintFields(guesses, revealedHints).length > 0;

  // Auto-abrir el modal de stats si el juego ya estaba terminado al cargar
  useEffect(() => {
    if (!autoOpenStats) return undefined;
    const id = setTimeout(() => { setHasOpenedStats(true); setShowStats(true); }, 500);
    return () => clearTimeout(id);
  }, [autoOpenStats]);

  // Guardar estado cuando cambie
  useEffect(() => {
    if (targetTechnology) {
      const gameState = {
        date: currentDate,
        guesses,
        gameOver,
        gameWon,
        revealedHints,
        targetTechnology,
      };
      saveGameState(gameState, storageKey);
    }
  }, [guesses, gameOver, gameWon, revealedHints, currentDate, targetTechnology, storageKey]);

  const handleGuess = (technology) => {
    if (!targetTechnology) return;

    if (gameOver) {
      toast.info(t('toast.gameAlreadyOver'));
      return;
    }

    if (guesses.some(g => g.technology.id === technology.id)) {
      toast.error(t('toast.duplicateGuess'));
      return;
    }

    if (settings.hardMode && guesses.length > 0) {
      const constraints = computeHardModeConstraints(guesses);
      const validation = validateHardModeGuess(technology, constraints);
      if (!validation.valid) {
        const value = ['type', 'paradigm', 'typing'].includes(validation.reason)
          ? formatTechValue(t, validation.reason, validation.expected)
          : validation.expected;
        toast.error(t(`toast.hardMode.${validation.reason}`).replace('{value}', value));
        return;
      }
    }

    const comparison = compareTechnologies(technology, targetTechnology);
    const newGuesses = [...guesses, comparison];
    setGuesses(newGuesses);

    const won = hasWon(comparison);
    const lost = newGuesses.length >= 6 && !won;

    if (won || lost) {
      setGameOver(true);
      setGameWon(won);

      if (won) fireWinConfetti();

      // Actualizar estadísticas (solo en modo diario, no en puzzles compartidos)
      if (!isShared) {
        const newStats = { ...stats };
        newStats.gamesPlayed++;
        if (won) {
          newStats.gamesWon++;
          newStats.currentStreak++;
          newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
          newStats.guessDistribution[newGuesses.length - 1]++;
        } else {
          newStats.currentStreak = 0;
        }
        setStats(newStats);
        saveStats(newStats);

        // Logros recién desbloqueados
        const justUnlocked = newlyUnlocked(stats, newStats);
        if (justUnlocked.length > 0) {
          const seen = new Set(loadAchievements());
          const trulyNew = justUnlocked.filter((id) => !seen.has(id));
          if (trulyNew.length > 0) {
            const merged = [...seen, ...trulyNew];
            saveAchievements(merged);
            trulyNew.forEach((id, i) => {
              const def = ACHIEVEMENTS.find((a) => a.id === id);
              const icon = def?.icon ?? '🏅';
              setTimeout(() => {
                toast.success(`${icon} ${t('achievements.unlockedToast')} ${t(`achievements.${id}.title`)}`, { duration: 4500 });
              }, 1400 + i * 600);
            });
          }
        }
      }

      // Mostrar modal de estadísticas después de un breve delay
      setTimeout(() => { setHasOpenedStats(true); setShowStats(true); }, 1000);
    }
  };

  if (!targetTechnology) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <img
            src={logo}
            alt="Tech-dle"
            width="128"
            height="128"
            className="w-32 h-32 mx-auto mb-4 drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] animate-pulse"
            fetchpriority="high"
          />
          <p className="text-gray-600 dark:text-gray-300">{t('game.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-blue-600 focus:text-white focus:px-3 focus:py-2 focus:rounded-md focus:font-semibold focus-visible:ring-2 focus-visible:ring-white"
      >
        {t('a11y.skipToContent')}
      </a>

      <Header
        onOpenStats={openStats}
        onOpenHelp={openHelp}
        onOpenSettings={openSettings}
        onOpenArchive={openArchive}
      />

      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl" tabIndex={-1}>
        {isShared && (
          <div className="max-w-2xl mx-auto mb-6 px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100 text-sm flex items-center justify-between gap-3 flex-wrap">
            <span>{t('game.sharedBanner').replace('{date}', currentDate)}</span>
            <a
              href="/"
              className="font-semibold underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              {t('game.backToToday')}
            </a>
          </div>
        )}

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {t('header.subtitle')}
        </p>

        <GuessGrid guesses={guesses} maxGuesses={6} />

        {!gameOver && (
          <TechnologyInput
            technologies={technologies}
            onGuess={handleGuess}
            disabled={gameOver}
          />
        )}

        <HintPanel
          guesses={guesses}
          gameOver={gameOver}
          revealedHints={revealedHints}
          onReveal={revealHint}
          canReveal={canRevealMore}
        />

        {gameOver && (
          <div className="text-center mb-6" role="status" aria-live="polite">
            {gameWon ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-900 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">{t('results.congratulations')}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  {guesses.length === 1
                    ? t('results.won').replace('{count}', guesses.length)
                    : t('results.wonPlural').replace('{count}', guesses.length)
                  }
                </p>
              </div>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-900 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">{t('results.gameOver')}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {t('results.correctAnswer')} <strong className="text-gray-900 dark:text-white">{targetTechnology.name}</strong>
                </p>
              </div>
            )}
            {!isShared && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <Countdown />
              </p>
            )}
          </div>
        )}

        <ColorGuide />
      </main>

      <Suspense fallback={null}>
        {hasOpenedStats && (
          <StatsModal
            isOpen={showStats}
            onClose={() => setShowStats(false)}
            stats={stats}
            gameState={{
              guesses,
              gameOver,
              gameWon,
              targetTechnology,
              currentDate,
              isShared,
            }}
          />
        )}
        {hasOpenedHelp && (
          <HelpModal
            isOpen={showHelp}
            onClose={() => setShowHelp(false)}
          />
        )}
        {hasOpenedSettings && (
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
        {hasOpenedArchive && (
          <ArchiveModal
            isOpen={showArchive}
            onClose={() => setShowArchive(false)}
          />
        )}
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
