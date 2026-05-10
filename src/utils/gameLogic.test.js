import { describe, it, expect } from 'vitest';
import {
  MATCH_TYPES,
  compareYear,
  compareField,
  compareTechnologies,
  hasWon,
  computeHardModeConstraints,
  validateHardModeGuess,
} from './gameLogic';

const js = { id: 1, name: 'JavaScript', year: 1995, type: 'Lenguaje', paradigm: 'Multi-paradigma', typing: 'Dinámico' };
const java = { id: 2, name: 'Java', year: 1995, type: 'Lenguaje', paradigm: 'Orientado a Objetos', typing: 'Estático' };
const python = { id: 3, name: 'Python', year: 1991, type: 'Lenguaje', paradigm: 'Multi-paradigma', typing: 'Dinámico' };
const haskell = { id: 4, name: 'Haskell', year: 1990, type: 'Lenguaje', paradigm: 'Funcional', typing: 'Estático' };

describe('compareYear', () => {
  it('returns CORRECT with direction same and distance 0 when years match', () => {
    expect(compareYear(2000, 2000)).toEqual({ match: MATCH_TYPES.CORRECT, direction: 'same', distance: 0 });
  });
  it('returns PARTIAL when within ±5 years (target later)', () => {
    expect(compareYear(2008, 2010)).toEqual({ match: MATCH_TYPES.PARTIAL, direction: 'higher', distance: 2 });
  });
  it('returns PARTIAL exactly at the near threshold (5 years)', () => {
    expect(compareYear(2005, 2010).match).toBe(MATCH_TYPES.PARTIAL);
    expect(compareYear(2015, 2010).match).toBe(MATCH_TYPES.PARTIAL);
  });
  it('returns HIGHER when target is later by more than 5 but ≤ 20 years', () => {
    expect(compareYear(1990, 2008)).toEqual({ match: MATCH_TYPES.HIGHER, direction: 'higher', distance: 18 });
  });
  it('returns LOWER when target is earlier by more than 5 but ≤ 20 years', () => {
    expect(compareYear(2010, 1995)).toEqual({ match: MATCH_TYPES.LOWER, direction: 'lower', distance: 15 });
  });
  it('returns INCORRECT (remote) when distance > 20', () => {
    expect(compareYear(1990, 2025)).toEqual({ match: MATCH_TYPES.INCORRECT, direction: 'higher', distance: 35 });
    expect(compareYear(2020, 1980)).toEqual({ match: MATCH_TYPES.INCORRECT, direction: 'lower', distance: 40 });
  });
});

describe('compareField', () => {
  it('returns CORRECT for exact match', () => {
    expect(compareField('Lenguaje', 'Lenguaje')).toBe(MATCH_TYPES.CORRECT);
  });
  it('returns INCORRECT for different non-multi values', () => {
    expect(compareField('Funcional', 'Orientado a Objetos')).toBe(MATCH_TYPES.INCORRECT);
  });
  it('returns PARTIAL when guess is Multi-paradigma', () => {
    expect(compareField('Multi-paradigma', 'Funcional')).toBe(MATCH_TYPES.PARTIAL);
  });
  it('returns PARTIAL when target is Multi-paradigma', () => {
    expect(compareField('Funcional', 'Multi-paradigma')).toBe(MATCH_TYPES.PARTIAL);
  });
  it('returns CORRECT for Multi vs Multi', () => {
    expect(compareField('Multi-paradigma', 'Multi-paradigma')).toBe(MATCH_TYPES.CORRECT);
  });
});

describe('compareTechnologies', () => {
  it('flags isTarget true only for same id', () => {
    expect(compareTechnologies(js, js).isTarget).toBe(true);
    expect(compareTechnologies(js, java).isTarget).toBe(false);
  });
  it('produces all field comparisons', () => {
    const r = compareTechnologies(java, js);
    expect(r.year.match).toBe(MATCH_TYPES.CORRECT);
    expect(r.type).toBe(MATCH_TYPES.CORRECT);
    expect(r.paradigm).toBe(MATCH_TYPES.PARTIAL);
    expect(r.typing).toBe(MATCH_TYPES.INCORRECT);
  });
});

describe('hasWon', () => {
  it('returns true only when comparison.isTarget is true', () => {
    expect(hasWon(compareTechnologies(js, js))).toBe(true);
    expect(hasWon(compareTechnologies(java, js))).toBe(false);
  });
  it('does not falsely declare win when all 4 attrs match but ids differ', () => {
    const twin = { ...python, id: 999, name: 'PythonTwin' };
    expect(hasWon(compareTechnologies(twin, python))).toBe(false);
  });
  it('returns false even when haskell vs java share year-adjacent attrs', () => {
    expect(hasWon(compareTechnologies(haskell, java))).toBe(false);
  });
});

describe('hard mode', () => {
  // Target: 2010, Lenguaje, Multi-paradigma, Estatico
  const target = { id: 100, name: 'Target', year: 2010, type: 'Lenguaje', paradigm: 'Multi-paradigma', typing: 'Estático' };

  describe('computeHardModeConstraints', () => {
    it('no guesses -> open bounds and no required fields', () => {
      const c = computeHardModeConstraints([]);
      expect(c.minYear).toBe(-Infinity);
      expect(c.maxYear).toBe(Infinity);
      expect(c.requiredType).toBeNull();
      expect(c.requiredParadigm).toBeNull();
      expect(c.requiredTyping).toBeNull();
    });

    it('higher direction sets minYear above the guess year', () => {
      const guess = { ...js, year: 1995 };
      const cmp = compareTechnologies(guess, target);
      const c = computeHardModeConstraints([cmp]);
      expect(c.minYear).toBe(1996);
      expect(c.maxYear).toBe(Infinity);
    });

    it('lower direction sets maxYear below the guess year', () => {
      const guess = { ...js, year: 2025 };
      const cmp = compareTechnologies(guess, target);
      const c = computeHardModeConstraints([cmp]);
      expect(c.maxYear).toBe(2024);
    });

    it('CORRECT field locks the requiredXxx', () => {
      const guess = { ...js, type: 'Lenguaje' };
      const cmp = compareTechnologies(guess, target);
      const c = computeHardModeConstraints([cmp]);
      expect(c.requiredType).toBe('Lenguaje');
    });

    it('combines multiple guesses (tightest bounds win)', () => {
      const cmps = [
        compareTechnologies({ ...js, year: 1990 }, target),
        compareTechnologies({ ...js, year: 2020 }, target),
      ];
      const c = computeHardModeConstraints(cmps);
      expect(c.minYear).toBe(1991);
      expect(c.maxYear).toBe(2019);
    });
  });

  describe('validateHardModeGuess', () => {
    it('passes when no constraints', () => {
      expect(validateHardModeGuess(js, computeHardModeConstraints([]))).toEqual({ valid: true });
    });

    it('rejects year below minYear', () => {
      const c = { minYear: 2000, maxYear: Infinity, requiredType: null, requiredParadigm: null, requiredTyping: null };
      const r = validateHardModeGuess({ ...js, year: 1999 }, c);
      expect(r.valid).toBe(false);
      expect(r.reason).toBe('minYear');
      expect(r.expected).toBe(2000);
    });

    it('rejects year above maxYear', () => {
      const c = { minYear: -Infinity, maxYear: 2010, requiredType: null, requiredParadigm: null, requiredTyping: null };
      expect(validateHardModeGuess({ ...js, year: 2015 }, c).reason).toBe('maxYear');
    });

    it('rejects mismatched required type', () => {
      const c = { minYear: -Infinity, maxYear: Infinity, requiredType: 'Lenguaje', requiredParadigm: null, requiredTyping: null };
      const r = validateHardModeGuess({ ...js, type: 'Framework' }, c);
      expect(r.valid).toBe(false);
      expect(r.reason).toBe('type');
      expect(r.expected).toBe('Lenguaje');
    });

    it('passes when all constraints satisfied', () => {
      const c = { minYear: 1990, maxYear: 2020, requiredType: 'Lenguaje', requiredParadigm: null, requiredTyping: null };
      expect(validateHardModeGuess({ ...js, year: 2000, type: 'Lenguaje' }, c)).toEqual({ valid: true });
    });
  });
});
