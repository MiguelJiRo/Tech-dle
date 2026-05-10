import { useMemo } from 'react';
import Modal from './Modal';
import { useLanguage } from '../i18n/useLanguage';
import { listPastDateKeys } from '../data/technologies';
import { getSharedSummary } from '../utils/storage';

const ArchiveModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const entries = useMemo(() => {
    if (!isOpen) return [];
    return listPastDateKeys(new Date(), 60).map((dateKey) => ({
      dateKey,
      ...getSharedSummary(dateKey),
    }));
  }, [isOpen]);

  const playRandom = () => {
    if (entries.length === 0) return;
    const random = entries[Math.floor(Math.random() * entries.length)];
    window.location.assign(`/?d=${random.dateKey}`);
  };

  const renderStatus = (entry) => {
    if (!entry.played) return null;
    if (entry.gameWon) {
      return (
        <span className="ml-2 text-xs font-semibold text-green-700 dark:text-green-400">
          {t('archive.wonShort').replace('{n}', entry.attempts)}
        </span>
      );
    }
    if (entry.gameOver) {
      return (
        <span className="ml-2 text-xs font-semibold text-red-700 dark:text-red-400">
          {t('archive.lostShort')}
        </span>
      );
    }
    return (
      <span className="ml-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
        {t('archive.inProgressShort')}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('archive.title')}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('archive.help')}</p>

        <button
          type="button"
          onClick={playRandom}
          disabled={entries.length === 0}
          className="w-full px-3 py-2 rounded-md text-sm font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {t('archive.random')}
        </button>

        {entries.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">{t('archive.empty')}</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700">
            {entries.map((entry) => (
              <li key={entry.dateKey}>
                <a
                  href={`/?d=${entry.dateKey}`}
                  className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors focus-visible:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700"
                >
                  <span className="font-mono text-sm text-gray-900 dark:text-gray-100">{entry.dateKey}</span>
                  <span className="flex items-center">{renderStatus(entry)}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default ArchiveModal;
