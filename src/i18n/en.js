export default {
  // Header
  header: {
    title: "Tech-dle",
    subtitle: "Guess the technology of the day"
  },

  // Game
  game: {
    loading: "Loading...",
    guessPlaceholder: "Type a technology name...",
    attemptsLeft: "Attempts left",
    newTechAvailable: "A new technology will be available tomorrow",
    filterAll: "All",
    filterAllAria: "Show all types",
    filterByAria: "Filter by {type}",
    nextIn: "New tech in {h}h {m}m",
    sharedBanner: "You're playing the puzzle from {date}",
    backToToday: "Back to today's puzzle",
    revealHint: "Reveal a hint",
    hintLabel: "Hint",
    hintTypeLabel: {
      type: "The type is",
      paradigm: "The paradigm is",
      typing: "The typing is"
    },
    noMoreHints: "No more hints to reveal"
  },

  // Grid
  grid: {
    name: "Name",
    year: "Year",
    type: "Type",
    paradigm: "Paradigm",
    typing: "Typing"
  },

  // Results
  results: {
    congratulations: "Congratulations!",
    won: "You guessed the technology in {count} attempt",
    wonPlural: "You guessed the technology in {count} attempts",
    gameOver: "Game Over",
    correctAnswer: "The technology was:",
    shareResults: "Share Results",
    resultsCopied: "Results copied to clipboard",
    copyFailed: "Could not copy results"
  },

  // Archive
  archive: {
    title: "Puzzle archive",
    open: "Open archive",
    help: "Play puzzles from previous days. They don't count toward your daily stats.",
    random: "Play a random one",
    empty: "No past puzzles available yet.",
    wonShort: "Won in {n}",
    lostShort: "Lost",
    inProgressShort: "In progress"
  },

  // Settings
  settings: {
    title: "Settings",
    open: "Open settings",
    theme: "Theme",
    themeOptions: {
      system: "System",
      dark: "Dark",
      light: "Light"
    },
    themeHelp: "Follow your system preference or pick a fixed one.",
    colorBlind: "Color-blind mode",
    colorBlindHelp: "Add symbols to cells so the result is distinguishable without relying on color.",
    hardMode: "Hard mode",
    hardModeHelp: "Future guesses must honor previous hints (year ranges and confirmed fields)."
  },

  // Toasts
  toast: {
    duplicateGuess: "You already tried that technology",
    gameAlreadyOver: "The game is already over",
    hardMode: {
      minYear: "Hard mode: year must be ≥ {value}",
      maxYear: "Hard mode: year must be ≤ {value}",
      type: "Hard mode: type must be {value}",
      paradigm: "Hard mode: paradigm must be {value}",
      typing: "Hard mode: typing must be {value}"
    }
  },

  // Accessibility
  a11y: {
    skipToContent: "Skip to content",
    gridLabel: "Guess board",
    emptyRow: "Attempt {n} of {total}, empty",
    match: {
      correct: "exact match",
      partial: "partial match",
      higher: "correct year is later",
      lower: "correct year is earlier",
      incorrect: "no match"
    },
    proximity: {
      near: "very close",
      remote: "far off"
    }
  },

  // Color Guide
  colorGuide: {
    title: "Color Guide",
    correct: "Exact match",
    partial: "Partial match",
    yearWrong: "Year nearby or off (↑ higher / ↓ lower)",
    incorrect: "No match or year far off"
  },

  // Stats Modal
  stats: {
    title: "Statistics",
    gamesPlayed: "Played",
    winPercentage: "Win %",
    currentStreak: "Streak",
    maxStreak: "Max Streak",
    guessDistribution: "Guess Distribution",
    achievementsTitle: "Achievements",
    achievementsCount: "{n} of {total}"
  },

  // Achievements
  achievements: {
    unlockedToast: "Achievement unlocked!",
    first_win: { title: "First win", desc: "Guess the technology for the first time." },
    ace: { title: "Ace", desc: "Guess on the very first try." },
    second_try: { title: "Second try is the charm", desc: "Guess in two attempts." },
    streak_3: { title: "On a roll", desc: "Keep a 3-day winning streak." },
    streak_7: { title: "Unstoppable", desc: "Keep a 7-day winning streak." },
    streak_14: { title: "Two-week star", desc: "Keep a 14-day winning streak." },
    streak_30: { title: "Perfect month", desc: "Keep a 30-day winning streak." },
    games_10: { title: "Apprentice", desc: "Play 10 games." },
    games_50: { title: "Veteran", desc: "Play 50 games." },
    games_100: { title: "Centenary", desc: "Play 100 games." }
  },

  // Help Modal
  help: {
    title: "How to Play",
    intro: "Guess the technology of the day in 6 attempts. Each guess will give you clues about the correct technology.",
    featuresTitle: "Features being compared:",
    features: {
      year: "Year of creation or release",
      type: "Language, Framework, Database, Tool",
      paradigm: "Object-Oriented, Functional, Multi-paradigm, etc.",
      typing: "Static, Dynamic, Gradual, or Not applicable"
    },
    colorsTitle: "Colors:",
    colors: {
      green: "Exact match",
      yellow: "Partial match (e.g., Multi-paradigm) or year within 5 years",
      orange: "Year off by 6 to 20 years (↑ correct is higher / ↓ lower)",
      gray: "No match, or year more than 20 years off"
    },
    tip: "Tip:",
    tipText: "Use the search box to find available technologies. It will update automatically as you type.",
    footer: "A new technology is available every day at 00:00"
  },

  // Technology types
  techTypes: {
    "Lenguaje": "Language",
    "Framework": "Framework",
    "Base de Datos": "Database",
    "Herramienta": "Tool"
  },

  // Paradigms
  paradigms: {
    "Multi-paradigma": "Multi-paradigm",
    "Orientado a Objetos": "Object-Oriented",
    "Funcional": "Functional",
    "Imperativo": "Imperative",
    "Declarativo": "Declarative"
  },

  // Typing
  typings: {
    "Estático": "Static",
    "Dinámico": "Dynamic",
    "Gradual": "Gradual",
    "No aplica": "Not applicable"
  }
};
