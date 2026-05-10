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
    newTechAvailable: "Una nueva tecnología estará disponible mañana",
    filterAll: "Todos",
    filterAllAria: "Mostrar todos los tipos",
    filterByAria: "Filtrar por {type}",
    nextIn: "Nueva tecnología en {h}h {m}m",
    sharedBanner: "Estás jugando el puzzle del {date}",
    backToToday: "Volver al puzzle de hoy",
    revealHint: "Pedir pista",
    hintLabel: "Pista",
    hintTypeLabel: {
      type: "El tipo es",
      paradigm: "El paradigma es",
      typing: "El tipado es"
    },
    noMoreHints: "No quedan pistas que revelar"
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
    resultsCopied: "Resultados copiados al portapapeles",
    copyFailed: "No se pudieron copiar los resultados"
  },

  // Archive
  archive: {
    title: "Archivo de puzzles",
    open: "Abrir archivo",
    help: "Juega puzzles de días anteriores. No suman a tus estadísticas diarias.",
    random: "Jugar uno al azar",
    empty: "Aún no hay puzzles anteriores disponibles.",
    wonShort: "Ganado en {n}",
    lostShort: "Perdido",
    inProgressShort: "En curso"
  },

  // Settings
  settings: {
    title: "Ajustes",
    open: "Abrir ajustes",
    theme: "Tema",
    themeOptions: {
      system: "Sistema",
      dark: "Oscuro",
      light: "Claro"
    },
    themeHelp: "Sigue la preferencia del sistema, o fija uno fijo.",
    colorBlind: "Modo daltónico",
    colorBlindHelp: "Añade símbolos a las celdas para distinguir el resultado sin depender del color.",
    hardMode: "Modo difícil",
    hardModeHelp: "Tus siguientes intentos deben respetar las pistas previas (rangos de año y campos confirmados)."
  },

  // Toasts
  toast: {
    duplicateGuess: "Ya has probado esa tecnología",
    gameAlreadyOver: "La partida ya ha terminado",
    hardMode: {
      minYear: "Modo difícil: el año debe ser ≥ {value}",
      maxYear: "Modo difícil: el año debe ser ≤ {value}",
      type: "Modo difícil: el tipo debe ser {value}",
      paradigm: "Modo difícil: el paradigma debe ser {value}",
      typing: "Modo difícil: el tipado debe ser {value}"
    }
  },

  // Accesibilidad
  a11y: {
    skipToContent: "Saltar al contenido",
    gridLabel: "Tablero de intentos",
    emptyRow: "Intento {n} de {total}, vacío",
    match: {
      correct: "coincidencia exacta",
      partial: "coincidencia parcial",
      higher: "el año correcto es mayor",
      lower: "el año correcto es menor",
      incorrect: "no coincide"
    },
    proximity: {
      near: "muy cerca",
      remote: "muy lejos"
    }
  },

  // Color Guide
  colorGuide: {
    title: "Guía de Colores",
    correct: "Coincidencia exacta",
    partial: "Coincidencia parcial",
    yearWrong: "Año cercano o lejano (↑ mayor / ↓ menor)",
    incorrect: "No coincide o año muy lejano"
  },

  // Stats Modal
  stats: {
    title: "Estadísticas",
    gamesPlayed: "Jugadas",
    winPercentage: "Victorias",
    currentStreak: "Racha",
    maxStreak: "Mejor Racha",
    guessDistribution: "Distribución de Intentos",
    achievementsTitle: "Logros",
    achievementsCount: "{n} de {total}"
  },

  // Achievements
  achievements: {
    unlockedToast: "¡Logro desbloqueado!",
    first_win: { title: "Primera victoria", desc: "Adivina la tecnología por primera vez." },
    ace: { title: "Ases en la manga", desc: "Adivina al primer intento." },
    second_try: { title: "A la segunda va la vencida", desc: "Adivina en dos intentos." },
    streak_3: { title: "En racha", desc: "Mantén una racha de 3 victorias seguidas." },
    streak_7: { title: "Imparable", desc: "Mantén una racha de 7 victorias seguidas." },
    streak_14: { title: "Quincena de oro", desc: "Mantén una racha de 14 victorias." },
    streak_30: { title: "Mes perfecto", desc: "Mantén una racha de 30 victorias." },
    games_10: { title: "Aprendiz", desc: "Juega 10 partidas." },
    games_50: { title: "Veterano", desc: "Juega 50 partidas." },
    games_100: { title: "Centenario", desc: "Juega 100 partidas." }
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
      yellow: "Coincidencia parcial (ej: Multi-paradigma) o año a ±5 años",
      orange: "Año desviado entre 6 y 20 años (↑ el correcto es mayor / ↓ es menor)",
      gray: "No coincide, o año a más de 20 años"
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
