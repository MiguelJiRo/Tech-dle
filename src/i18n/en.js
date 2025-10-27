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
    newTechAvailable: "A new technology will be available tomorrow"
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
    resultsCopied: "Results copied to clipboard"
  },

  // Color Guide
  colorGuide: {
    title: "Color Guide",
    correct: "Exact match",
    partial: "Partial match",
    yearWrong: "Wrong year (↑ higher / ↓ lower)",
    incorrect: "No match"
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
      yellow: "Partial match (e.g., Multi-paradigm)",
      orange: "Wrong year (↑ correct year is higher / ↓ lower)",
      gray: "No match"
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
