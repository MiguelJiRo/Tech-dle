export default {
  header: {
    title: "Tech-dle",
    subtitle: "Errate die Technologie des Tages"
  },

  game: {
    loading: "Lädt...",
    guessPlaceholder: "Gib den Namen einer Technologie ein...",
    attemptsLeft: "Verbleibende Versuche",
    newTechAvailable: "Eine neue Technologie ist morgen verfügbar",
    filterAll: "Alle",
    filterAllAria: "Alle Typen anzeigen",
    filterByAria: "Nach {type} filtern",
    nextIn: "Neue Technologie in {h}h {m}m",
    sharedBanner: "Du spielst das Puzzle vom {date}",
    backToToday: "Zurück zum heutigen Puzzle",
    revealHint: "Hinweis anfordern",
    hintLabel: "Hinweis",
    hintTypeLabel: {
      type: "Der Typ ist",
      paradigm: "Das Paradigma ist",
      typing: "Die Typisierung ist"
    },
    noMoreHints: "Keine weiteren Hinweise verfügbar"
  },

  grid: {
    name: "Name",
    year: "Jahr",
    type: "Typ",
    paradigm: "Paradigma",
    typing: "Typisierung"
  },

  results: {
    congratulations: "Glückwunsch!",
    won: "Du hast die Technologie in {count} Versuch erraten",
    wonPlural: "Du hast die Technologie in {count} Versuchen erraten",
    gameOver: "Spiel vorbei",
    correctAnswer: "Die Technologie war:",
    shareResults: "Ergebnisse teilen",
    resultsCopied: "Ergebnisse in die Zwischenablage kopiert",
    copyFailed: "Ergebnisse konnten nicht kopiert werden"
  },

  archive: {
    title: "Puzzle-Archiv",
    open: "Archiv öffnen",
    help: "Spiele Puzzles vergangener Tage. Sie zählen nicht zu deinen täglichen Statistiken.",
    random: "Zufälliges spielen",
    empty: "Noch keine vergangenen Puzzles verfügbar.",
    wonShort: "Gewonnen in {n}",
    lostShort: "Verloren",
    inProgressShort: "Laufend"
  },

  settings: {
    title: "Einstellungen",
    open: "Einstellungen öffnen",
    theme: "Design",
    themeOptions: {
      system: "System",
      dark: "Dunkel",
      light: "Hell"
    },
    themeHelp: "Folge der Systemeinstellung oder wähle ein festes Design.",
    colorBlind: "Farbenblind-Modus",
    colorBlindHelp: "Fügt Symbole zu den Zellen hinzu, um das Ergebnis ohne Farben zu unterscheiden.",
    hardMode: "Harter Modus",
    hardModeHelp: "Deine nächsten Versuche müssen die vorherigen Hinweise berücksichtigen (Jahresbereiche und bestätigte Felder)."
  },

  toast: {
    duplicateGuess: "Du hast diese Technologie bereits versucht",
    gameAlreadyOver: "Das Spiel ist bereits vorbei",
    hardMode: {
      minYear: "Harter Modus: Jahr muss ≥ {value} sein",
      maxYear: "Harter Modus: Jahr muss ≤ {value} sein",
      type: "Harter Modus: Typ muss {value} sein",
      paradigm: "Harter Modus: Paradigma muss {value} sein",
      typing: "Harter Modus: Typisierung muss {value} sein"
    }
  },

  a11y: {
    skipToContent: "Zum Inhalt springen",
    gridLabel: "Versuchsraster",
    emptyRow: "Versuch {n} von {total}, leer",
    match: {
      correct: "exakte Übereinstimmung",
      partial: "teilweise Übereinstimmung",
      higher: "das richtige Jahr ist später",
      lower: "das richtige Jahr ist früher",
      incorrect: "keine Übereinstimmung"
    },
    proximity: {
      near: "sehr nah",
      remote: "sehr weit weg"
    }
  },

  colorGuide: {
    title: "Farbleitfaden",
    correct: "Exakte Übereinstimmung",
    partial: "Teilweise Übereinstimmung",
    yearWrong: "Jahr nahe oder fern (↑ später / ↓ früher)",
    incorrect: "Keine Übereinstimmung oder Jahr sehr weit entfernt"
  },

  stats: {
    title: "Statistiken",
    gamesPlayed: "Gespielt",
    winPercentage: "Siege",
    currentStreak: "Serie",
    maxStreak: "Beste Serie",
    guessDistribution: "Verteilung der Versuche",
    achievementsTitle: "Erfolge",
    achievementsCount: "{n} von {total}",
    viewHistory: "Verlauf anzeigen"
  },

  achievements: {
    unlockedToast: "Erfolg freigeschaltet!",
    first_win:  { title: "Erster Sieg",          desc: "Errate die Technologie zum ersten Mal." },
    ace:        { title: "Ass",                  desc: "Errate beim ersten Versuch." },
    second_try: { title: "Zweite Chance",        desc: "Errate in zwei Versuchen." },
    streak_3:   { title: "Im Lauf",              desc: "Halte eine Serie von 3 Siegen." },
    streak_7:   { title: "Unaufhaltbar",         desc: "Halte eine Serie von 7 Siegen." },
    streak_14:  { title: "Goldene Vierzehntage", desc: "Halte eine Serie von 14 Siegen." },
    streak_30:  { title: "Perfekter Monat",      desc: "Halte eine Serie von 30 Siegen." },
    games_10:   { title: "Lehrling",             desc: "Spiele 10 Partien." },
    games_50:   { title: "Veteran",              desc: "Spiele 50 Partien." },
    games_100:  { title: "Hundertster",          desc: "Spiele 100 Partien." }
  },

  history: {
    title: "Verlauf",
    empty: "Noch keine Partien in deinem Verlauf.",
    won: "Gewonnen",
    lost: "Verloren",
    attempts: "{n}/6"
  },

  help: {
    title: "Spielanleitung",
    intro: "Errate die Technologie des Tages in 6 Versuchen. Jeder Versuch gibt dir Hinweise zur richtigen Technologie.",
    featuresTitle: "Verglichene Eigenschaften:",
    features: {
      year: "Jahr der Erstellung oder Veröffentlichung",
      type: "Sprache, Framework, Datenbank, Werkzeug",
      paradigm: "Objektorientiert, Funktional, Multiparadigma, usw.",
      typing: "Statisch, Dynamisch, Graduell oder Nicht zutreffend"
    },
    colorsTitle: "Farben:",
    colors: {
      green: "Exakte Übereinstimmung",
      yellow: "Teilweise Übereinstimmung (z. B. Multiparadigma) oder Jahr im Bereich ±5 Jahre",
      orange: "Jahr 6 bis 20 Jahre entfernt (↑ richtiges später / ↓ früher)",
      gray: "Keine Übereinstimmung oder Jahr mehr als 20 Jahre entfernt"
    },
    tip: "Tipp:",
    tipText: "Nutze die Suche, um verfügbare Technologien zu finden. Aktualisiert sich automatisch beim Tippen.",
    footer: "Jeden Tag um 00:00 ist eine neue Technologie verfügbar"
  },

  techTypes: {
    "Lenguaje": "Sprache",
    "Framework": "Framework",
    "Base de Datos": "Datenbank",
    "Herramienta": "Werkzeug"
  },

  paradigms: {
    "Multi-paradigma": "Multiparadigma",
    "Orientado a Objetos": "Objektorientiert",
    "Funcional": "Funktional",
    "Imperativo": "Imperativ",
    "Declarativo": "Deklarativ"
  },

  typings: {
    "Estático": "Statisch",
    "Dinámico": "Dynamisch",
    "Gradual": "Graduell",
    "No aplica": "Nicht zutreffend"
  }
};
