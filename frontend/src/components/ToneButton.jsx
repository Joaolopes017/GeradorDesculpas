/**
 * Componente de botão de tom (Pills)
 */
export function ToneButton({ tone, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(tone.value)}
      className={`
        px-4 py-3 rounded-xl font-medium transition-all duration-200 
        flex items-center gap-2 text-sm
        ${isSelected 
          ? 'bg-indigo-600 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }
      `}
    >
      <span className="text-lg">{tone.emoji}</span>
      <span>{tone.label}</span>
    </button>
  );
}
