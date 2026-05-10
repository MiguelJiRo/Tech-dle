import { useMemo } from 'react';
import Modal from './Modal';
import { useLanguage } from '../i18n/useLanguage';
import { loadHistory } from '../utils/storage';

const HistoryModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const entries = useMemo(() => (isOpen ? loadHistory() : []), [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('history.title')}>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">{t('history.empty')}</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
          {entries.map((entry) => (
            <li
              key={entry.date}
              className="flex items-center justify-between gap-3 px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={`/?d=${entry.date}`}
                  className="block font-mono text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:underline"
                >
                  {entry.date}
                </a>
                <span className="block text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {entry.targetName}
                </span>
              </div>
              <span
                className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  entry.won
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}
              >
                {entry.won ? t('history.won') : t('history.lost')}
                {' · '}
                {t('history.attempts').replace('{n}', entry.attempts)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default HistoryModal;
