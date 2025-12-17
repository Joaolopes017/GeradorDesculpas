/**
 * Componente de resultado - Exibe a desculpa gerada
 */
import { useClipboard } from '../hooks/useClipboard';
import { shareText, shareToWhatsApp, formatWordCount } from '../lib/utils';
import { useTranslation } from '../lib/i18n';

export function ResultCard({ excuse, onReset, language = 'pt-PT' }) {
  const { isCopied, copyToClipboard } = useClipboard();
  const { t } = useTranslation(language);

  const handleShare = async () => {
    await shareText(excuse.content);
  };

  const handleWhatsApp = () => {
    shareToWhatsApp(excuse.content);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20 animate-fade-in">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {t('resultTitle')}
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg font-medium">
          {excuse.word_count} {t('wordCount')}
        </span>
      </div>

      {/* Texto da desculpa */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-200 shadow-inner">
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap font-medium">
          {excuse.content}
        </p>
      </div>

      {/* Badge do tom */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-600">Tom aplicado:</span>
        <span className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-bold border border-purple-200">
          {excuse.tone_used}
        </span>
      </div>

      {/* Botões de ação */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => copyToClipboard(excuse.content)}
          className={`
            px-5 py-4 rounded-xl font-bold transition-all duration-300
            flex items-center justify-center gap-2 transform hover:scale-105
            ${isCopied 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isCopied ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('copied')}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {t('copyButton')}
            </>
          )}
        </button>

        <button
          onClick={handleWhatsApp}
          className="px-5 py-4 rounded-xl font-bold transition-all duration-300 
                     bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700
                     flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      {/* Botão de gerar nova */}
      <button
        onClick={onReset}
        className="w-full px-5 py-4 rounded-xl font-bold transition-all duration-300
                   border-2 border-gray-300 text-gray-700 hover:bg-gray-100
                   flex items-center justify-center gap-2 transform hover:scale-[1.02]"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {language === 'en-US' ? 'Generate New Excuse' : 'Gerar Nova Desculpa'}
      </button>
    </div>
  );
}
