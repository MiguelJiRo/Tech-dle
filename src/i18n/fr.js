export default {
  header: {
    title: "Tech-dle",
    subtitle: "Devinez la technologie du jour"
  },

  game: {
    loading: "Chargement...",
    guessPlaceholder: "Tapez le nom d'une technologie...",
    attemptsLeft: "Essais restants",
    newTechAvailable: "Une nouvelle technologie sera disponible demain",
    filterAll: "Tous",
    filterAllAria: "Afficher tous les types",
    filterByAria: "Filtrer par {type}",
    nextIn: "Nouvelle techno dans {h}h {m}m",
    sharedBanner: "Vous jouez le puzzle du {date}",
    backToToday: "Revenir au puzzle du jour",
    revealHint: "Demander un indice",
    hintLabel: "Indice",
    hintTypeLabel: {
      type: "Le type est",
      paradigm: "Le paradigme est",
      typing: "Le typage est"
    },
    noMoreHints: "Plus d'indices à révéler"
  },

  grid: {
    name: "Nom",
    year: "Année",
    type: "Type",
    paradigm: "Paradigme",
    typing: "Typage"
  },

  results: {
    congratulations: "Félicitations !",
    won: "Vous avez deviné la technologie en {count} essai",
    wonPlural: "Vous avez deviné la technologie en {count} essais",
    gameOver: "Partie terminée",
    correctAnswer: "La technologie était :",
    shareResults: "Partager les résultats",
    resultsCopied: "Résultats copiés dans le presse-papiers",
    copyFailed: "Impossible de copier les résultats"
  },

  archive: {
    title: "Archive des puzzles",
    open: "Ouvrir l'archive",
    help: "Jouez aux puzzles des jours précédents. Ils ne comptent pas dans vos statistiques quotidiennes.",
    random: "En jouer un au hasard",
    empty: "Aucun puzzle précédent disponible pour le moment.",
    wonShort: "Gagné en {n}",
    lostShort: "Perdu",
    inProgressShort: "En cours"
  },

  settings: {
    title: "Paramètres",
    open: "Ouvrir les paramètres",
    theme: "Thème",
    themeOptions: {
      system: "Système",
      dark: "Sombre",
      light: "Clair"
    },
    themeHelp: "Suivez la préférence du système ou choisissez un thème fixe.",
    colorBlind: "Mode daltonien",
    colorBlindHelp: "Ajoute des symboles aux cellules pour distinguer le résultat sans dépendre de la couleur.",
    hardMode: "Mode difficile",
    hardModeHelp: "Vos prochains essais doivent respecter les indices précédents (plages d'années et champs confirmés)."
  },

  toast: {
    duplicateGuess: "Vous avez déjà essayé cette technologie",
    gameAlreadyOver: "La partie est déjà terminée",
    hardMode: {
      minYear: "Mode difficile : l'année doit être ≥ {value}",
      maxYear: "Mode difficile : l'année doit être ≤ {value}",
      type: "Mode difficile : le type doit être {value}",
      paradigm: "Mode difficile : le paradigme doit être {value}",
      typing: "Mode difficile : le typage doit être {value}"
    }
  },

  a11y: {
    skipToContent: "Aller au contenu",
    gridLabel: "Grille de tentatives",
    emptyRow: "Tentative {n} sur {total}, vide",
    match: {
      correct: "correspondance exacte",
      partial: "correspondance partielle",
      higher: "l'année correcte est plus tardive",
      lower: "l'année correcte est plus ancienne",
      incorrect: "ne correspond pas"
    },
    proximity: {
      near: "très proche",
      remote: "très éloigné"
    }
  },

  colorGuide: {
    title: "Guide des couleurs",
    correct: "Correspondance exacte",
    partial: "Correspondance partielle",
    yearWrong: "Année proche ou éloignée (↑ plus tardive / ↓ plus ancienne)",
    incorrect: "Pas de correspondance ou année très éloignée"
  },

  stats: {
    title: "Statistiques",
    gamesPlayed: "Jouées",
    winPercentage: "Victoires",
    currentStreak: "Série",
    maxStreak: "Meilleure série",
    guessDistribution: "Répartition des essais",
    achievementsTitle: "Succès",
    achievementsCount: "{n} sur {total}",
    viewHistory: "Voir l'historique"
  },

  achievements: {
    unlockedToast: "Succès débloqué !",
    first_win:  { title: "Première victoire",     desc: "Devinez la technologie pour la première fois." },
    ace:        { title: "As",                    desc: "Devinez du premier coup." },
    second_try: { title: "À la deuxième",         desc: "Devinez en deux essais." },
    streak_3:   { title: "Sur la lancée",         desc: "Maintenez une série de 3 victoires." },
    streak_7:   { title: "Inarrêtable",           desc: "Maintenez une série de 7 victoires." },
    streak_14:  { title: "Quinzaine d'or",        desc: "Maintenez une série de 14 victoires." },
    streak_30:  { title: "Mois parfait",          desc: "Maintenez une série de 30 victoires." },
    games_10:   { title: "Apprenti",              desc: "Jouez 10 parties." },
    games_50:   { title: "Vétéran",               desc: "Jouez 50 parties." },
    games_100:  { title: "Centenaire",            desc: "Jouez 100 parties." }
  },

  history: {
    title: "Historique",
    empty: "Aucune partie dans votre historique pour le moment.",
    won: "Gagnée",
    lost: "Perdue",
    attempts: "{n}/6"
  },

  help: {
    title: "Comment jouer",
    intro: "Devinez la technologie du jour en 6 essais. Chaque tentative vous donnera des indices sur la bonne réponse.",
    featuresTitle: "Caractéristiques comparées :",
    features: {
      year: "Année de création ou de sortie",
      type: "Langage, Framework, Base de données, Outil",
      paradigm: "Orienté objet, Fonctionnel, Multi-paradigme, etc.",
      typing: "Statique, Dynamique, Graduel ou Non applicable"
    },
    colorsTitle: "Couleurs :",
    colors: {
      green: "Correspondance exacte",
      yellow: "Correspondance partielle (ex : Multi-paradigme) ou année à ±5 ans",
      orange: "Année écartée de 6 à 20 ans (↑ correcte plus tardive / ↓ plus ancienne)",
      gray: "Pas de correspondance, ou année à plus de 20 ans"
    },
    tip: "Astuce :",
    tipText: "Utilisez la barre de recherche pour trouver les technologies disponibles. Mise à jour automatique pendant la saisie.",
    footer: "Une nouvelle technologie est disponible chaque jour à 00:00"
  },

  techTypes: {
    "Lenguaje": "Langage",
    "Framework": "Framework",
    "Base de Datos": "Base de données",
    "Herramienta": "Outil"
  },

  paradigms: {
    "Multi-paradigma": "Multi-paradigme",
    "Orientado a Objetos": "Orienté objet",
    "Funcional": "Fonctionnel",
    "Imperativo": "Impératif",
    "Declarativo": "Déclaratif"
  },

  typings: {
    "Estático": "Statique",
    "Dinámico": "Dynamique",
    "Gradual": "Graduel",
    "No aplica": "Non applicable"
  }
};
