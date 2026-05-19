import Modal from './Modal';
import { useLanguage } from '../i18n/useLanguage';
import { useSettings } from '../settings/useSettings';

const logo = '/logo.png';

const Swatch = ({ className, symbol, textClassName = 'text-white' }) => (
  <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold ${textClassName} ${className}`}>
    {symbol}
  </div>
);

const HelpModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const cb = settings.colorBlind;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('help.title')}>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <div className="flex items-start gap-3 pb-2">
          <img
            src={logo}
            alt=""
            width="56"
            height="56"
            className="w-14 h-14 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] shrink-0"
          />
          <p className="m-0">{t('help.intro')}</p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('help.featuresTitle')}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>{t('grid.year')}:</strong> {t('help.features.year')}</li>
            <li><strong>{t('grid.type')}:</strong> {t('help.features.type')}</li>
            <li><strong>{t('grid.paradigm')}:</strong> {t('help.features.paradigm')}</li>
            <li><strong>{t('grid.typing')}:</strong> {t('help.features.typing')}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('help.colorsTitle')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Swatch className="bg-green-600" symbol={cb ? '✓' : null} />
              <span>{t('help.colors.green')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Swatch className="bg-yellow-500 dark:bg-yellow-600" symbol={cb ? '~' : null} />
              <span>{t('help.colors.yellow')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Swatch className="bg-orange-500 dark:bg-orange-600" symbol={cb ? '↑↓' : null} />
              <span>{t('help.colors.orange')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Swatch className="bg-gray-300 dark:bg-gray-700" textClassName="text-gray-800 dark:text-white" symbol={cb ? '✕' : null} />
              <span>{t('help.colors.gray')}</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-sm border border-blue-200 dark:border-blue-900">
          <p className="text-sm">
            <strong>{t('help.tip')}</strong> {t('help.tipText')}
          </p>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          {t('help.footer')}
        </div>
      </div>
    </Modal>
  );
};

export default HelpModal;
