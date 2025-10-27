import { useState, useEffect } from 'react';
import { technologies, getTechnologyOfTheDay, getDateKey } from './data/technologies';
import { compareTechnologies, hasWon } from './utils/gameLogic';
import { saveGameState, loadGameState, saveStats, loadStats } from './utils/storage';
import { useLanguage } from './i18n/LanguageContext';
import Header from './components/Header';
import GuessGrid from './components/GuessGrid';
import TechnologyInput from './components/TechnologyInput';
import ColorGuide from './components/ColorGuide';
import StatsModal from './components/StatsModal';
import HelpModal from './components/HelpModal';
import Footer from './components/Footer';

function App() {
  const { t } = useLanguage();
  const [targetTechnology, setTargetTechnology] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [stats, setStats] = useState(loadStats());
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [currentDate, setCurrentDate] = useState(getDateKey());

  // Inicializar el juego
  useEffect(() => {
    const dateKey = getDateKey();
    const target = getTechnologyOfTheDay();
    setTargetTechnology(target);

    // Cargar estado guardado
    const savedState = loadGameState();
    if (savedState && savedState.date === dateKey) {
      setGuesses(savedState.guesses);
      setGameOver(savedState.gameOver);
      setGameWon(savedState.gameWon);

      // Mostrar stats automáticamente si el juego terminó
      if (savedState.gameOver) {
        setTimeout(() => setShowStats(true), 500);
      }
    } else {
      // Nuevo día, limpiar estado
      setGuesses([]);
      setGameOver(false);
      setGameWon(false);
    }
  }, []);

  // Guardar estado cuando cambie
  useEffect(() => {
    if (targetTechnology) {
      const gameState = {
        date: currentDate,
        guesses,
        gameOver,
        gameWon,
        targetTechnology,
      };
      saveGameState(gameState);
    }
  }, [guesses, gameOver, gameWon, currentDate, targetTechnology]);

  const handleGuess = (technology) => {
    if (gameOver || !targetTechnology) return;

    // Evitar duplicados
    if (guesses.some(g => g.technology.id === technology.id)) {
      return;
    }

    const comparison = compareTechnologies(technology, targetTechnology);
    const newGuesses = [...guesses, comparison];
    setGuesses(newGuesses);

    const won = hasWon(comparison);
    const lost = newGuesses.length >= 6 && !won;

    if (won || lost) {
      setGameOver(true);
      setGameWon(won);

      // Actualizar estadísticas
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

      // Mostrar modal de estadísticas después de un breve delay
      setTimeout(() => setShowStats(true), 1000);
    }
  };

  if (!targetTechnology) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>{t('game.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        onOpenStats={() => setShowStats(true)}
        onOpenHelp={() => setShowHelp(true)}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <p className="text-center text-gray-400 mb-8">
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

        {gameOver && (
          <div className="text-center mb-6">
            {gameWon ? (
              <div className="bg-green-900/20 border border-green-900 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-500 mb-2">{t('results.congratulations')}</p>
                <p className="text-gray-300">
                  {guesses.length === 1
                    ? t('results.won').replace('{count}', guesses.length)
                    : t('results.wonPlural').replace('{count}', guesses.length)
                  }
                </p>
              </div>
            ) : (
              <div className="bg-red-900/20 border border-red-900 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-500 mb-2">{t('results.gameOver')}</p>
                <p className="text-gray-300 mb-2">
                  {t('results.correctAnswer')} <strong className="text-white">{targetTechnology.name}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        <ColorGuide />
      </div>

      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        gameState={{
          guesses,
          gameOver,
          gameWon,
          targetTechnology,
        }}
      />

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      <Footer />
    </div>
  );
}

export default App;
