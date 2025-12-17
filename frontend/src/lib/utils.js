/**
 * Utilitário para compartilhar texto via Web Share API ou WhatsApp
 */

export async function shareText(text, title = 'Minha Desculpa') {
  // Tenta usar a Web Share API nativa (mobile)
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
      });
      return { success: true, method: 'native' };
    } catch (error) {
      if (error.name === 'AbortError') {
        // Usuário cancelou o compartilhamento
        return { success: false, cancelled: true };
      }
      console.error('Erro ao compartilhar:', error);
    }
  }
  
  // Fallback: Abre WhatsApp Web/App
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappURL, '_blank');
  return { success: true, method: 'whatsapp' };
}

/**
 * Abre diretamente o WhatsApp com o texto
 */
export function shareToWhatsApp(text) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

/**
 * Formata a contagem de palavras
 */
export function formatWordCount(count) {
  return `${count} ${count === 1 ? 'palavra' : 'palavras'}`;
}
