export default {
  header: {
    title: "Tech-dle",
    subtitle: "Indovina la tecnologia del giorno"
  },

  game: {
    loading: "Caricamento...",
    guessPlaceholder: "Scrivi il nome di una tecnologia...",
    attemptsLeft: "Tentativi rimasti",
    newTechAvailable: "Una nuova tecnologia sarà disponibile domani",
    filterAll: "Tutti",
    filterAllAria: "Mostra tutti i tipi",
    filterByAria: "Filtra per {type}",
    nextIn: "Nuova tecnologia tra {h}h {m}m",
    sharedBanner: "Stai giocando il puzzle del {date}",
    backToToday: "Torna al puzzle di oggi",
    revealHint: "Chiedi un suggerimento",
    hintLabel: "Suggerimento",
    hintTypeLabel: {
      type: "Il tipo è",
      paradigm: "Il paradigma è",
      typing: "La tipizzazione è"
    },
    noMoreHints: "Nessun altro suggerimento disponibile"
  },

  grid: {
    name: "Nome",
    year: "Anno",
    type: "Tipo",
    paradigm: "Paradigma",
    typing: "Tipizzazione"
  },

  results: {
    congratulations: "Congratulazioni!",
    won: "Hai indovinato la tecnologia in {count} tentativo",
    wonPlural: "Hai indovinato la tecnologia in {count} tentativi",
    gameOver: "Partita finita",
    correctAnswer: "La tecnologia era:",
    shareResults: "Condividi i risultati",
    resultsCopied: "Risultati copiati negli appunti",
    copyFailed: "Impossibile copiare i risultati"
  },

  archive: {
    title: "Archivio puzzle",
    open: "Apri archivio",
    help: "Gioca i puzzle dei giorni precedenti. Non contano per le tue statistiche giornaliere.",
    random: "Gioca uno a caso",
    empty: "Nessun puzzle precedente disponibile.",
    wonShort: "Vinto in {n}",
    lostShort: "Perso",
    inProgressShort: "In corso"
  },

  settings: {
    title: "Impostazioni",
    open: "Apri impostazioni",
    theme: "Tema",
    themeOptions: {
      system: "Sistema",
      dark: "Scuro",
      light: "Chiaro"
    },
    themeHelp: "Segui la preferenza del sistema o scegli un tema fisso.",
    colorBlind: "Modalità daltonica",
    colorBlindHelp: "Aggiunge simboli alle celle per distinguere il risultato senza dipendere dal colore.",
    hardMode: "Modalità difficile",
    hardModeHelp: "I prossimi tentativi devono rispettare i suggerimenti precedenti (intervalli di anno e campi confermati)."
  },

  toast: {
    duplicateGuess: "Hai già provato questa tecnologia",
    gameAlreadyOver: "La partita è già finita",
    hardMode: {
      minYear: "Modalità difficile: l'anno deve essere ≥ {value}",
      maxYear: "Modalità difficile: l'anno deve essere ≤ {value}",
      type: "Modalità difficile: il tipo deve essere {value}",
      paradigm: "Modalità difficile: il paradigma deve essere {value}",
      typing: "Modalità difficile: la tipizzazione deve essere {value}"
    }
  },

  a11y: {
    skipToContent: "Vai al contenuto",
    gridLabel: "Griglia dei tentativi",
    emptyRow: "Tentativo {n} di {total}, vuoto",
    match: {
      correct: "corrispondenza esatta",
      partial: "corrispondenza parziale",
      higher: "l'anno corretto è più recente",
      lower: "l'anno corretto è precedente",
      incorrect: "non corrisponde"
    },
    proximity: {
      near: "molto vicino",
      remote: "molto lontano"
    }
  },

  colorGuide: {
    title: "Guida ai colori",
    correct: "Corrispondenza esatta",
    partial: "Corrispondenza parziale",
    yearWrong: "Anno vicino o lontano (↑ più recente / ↓ precedente)",
    incorrect: "Non corrisponde o anno molto lontano"
  },

  stats: {
    title: "Statistiche",
    gamesPlayed: "Giocate",
    winPercentage: "Vittorie",
    currentStreak: "Serie",
    maxStreak: "Miglior serie",
    guessDistribution: "Distribuzione tentativi",
    achievementsTitle: "Obiettivi",
    achievementsCount: "{n} di {total}",
    viewHistory: "Vedi cronologia"
  },

  achievements: {
    unlockedToast: "Obiettivo sbloccato!",
    first_win:  { title: "Prima vittoria",      desc: "Indovina la tecnologia per la prima volta." },
    ace:        { title: "Asso",                desc: "Indovina al primo tentativo." },
    second_try: { title: "Al secondo tentativo", desc: "Indovina in due tentativi." },
    streak_3:   { title: "In serie",             desc: "Mantieni una serie di 3 vittorie." },
    streak_7:   { title: "Inarrestabile",        desc: "Mantieni una serie di 7 vittorie." },
    streak_14:  { title: "Quindici d'oro",       desc: "Mantieni una serie di 14 vittorie." },
    streak_30:  { title: "Mese perfetto",        desc: "Mantieni una serie di 30 vittorie." },
    games_10:   { title: "Apprendista",          desc: "Gioca 10 partite." },
    games_50:   { title: "Veterano",             desc: "Gioca 50 partite." },
    games_100:  { title: "Centenario",           desc: "Gioca 100 partite." }
  },

  history: {
    title: "Cronologia",
    empty: "Nessuna partita nella tua cronologia.",
    won: "Vinta",
    lost: "Persa",
    attempts: "{n}/6"
  },

  help: {
    title: "Come giocare",
    intro: "Indovina la tecnologia del giorno in 6 tentativi. Ogni tentativo ti darà indizi sulla tecnologia corretta.",
    featuresTitle: "Caratteristiche confrontate:",
    features: {
      year: "Anno di creazione o rilascio",
      type: "Linguaggio, Framework, Database, Strumento",
      paradigm: "Orientato agli oggetti, Funzionale, Multi-paradigma, ecc.",
      typing: "Statica, Dinamica, Graduale o Non applicabile"
    },
    colorsTitle: "Colori:",
    colors: {
      green: "Corrispondenza esatta",
      yellow: "Corrispondenza parziale (es. Multi-paradigma) o anno entro ±5 anni",
      orange: "Anno con scarto di 6-20 anni (↑ corretto più recente / ↓ precedente)",
      gray: "Non corrisponde, o anno con più di 20 anni di scarto"
    },
    tip: "Suggerimento:",
    tipText: "Usa la barra di ricerca per trovare le tecnologie disponibili. Si aggiorna automaticamente mentre digiti.",
    footer: "Una nuova tecnologia è disponibile ogni giorno alle 00:00"
  },

  techTypes: {
    "Lenguaje": "Linguaggio",
    "Framework": "Framework",
    "Base de Datos": "Database",
    "Herramienta": "Strumento"
  },

  paradigms: {
    "Multi-paradigma": "Multi-paradigma",
    "Orientado a Objetos": "Orientato agli oggetti",
    "Funcional": "Funzionale",
    "Imperativo": "Imperativo",
    "Declarativo": "Dichiarativo"
  },

  typings: {
    "Estático": "Statica",
    "Dinámico": "Dinamica",
    "Gradual": "Graduale",
    "No aplica": "Non applicabile"
  }
};
