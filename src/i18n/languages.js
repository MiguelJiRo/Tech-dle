// Catálogo de idiomas soportados, ordenado para mostrar en el menú.
// nativeName se usa en el dropdown para que cada usuario lea su idioma en su propio idioma.

export const SUPPORTED_LANGUAGES = [
  { code: 'es', nativeName: 'Español' },
  { code: 'en', nativeName: 'English' },
  { code: 'pt', nativeName: 'Português' },
  { code: 'fr', nativeName: 'Français' },
  { code: 'de', nativeName: 'Deutsch' },
  { code: 'it', nativeName: 'Italiano' },
];

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);
