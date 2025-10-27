import { createContext, useContext, useState, useEffect } from 'react';
import es from './es';
import en from './en';

const translations = {
  es,
  en
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Intentar cargar el idioma guardado
    const savedLanguage = localStorage.getItem('techdle-language');
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }

    // Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  });

  useEffect(() => {
    // Guardar preferencia de idioma
    localStorage.setItem('techdle-language', language);
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
