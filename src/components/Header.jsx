import { useLanguage } from '../i18n/useLanguage';

const logo = '/logo.png';

const Header = ({ onOpenStats, onOpenHelp }) => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="border-b border-gray-800/80 bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-30 mb-8">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-2">
        <div className="flex gap-2">
          <button
            onClick={onOpenHelp}
            className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-800/60"
            title="Help"
            aria-label="Help"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <a href="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="Tech-dle - inicio">
          <img
            src={logo}
            alt=""
            width="40"
            height="40"
            className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110 group-hover:rotate-[-6deg]"
            fetchpriority="high"
            decoding="async"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
              Tech-dle
            </span>
          </h1>
        </a>

        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={toggleLanguage}
            className="text-gray-400 hover:text-white transition-colors font-semibold text-sm px-2 py-2 rounded-lg hover:bg-gray-800/60"
            title="Change language"
            aria-label="Change language"
          >
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="uppercase">{language}</span>
            </div>
          </button>

          <button
            onClick={onOpenStats}
            className="text-gray-400 hover:text-white transition-colors p-2 -mr-2 rounded-lg hover:bg-gray-800/60"
            title="Statistics"
            aria-label="Statistics"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
