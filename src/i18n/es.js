export default {
  // Header
  header: {
    title: "Tech-dle",
    subtitle: "Adivina la tecnología del día"
  },

  // Game
  game: {
    loading: "Cargando...",
    guessPlaceholder: "Escribe el nombre de una tecnología...",
    attemptsLeft: "Intentos restantes",
    newTechAvailable: "Una nueva tecnología estará disponible mañana"
  },

  // Grid
  grid: {
    name: "Nombre",
    year: "Año",
    type: "Tipo",
    paradigm: "Paradigma",
    typing: "Tipado"
  },

  // Results
  results: {
    congratulations: "¡Felicidades!",
    won: "Has adivinado la tecnología en {count} intento",
    wonPlural: "Has adivinado la tecnología en {count} intentos",
    gameOver: "Game Over",
    correctAnswer: "La tecnología era:",
    shareResults: "Compartir Resultados",
    resultsCopied: "Resultados copiados al portapapeles"
  },

  // Color Guide
  colorGuide: {
    title: "Guía de Colores",
    correct: "Coincidencia exacta",
    partial: "Coincidencia parcial",
    yearWrong: "Año incorrecto (↑ mayor / ↓ menor)",
    incorrect: "No coincide"
  },

  // Stats Modal
  stats: {
    title: "Estadísticas",
    gamesPlayed: "Jugadas",
    winPercentage: "Victorias",
    currentStreak: "Racha",
    maxStreak: "Mejor Racha",
    guessDistribution: "Distribución de Intentos"
  },

  // Help Modal
  help: {
    title: "Cómo Jugar",
    intro: "Adivina la tecnología del día en 6 intentos. Cada intento te dará pistas sobre la tecnología correcta.",
    featuresTitle: "Características que se comparan:",
    features: {
      year: "Año de creación o lanzamiento",
      type: "Lenguaje, Framework, Base de Datos, Herramienta",
      paradigm: "Orientado a Objetos, Funcional, Multi-paradigma, etc.",
      typing: "Estático, Dinámico, Gradual, o No aplica"
    },
    colorsTitle: "Colores:",
    colors: {
      green: "Coincidencia exacta",
      yellow: "Coincidencia parcial (ej: Multi-paradigma)",
      orange: "Año incorrecto (↑ el año correcto es mayor / ↓ es menor)",
      gray: "No coincide"
    },
    tip: "Consejo:",
    tipText: "Usa el buscador para encontrar tecnologías disponibles. Se actualizará automáticamente mientras escribes.",
    footer: "Una nueva tecnología está disponible cada día a las 00:00"
  },

  // Technology types
  techTypes: {
    "Lenguaje": "Lenguaje",
    "Framework": "Framework",
    "Base de Datos": "Base de Datos",
    "Herramienta": "Herramienta"
  },

  // Paradigms
  paradigms: {
    "Multi-paradigma": "Multi-paradigma",
    "Orientado a Objetos": "Orientado a Objetos",
    "Funcional": "Funcional",
    "Imperativo": "Imperativo",
    "Declarativo": "Declarativo"
  },

  // Typing
  typings: {
    "Estático": "Estático",
    "Dinámico": "Dinámico",
    "Gradual": "Gradual",
    "No aplica": "No aplica"
  }
};
