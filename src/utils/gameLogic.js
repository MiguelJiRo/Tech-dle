export const MATCH_TYPES = {
  CORRECT: 'correct',
  PARTIAL: 'partial',
  INCORRECT: 'incorrect',
  HIGHER: 'higher',
  LOWER: 'lower',
};

const MULTI = 'Multi-paradigma';

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
