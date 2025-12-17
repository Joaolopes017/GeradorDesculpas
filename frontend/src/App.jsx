import { useState } from 'react'
import { ExcuseGenerator } from './components/ExcuseGenerator'
import LanguageSelector from './components/LanguageSelector'
import { useTranslation } from './lib/i18n'

function App() {
  const [language, setLanguage] = useState('pt-PT')
  const { t } = useTranslation(language)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Language Selector */}
      <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />

      <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="text-7xl mb-6 animate-bounce-slow">🎭</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl">
            {t('appTitle')}
          </h1>
          <p className="text-purple-200 text-base md:text-lg max-w-xl mx-auto">
            {t('appSubtitle')}
          </p>
        </div>

        {/* Main Content */}
        <ExcuseGenerator language={language} />

        {/* Footer */}
        <footer className="mt-12 text-center space-y-3 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-purple-100 text-sm mb-3">
              Powered by GPT-3.5 & LangChain
            </p>
            <p className="text-purple-200/80 text-xs mb-4">
              Baseado em princípios de Teoria da Atribuição e Psicologia Social
            </p>
            <div className="flex items-center justify-center gap-2 text-white">
              <span className="text-sm">{t('creditsText')}</span>
              <a 
                href="https://github.com/joaolopes017" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm border border-white/30 hover:scale-105 transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                @joaolopes017
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
