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

export const matchSymbol = (match) => {
  switch (match) {
    case MATCH_TYPES.CORRECT: return '✓';
    case MATCH_TYPES.PARTIAL: return '~';
    case MATCH_TYPES.HIGHER:  return '↑';
    case MATCH_TYPES.LOWER:   return '↓';
    default:                  return '✕';
  }
};
