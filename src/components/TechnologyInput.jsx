import { useMemo, useState, useRef } from 'react';
import { useLanguage } from '../i18n/useLanguage';
import TechIcon from './TechIcon';

const TYPE_FILTERS = ['Lenguaje', 'Framework', 'Base de Datos', 'Herramienta'];

const HighlightedName = ({ name, query }) => {
  if (!query) return <>{name}</>;
  const lowerName = name.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerName.indexOf(lowerQuery);
  if (idx === -1) return <>{name}</>;
  return (
    <>
      {name.slice(0, idx)}
      <mark className="bg-yellow-200 dark:bg-yellow-500/40 text-inherit rounded px-0.5">
        {name.slice(idx, idx + query.length)}
      </mark>
      {name.slice(idx + query.length)}
    </>
  );
};

const TechnologyInput = ({ technologies, onGuess, disabled }) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [lastInput, setLastInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [typeFilter, setTypeFilter] = useState(null); // null = todos
  const [lastFilter, setLastFilter] = useState(null);
  const inputRef = useRef(null);

  const trimmedInput = input.trim();

  const suggestions = useMemo(() => {
    if (trimmedInput === '') return [];
    const needle = trimmedInput.toLowerCase();
    return technologies
      .filter((tech) => tech.name.toLowerCase().includes(needle))
      .filter((tech) => !typeFilter || tech.type === typeFilter)
      .slice(0, 8);
  }, [trimmedInput, technologies, typeFilter]);

  if (input !== lastInput) {
    setLastInput(input);
    setSelectedIndex(-1);
    setIsOpen(true);
  }
  if (typeFilter !== lastFilter) {
    setLastFilter(typeFilter);
    setSelectedIndex(-1);
  }

  const handleSubmit = (technology) => {
    if (technology && !disabled) {
      onGuess(technology);
      setInput('');
      setSelectedIndex(-1);
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSubmit(suggestions[selectedIndex]);
      } else if (suggestions.length === 1) {
        handleSubmit(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const pillBase =
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';
  const pillActive =
    'bg-blue-600 border-blue-600 text-white hover:bg-blue-700';
  const pillIdle =
    'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60';

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="flex flex-wrap gap-1.5 mb-2 justify-center" role="group" aria-label={t('game.filterAllAria')}>
        <button
          type="button"
          aria-pressed={typeFilter === null}
          onClick={() => setTypeFilter(null)}
          className={`${pillBase} ${typeFilter === null ? pillActive : pillIdle}`}
        >
          {t('game.filterAll')}
        </button>
        {TYPE_FILTERS.map((type) => {
          const active = typeFilter === type;
          const label = t(`techTypes.${type}`);
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              aria-label={t('game.filterByAria').replace('{type}', label)}
              onClick={() => setTypeFilter(active ? null : type)}
              className={`${pillBase} ${active ? pillActive : pillIdle}`}
            >
              <TechIcon type={type} className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('game.guessPlaceholder')}
        disabled={disabled}
        className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        autoComplete="off"
        spellCheck="false"
      />

      {isOpen && suggestions.length > 0 && !disabled && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-72 overflow-y-auto">
          {suggestions.map((tech, index) => (
            <button
              key={tech.id}
              onClick={() => handleSubmit(tech)}
              className={`w-full px-3 py-2.5 text-left transition-colors flex items-center gap-3 ${
                index === selectedIndex
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="shrink-0 w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                <TechIcon type={tech.type} className="w-4 h-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-gray-900 dark:text-white truncate">
                  <HighlightedName name={tech.name} query={trimmedInput} />
                </span>
                <span className="block text-xs text-gray-600 dark:text-gray-400">
                  {t(`techTypes.${tech.type}`)} • {tech.year}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnologyInput;
