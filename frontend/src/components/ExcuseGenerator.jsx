/**
 * Componente principal - Formulário de geração
 */
import { useState } from 'react';
import { ToneButton } from './ToneButton';
import { ResultCard } from './ResultCard';
import { apiClient } from '../lib/api';
import { useTranslation } from '../lib/i18n';

const TONES = [
  { value: 'Profissional', label: 'Profissional', emoji: '💼' },
  { value: 'Casual', label: 'Casual', emoji: '😎' },
  { value: 'Afetivo', label: 'Afetivo', emoji: '❤️' },
  { value: 'Dramático', label: 'Dramático', emoji: '😰' },
  { value: 'Jovem', label: 'Jovem', emoji: '🔥' },
  { value: 'Ridículo', label: 'Ridículo', emoji: '🤪' },
];

const COMMON_ROLES = [
  'Chefe', 'Colega de Trabalho', 'Professor(a)', 
  'Namorado(a)', 'Amigo(a)', 'Familiar'
];

export function ExcuseGenerator({ language = 'pt-PT' }) {
  const { t } = useTranslation(language);
  
  const [formData, setFormData] = useState({
    receiver_role: '',
    event_context: '',
    severity_level: 5,
    tone_style: 'Profissional',
    user_hint: '',
    additional_context: '',
    language: language,
    use_emojis: true,
    allow_mature_content: false,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update language when prop changes
  useState(() => {
    setFormData(prev => ({ ...prev, language }));
  }, [language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.generateExcuse({ ...formData, language, use_emojis: formData.use_emojis });
      setResult(response);
    } catch (err) {
      setError(err.message || t('errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  if (result) {
    return <ResultCard excuse={result} onReset={handleReset} language={language} />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20 animate-fade-in">
      {/* Destinatário */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">
          {t('receiverLabel')}
        </label>
        <input
          type="text"
          list="roles"
          value={formData.receiver_role}
          onChange={(e) => setFormData({ ...formData, receiver_role: e.target.value })}
          placeholder={t('receiverPlaceholder')}
          className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 
                     focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500
                     transition-all duration-300 text-gray-800 font-medium
                     hover:border-gray-300"
          required
        />
        <datalist id="roles">
          {COMMON_ROLES.map(role => (
            <option key={role} value={role} />
          ))}
        </datalist>
      </div>

      {/* Evento */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">
          {t('eventLabel')}
        </label>
        <input
          type="text"
          value={formData.event_context}
          onChange={(e) => setFormData({ ...formData, event_context: e.target.value })}
          placeholder={t('eventPlaceholder')}
          className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 
                     focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500
                     transition-all duration-300 text-gray-800 font-medium
                     hover:border-gray-300"
          required
        />
      </div>

      {/* Tom */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-800">
          {t('toneLabel')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TONES.map(tone => (
            <ToneButton
              key={tone.value}
              tone={tone}
              isSelected={formData.tone_style === tone.value}
              onClick={(value) => setFormData({ ...formData, tone_style: value })}
            />
          ))}
        </div>
      </div>

      {/* Severidade */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-gray-800">
            {t('severityLabel')}
          </label>
          <span className="text-base font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
            {formData.severity_level}/10
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.severity_level}
          onChange={(e) => setFormData({ ...formData, severity_level: parseInt(e.target.value) })}
          className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer
                     accent-purple-600"
          style={{
            background: `linear-gradient(to right, 
              #86efac 0%, 
              #fef08a ${(formData.severity_level - 1) * 11.11}%, 
              #fca5a5 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span>{t('severityLow')}</span>
          <span>{t('severityMedium')}</span>
          <span>{t('severityHigh')}</span>
        </div>
      </div>

      {/* Opção de Emojis */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">😊</span>
          <div>
            <label htmlFor="emoji-toggle" className="block text-sm font-semibold text-gray-800 cursor-pointer">
              {t('useEmojisLabel')}
            </label>
            <p className="text-xs text-gray-600">{t('useEmojisDescription')}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id="emoji-toggle"
            type="checkbox"
            checked={formData.use_emojis}
            onChange={(e) => setFormData({ ...formData, use_emojis: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-indigo-600"></div>
        </label>
      </div>

      {/* Opção de Conteúdo Adulto */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔞</span>
          <div>
            <label htmlFor="mature-toggle" className="block text-sm font-semibold text-gray-800 cursor-pointer">
              {t('allowMatureLabel')}
            </label>
            <p className="text-xs text-gray-600">{t('allowMatureDescription')}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id="mature-toggle"
            type="checkbox"
            checked={formData.allow_mature_content}
            onChange={(e) => setFormData({ ...formData, allow_mature_content: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-600 peer-checked:to-orange-600"></div>
        </label>
      </div>

      {/* Contexto Adicional */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">
          {t('additionalContextLabel')}
        </label>
        <textarea
          value={formData.additional_context}
          onChange={(e) => setFormData({ ...formData, additional_context: e.target.value })}
          placeholder={t('additionalContextPlaceholder')}
          rows="3"
          className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 
                     focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500
                     transition-all duration-300 text-gray-800 font-medium
                     hover:border-gray-300 resize-none"
        />
        <p className="text-xs text-gray-500 italic">
          {language === 'en-US' 
            ? "Ex: Can't mention health, avoid family excuses, no work-related reasons"
            : "Ex: Não posso mencionar saúde, evitar desculpas familiares, sem razões de trabalho"}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Botão de envio */}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full px-6 py-4 rounded-xl font-bold text-white text-lg
          transition-all duration-300 flex items-center justify-center gap-3
          transform hover:scale-[1.02] active:scale-[0.98]
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 shadow-xl hover:shadow-2xl'
          }
        `}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t('generating')}
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t('generateButton')}
          </>
        )}
      </button>
    </form>
  );
}
