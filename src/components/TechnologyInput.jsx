import { useMemo, useState, useRef } from 'react';
import { useLanguage } from '../i18n/useLanguage';

const TechnologyInput = ({ technologies, onGuess, disabled }) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [lastInput, setLastInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => {
    if (input.trim() === '') return [];
    const needle = input.toLowerCase();
    return technologies.filter(tech => tech.name.toLowerCase().includes(needle)).slice(0, 5);
  }, [input, technologies]);

  if (input !== lastInput) {
    setLastInput(input);
    setSelectedIndex(-1);
    setIsOpen(true);
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
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
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

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('game.guessPlaceholder')}
        disabled={disabled}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {isOpen && suggestions.length > 0 && !disabled && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {suggestions.map((tech, index) => (
            <button
              key={tech.id}
              onClick={() => handleSubmit(tech)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                index === selectedIndex ? 'bg-gray-700' : ''
              }`}
            >
              <div className="font-semibold">{tech.name}</div>
              <div className="text-sm text-gray-400">
                {t(`techTypes.${tech.type}`)} • {tech.year}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnologyInput;
