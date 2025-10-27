export const MATCH_TYPES = {
  CORRECT: 'correct',
  PARTIAL: 'partial',
  INCORRECT: 'incorrect',
  HIGHER: 'higher',
  LOWER: 'lower',
};

export const compareYear = (guessYear, targetYear) => {
  if (guessYear === targetYear) {
    return { match: MATCH_TYPES.CORRECT };
  } else if (guessYear < targetYear) {
    return { match: MATCH_TYPES.HIGHER };
  } else {
    return { match: MATCH_TYPES.LOWER };
  }
};

export const compareField = (guessValue, targetValue) => {
  if (guessValue === targetValue) {
    return MATCH_TYPES.CORRECT;
  }
  // Para paradigmas que pueden tener múltiples valores
  if (guessValue.includes('Multi-paradigma') || targetValue.includes('Multi-paradigma')) {
    return MATCH_TYPES.PARTIAL;
  }
  return MATCH_TYPES.INCORRECT;
};

export const compareTechnologies = (guess, target) => {
  return {
    technology: guess,
    year: compareYear(guess.year, target.year),
    type: compareField(guess.type, target.type),
    paradigm: compareField(guess.paradigm, target.paradigm),
    typing: compareField(guess.typing, target.typing),
  };
};

export const hasWon = (comparison) => {
  return (
    comparison.year.match === MATCH_TYPES.CORRECT &&
    comparison.type === MATCH_TYPES.CORRECT &&
    comparison.paradigm === MATCH_TYPES.CORRECT &&
    comparison.typing === MATCH_TYPES.CORRECT
  );
};
