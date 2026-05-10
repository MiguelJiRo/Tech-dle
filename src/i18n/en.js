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
    guessDistribution: "Guess Distribution"
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
