/**
 * Hook customizado para copiar texto para a área de transferência
 * Com feedback visual temporizado
 */
import { useState } from 'react';

export function useClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API não suportada');
      return false;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
      return true;
    } catch (error) {
      console.error('Falha ao copiar:', error);
      setIsCopied(false);
      return false;
    }
  };

  return { isCopied, copyToClipboard };
}
