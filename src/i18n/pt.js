export default {
  header: {
    title: "Tech-dle",
    subtitle: "Adivinhe a tecnologia do dia"
  },

  game: {
    loading: "Carregando...",
    guessPlaceholder: "Digite o nome de uma tecnologia...",
    attemptsLeft: "Tentativas restantes",
    newTechAvailable: "Uma nova tecnologia estará disponível amanhã",
    filterAll: "Todos",
    filterAllAria: "Mostrar todos os tipos",
    filterByAria: "Filtrar por {type}",
    nextIn: "Nova tecnologia em {h}h {m}m",
    sharedBanner: "Você está jogando o puzzle de {date}",
    backToToday: "Voltar ao puzzle de hoje",
    revealHint: "Pedir dica",
    hintLabel: "Dica",
    hintTypeLabel: {
      type: "O tipo é",
      paradigm: "O paradigma é",
      typing: "A tipagem é"
    },
    noMoreHints: "Não há mais dicas para revelar"
  },

  grid: {
    name: "Nome",
    year: "Ano",
    type: "Tipo",
    paradigm: "Paradigma",
    typing: "Tipagem"
  },

  results: {
    congratulations: "Parabéns!",
    won: "Você adivinhou a tecnologia em {count} tentativa",
    wonPlural: "Você adivinhou a tecnologia em {count} tentativas",
    gameOver: "Fim de jogo",
    correctAnswer: "A tecnologia era:",
    shareResults: "Compartilhar resultados",
    resultsCopied: "Resultados copiados para a área de transferência",
    copyFailed: "Não foi possível copiar os resultados"
  },

  archive: {
    title: "Arquivo de puzzles",
    open: "Abrir arquivo",
    help: "Jogue puzzles de dias anteriores. Não contam para suas estatísticas diárias.",
    random: "Jogar um aleatório",
    empty: "Ainda não há puzzles anteriores disponíveis.",
    wonShort: "Vencido em {n}",
    lostShort: "Perdido",
    inProgressShort: "Em andamento"
  },

  settings: {
    title: "Configurações",
    open: "Abrir configurações",
    theme: "Tema",
    themeOptions: {
      system: "Sistema",
      dark: "Escuro",
      light: "Claro"
    },
    themeHelp: "Siga a preferência do sistema ou escolha um tema fixo.",
    colorBlind: "Modo daltônico",
    colorBlindHelp: "Adiciona símbolos às células para distinguir o resultado sem depender da cor.",
    hardMode: "Modo difícil",
    hardModeHelp: "Suas próximas tentativas devem respeitar as dicas anteriores (intervalos de ano e campos confirmados)."
  },

  toast: {
    duplicateGuess: "Você já tentou essa tecnologia",
    gameAlreadyOver: "A partida já terminou",
    hardMode: {
      minYear: "Modo difícil: o ano deve ser ≥ {value}",
      maxYear: "Modo difícil: o ano deve ser ≤ {value}",
      type: "Modo difícil: o tipo deve ser {value}",
      paradigm: "Modo difícil: o paradigma deve ser {value}",
      typing: "Modo difícil: a tipagem deve ser {value}"
    }
  },

  a11y: {
    skipToContent: "Pular para o conteúdo",
    gridLabel: "Tabuleiro de tentativas",
    emptyRow: "Tentativa {n} de {total}, vazia",
    match: {
      correct: "correspondência exata",
      partial: "correspondência parcial",
      higher: "o ano correto é maior",
      lower: "o ano correto é menor",
      incorrect: "não corresponde"
    },
    proximity: {
      near: "muito perto",
      remote: "muito longe"
    }
  },

  colorGuide: {
    title: "Guia de cores",
    correct: "Correspondência exata",
    partial: "Correspondência parcial",
    yearWrong: "Ano próximo ou distante (↑ maior / ↓ menor)",
    incorrect: "Não corresponde ou ano muito distante"
  },

  stats: {
    title: "Estatísticas",
    gamesPlayed: "Jogadas",
    winPercentage: "Vitórias",
    currentStreak: "Sequência",
    maxStreak: "Melhor sequência",
    guessDistribution: "Distribuição de tentativas",
    achievementsTitle: "Conquistas",
    achievementsCount: "{n} de {total}",
    viewHistory: "Ver histórico"
  },

  achievements: {
    unlockedToast: "Conquista desbloqueada!",
    first_win:  { title: "Primeira vitória",      desc: "Adivinhe a tecnologia pela primeira vez." },
    ace:        { title: "Ases na manga",         desc: "Adivinhe na primeira tentativa." },
    second_try: { title: "À segunda vai",         desc: "Adivinhe em duas tentativas." },
    streak_3:   { title: "Em sequência",          desc: "Mantenha uma sequência de 3 vitórias." },
    streak_7:   { title: "Imparável",             desc: "Mantenha uma sequência de 7 vitórias." },
    streak_14:  { title: "Quinzena de ouro",      desc: "Mantenha uma sequência de 14 vitórias." },
    streak_30:  { title: "Mês perfeito",          desc: "Mantenha uma sequência de 30 vitórias." },
    games_10:   { title: "Aprendiz",              desc: "Jogue 10 partidas." },
    games_50:   { title: "Veterano",              desc: "Jogue 50 partidas." },
    games_100:  { title: "Centenário",            desc: "Jogue 100 partidas." }
  },

  history: {
    title: "Histórico",
    empty: "Ainda não há partidas no seu histórico.",
    won: "Vencida",
    lost: "Perdida",
    attempts: "{n}/6"
  },

  help: {
    title: "Como jogar",
    intro: "Adivinhe a tecnologia do dia em 6 tentativas. Cada tentativa lhe dará dicas sobre a tecnologia correta.",
    featuresTitle: "Características comparadas:",
    features: {
      year: "Ano de criação ou lançamento",
      type: "Linguagem, Framework, Banco de Dados, Ferramenta",
      paradigm: "Orientado a Objetos, Funcional, Multi-paradigma, etc.",
      typing: "Estática, Dinâmica, Gradual ou Não se aplica"
    },
    colorsTitle: "Cores:",
    colors: {
      green: "Correspondência exata",
      yellow: "Correspondência parcial (ex: Multi-paradigma) ou ano a ±5 anos",
      orange: "Ano com diferença de 6 a 20 anos (↑ correto é maior / ↓ menor)",
      gray: "Não corresponde, ou ano com mais de 20 anos de diferença"
    },
    tip: "Dica:",
    tipText: "Use o campo de busca para encontrar tecnologias disponíveis. Atualiza automaticamente conforme você digita.",
    footer: "Uma nova tecnologia está disponível todos os dias às 00:00"
  },

  techTypes: {
    "Lenguaje": "Linguagem",
    "Framework": "Framework",
    "Base de Datos": "Banco de Dados",
    "Herramienta": "Ferramenta"
  },

  paradigms: {
    "Multi-paradigma": "Multi-paradigma",
    "Orientado a Objetos": "Orientado a Objetos",
    "Funcional": "Funcional",
    "Imperativo": "Imperativo",
    "Declarativo": "Declarativo"
  },

  typings: {
    "Estático": "Estática",
    "Dinámico": "Dinâmica",
    "Gradual": "Gradual",
    "No aplica": "Não se aplica"
  }
};
