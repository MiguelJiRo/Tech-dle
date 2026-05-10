import { useState, useEffect } from 'react';
import es from './es';
import en from './en';
import pt from './pt';
import fr from './fr';
import de from './de';
import it from './it';
import { LanguageContext } from './context';

const translations = {
  es,
  en,
  pt,
  fr,
  de,
  it,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('techdle-language');
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('techdle-language', language);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
