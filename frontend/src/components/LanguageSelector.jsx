import React from 'react';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'pt-PT', name: 'Português (PT)', flag: 'PT' },
    { code: 'pt-BR', name: 'Português (BR)', flag: 'BR' },
    { code: 'en-US', name: 'English (US)', flag: 'US' }
  ];

  const FlagIcon = ({ code }) => {
    const flags = {
      'PT': (
        <svg className="w-6 h-6 rounded" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="600" fill="#060" />
          <rect width="360" height="600" fill="#f00" />
          <circle cx="360" cy="300" r="120" fill="#ff0" stroke="#00f" strokeWidth="30" />
        </svg>
      ),
      'BR': (
        <svg className="w-6 h-6 rounded" viewBox="0 0 720 504" xmlns="http://www.w3.org/2000/svg">
          <rect width="720" height="504" fill="#009b3a" />
          <path d="M360,25 L648,252 L360,479 L72,252 Z" fill="#fedf00" />
          <circle cx="360" cy="252" r="90" fill="#002776" />
          <path d="M210,252 a150,150 0 0,0 300,0" fill="#fff" />
        </svg>
      ),
      'US': (
        <svg className="w-6 h-6 rounded" viewBox="0 0 7410 3900" xmlns="http://www.w3.org/2000/svg">
          <rect width="7410" height="3900" fill="#b22234" />
          <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300" />
          <rect width="2964" height="2100" fill="#3c3b6e" />
        </svg>
      )
    };
    return flags[code] || null;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative group">
        <button
          className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          aria-label="Selecionar idioma"
        >
          <FlagIcon code={languages.find(l => l.code === currentLanguage)?.flag} />
          <svg 
            className="w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform group-hover:rotate-180 duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                currentLanguage === lang.code
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <FlagIcon code={lang.flag} />
              <span className="text-sm">{lang.name}</span>
              {currentLanguage === lang.code && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
