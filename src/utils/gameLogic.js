export const MATCH_TYPES = {
  CORRECT: 'correct',
  PARTIAL: 'partial',
  INCORRECT: 'incorrect',
  HIGHER: 'higher',
  LOWER: 'lower',
};

const MULTI = 'Multi-paradigma';

export const YEAR_NEAR_THRESHOLD = 5;
export const YEAR_FAR_THRESHOLD = 20;

export const compareYear = (guessYear, targetYear) => {
  const distance = Math.abs(guessYear - targetYear);
  if (distance === 0) {
    return { match: MATCH_TYPES.CORRECT, direction: 'same', distance: 0 };
  }
  const direction = guessYear < targetYear ? 'higher' : 'lower';
  if (distance <= YEAR_NEAR_THRESHOLD) {
    return { match: MATCH_TYPES.PARTIAL, direction, distance };
  }
  if (distance <= YEAR_FAR_THRESHOLD) {
    return {
      match: direction === 'higher' ? MATCH_TYPES.HIGHER : MATCH_TYPES.LOWER,
      direction,
      distance,
    };
  }
  return { match: MATCH_TYPES.INCORRECT, direction, distance };
};

export const compareField = (guessValue, targetValue) => {
  if (guessValue === targetValue) {
    return MATCH_TYPES.CORRECT;
  }
  if (guessValue === MULTI || targetValue === MULTI) {
    return MATCH_TYPES.PARTIAL;
  }
  return MATCH_TYPES.INCORRECT;
};

export const compareTechnologies = (guess, target) => {
  return {
    technology: guess,
    isTarget: guess.id === target.id,
    year: compareYear(guess.year, target.year),
    type: compareField(guess.type, target.type),
    paradigm: compareField(guess.paradigm, target.paradigm),
    typing: compareField(guess.typing, target.typing),
  };
};

export const hasWon = (comparison) => comparison.isTarget === true;

export const computeHardModeConstraints = (guesses) => {
  let minYear = -Infinity;
  let maxYear = Infinity;
  let requiredType = null;
  let requiredParadigm = null;
  let requiredTyping = null;

  for (const guess of guesses) {
    const techYear = guess.technology.year;
    if (guess.year.match === MATCH_TYPES.CORRECT) {
      minYear = Math.max(minYear, techYear);
      maxYear = Math.min(maxYear, techYear);
    } else if (guess.year.direction === 'higher') {
      minYear = Math.max(minYear, techYear + 1);
    } else if (guess.year.direction === 'lower') {
      maxYear = Math.min(maxYear, techYear - 1);
    }

    if (guess.type === MATCH_TYPES.CORRECT) requiredType = guess.technology.type;
    if (guess.paradigm === MATCH_TYPES.CORRECT) requiredParadigm = guess.technology.paradigm;
    if (guess.typing === MATCH_TYPES.CORRECT) requiredTyping = guess.technology.typing;
  }

  return { minYear, maxYear, requiredType, requiredParadigm, requiredTyping };
};

export const validateHardModeGuess = (technology, constraints) => {
  if (technology.year < constraints.minYear) {
    return { valid: false, reason: 'minYear', expected: constraints.minYear };
  }
  if (technology.year > constraints.maxYear) {
    return { valid: false, reason: 'maxYear', expected: constraints.maxYear };
  }
  if (constraints.requiredType && technology.type !== constraints.requiredType) {
    return { valid: false, reason: 'type', expected: constraints.requiredType };
  }
  if (constraints.requiredParadigm && technology.paradigm !== constraints.requiredParadigm) {
    return { valid: false, reason: 'paradigm', expected: constraints.requiredParadigm };
  }
  if (constraints.requiredTyping && technology.typing !== constraints.requiredTyping) {
    return { valid: false, reason: 'typing', expected: constraints.requiredTyping };
  }
  return { valid: true };
};

export const matchSymbol = (match) => {
  switch (match) {
    case MATCH_TYPES.CORRECT: return '✓';
    case MATCH_TYPES.PARTIAL: return '~';
    case MATCH_TYPES.HIGHER:  return '↑';
    case MATCH_TYPES.LOWER:   return '↓';
    default:                  return '✕';
  }
};
