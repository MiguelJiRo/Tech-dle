import { describe, it, expect } from 'vitest';
import esLocale from './es';
import enLocale from './en';
import ptLocale from './pt';
import frLocale from './fr';
import deLocale from './de';
import itLocale from './it';
import { SUPPORTED_LANGUAGES, SUPPORTED_LANGUAGE_CODES } from './languages';

const locales = {
  es: esLocale,
  en: enLocale,
  pt: ptLocale,
  fr: frLocale,
  de: deLocale,
  it: itLocale,
};

const flatKeys = (obj, prefix = '') => {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object') {
      out.push(...flatKeys(v, path));
    } else {
      out.push(path);
    }
  }
  return out;
};

describe('i18n locales', () => {
  const expectedKeys = flatKeys(esLocale).sort();

  it('every supported language has a registered translations object', () => {
    SUPPORTED_LANGUAGE_CODES.forEach((code) => {
      expect(locales[code]).toBeDefined();
    });
  });

  it.each(Object.entries(locales))('%s has the same key shape as es', (_code, dict) => {
    const got = flatKeys(dict).sort();
    expect(got).toEqual(expectedKeys);
  });

  it.each(Object.entries(locales))('%s has no empty leaf strings', (_code, dict) => {
    flatKeys(dict).forEach((path) => {
      const value = path.split('.').reduce((acc, key) => acc?.[key], dict);
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it('SUPPORTED_LANGUAGES entries have non-empty native names', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      expect(lang.code).toMatch(/^[a-z]{2}$/);
      expect(lang.nativeName.length).toBeGreaterThan(0);
    });
  });
});
