import Modal from './Modal';
import { useLanguage } from '../i18n/LanguageContext';

const HelpModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('help.title')}>
      <div className="space-y-4 text-gray-300">
        <p>
          {t('help.intro')}
        </p>

        <div>
          <h3 className="font-bold text-white mb-2">{t('help.featuresTitle')}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>{t('grid.year')}:</strong> {t('help.features.year')}</li>
            <li><strong>{t('grid.type')}:</strong> {t('help.features.type')}</li>
            <li><strong>{t('grid.paradigm')}:</strong> {t('help.features.paradigm')}</li>
            <li><strong>{t('grid.typing')}:</strong> {t('help.features.typing')}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-2">{t('help.colorsTitle')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
              <span>{t('help.colors.green')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-600 rounded"></div>
              <span>{t('help.colors.yellow')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded"></div>
              <span>{t('help.colors.orange')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-700 rounded"></div>
              <span>{t('help.colors.gray')}</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-900/20 rounded border border-blue-900">
          <p className="text-sm">
            <strong>{t('help.tip')}</strong> {t('help.tipText')}
          </p>
        </div>

        <div className="text-center text-sm text-gray-400 pt-2 border-t border-gray-700">
          {t('help.footer')}
        </div>
      </div>
    </Modal>
  );
};

export default HelpModal;
