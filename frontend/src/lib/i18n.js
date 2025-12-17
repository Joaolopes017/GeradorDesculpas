/**
 * Sistema de Internacionalização
 * Suporta: PT-PT, PT-BR, EN-US
 */

export const languages = {
  'pt-PT': {
    code: 'pt-PT',
    name: 'Português (Portugal)',
    flag: '🇵🇹'
  },
  'pt-BR': {
    code: 'pt-BR',
    name: 'Português (Brasil)',
    flag: '🇧🇷'
  },
  'en-US': {
    code: 'en-US',
    name: 'English (US)',
    flag: '🇺🇸'
  }
};

export const translations = {
  'pt-PT': {
    // Header
    appTitle: 'Gerador de Desculpas Plausíveis',
    appSubtitle: 'Sistema Generativo de Justificativas Sociais usando IA',
    
    // Form Labels
    receiverLabel: 'Para quem é a desculpa?',
    receiverPlaceholder: 'Ex: Chefe, Amigo, Namorada(o)...',
    eventLabel: 'Contexto/Evento',
    eventPlaceholder: 'Ex: Reunião importante, Jantar de aniversário...',
    severityLabel: 'Gravidade da Situação',
    severityLow: 'Baixa',
    severityMedium: 'Média',
    severityHigh: 'Alta',
    toneLabel: 'Escolha o Tom',
    additionalContextLabel: 'Contexto Adicional (Opcional)',
    additionalContextPlaceholder: 'Ex: Não posso mencionar problemas de saúde, evitar falar de família, não posso usar desculpas relacionadas com trabalho...',
    useEmojisLabel: 'Incluir Emojis',
    useEmojisDescription: 'Adicionar emojis à desculpa',
    allowMatureLabel: 'Linguagem Adulta (+18)',
    allowMatureDescription: 'Permitir palavrões e linguagem crua',
    
    // Tone Buttons
    toneFormal: 'Profissional',
    toneCasual: 'Casual',
    toneAffectionate: 'Afetivo',
    toneDramatic: 'Dramático',
    toneYoung: 'Jovem',
    toneAbsurd: 'Ridículo',
    
    // Actions
    generateButton: 'Gerar Desculpa',
    generating: 'A Gerar...',
    copyButton: 'Copiar',
    copied: 'Copiado!',
    shareWhatsApp: 'Enviar via WhatsApp',
    shareOther: 'Partilhar',
    
    // Result Card
    resultTitle: 'Desculpa Gerada',
    wordCount: 'palavras',
    
    // Errors
    errorTitle: 'Erro',
    errorGeneric: 'Ocorreu um erro ao gerar a desculpa. Por favor, tente novamente.',
    errorFieldRequired: 'Este campo é obrigatório',
    
    // Credits
    creditsText: 'Desenvolvido por',
    creditsGitHub: 'GitHub'
  },
  
  'pt-BR': {
    // Header
    appTitle: 'Gerador de Desculpas Plausíveis',
    appSubtitle: 'Sistema Generativo de Justificativas Sociais usando IA',
    
    // Form Labels
    receiverLabel: 'Para quem é a desculpa?',
    receiverPlaceholder: 'Ex: Chefe, Amigo, Namorada(o)...',
    eventLabel: 'Contexto/Evento',
    eventPlaceholder: 'Ex: Reunião importante, Jantar de aniversário...',
    severityLabel: 'Gravidade da Situação',
    severityLow: 'Baixa',
    severityMedium: 'Média',
    severityHigh: 'Alta',
    toneLabel: 'Escolha o Tom',
    additionalContextLabel: 'Contexto Adicional (Opcional)',
    additionalContextPlaceholder: 'Ex: Não posso mencionar problemas de saúde, evitar falar de família, não posso usar desculpas relacionadas com trabalho...',
    useEmojisLabel: 'Incluir Emojis',
    useEmojisDescription: 'Adicionar emojis à desculpa',
    allowMatureLabel: 'Linguagem Adulta (+18)',
    allowMatureDescription: 'Permitir palavrões e linguagem crua',
    
    // Tone Buttons
    toneFormal: 'Profissional',
    toneCasual: 'Casual',
    toneAffectionate: 'Carinhoso',
    toneDramatic: 'Dramático',
    toneYoung: 'Jovem',
    toneAbsurd: 'Ridículo',
    
    // Actions
    generateButton: 'Gerar Desculpa',
    generating: 'Gerando...',
    copyButton: 'Copiar',
    copied: 'Copiado!',
    shareWhatsApp: 'Enviar via WhatsApp',
    shareOther: 'Compartilhar',
    
    // Result Card
    resultTitle: 'Desculpa Gerada',
    wordCount: 'palavras',
    
    // Errors
    errorTitle: 'Erro',
    errorGeneric: 'Ocorreu um erro ao gerar a desculpa. Por favor, tente novamente.',
    errorFieldRequired: 'Este campo é obrigatório',
    
    // Credits
    creditsText: 'Desenvolvido por',
    creditsGitHub: 'GitHub'
  },
  
  'en-US': {
    // Header
    appTitle: 'Plausible Excuse Generator',
    appSubtitle: 'AI-Powered Social Justification Generation System',
    
    // Form Labels
    receiverLabel: 'Who is the excuse for?',
    receiverPlaceholder: 'Ex: Boss, Friend, Partner...',
    eventLabel: 'Context/Event',
    eventPlaceholder: 'Ex: Important meeting, Birthday dinner...',
    severityLabel: 'Situation Severity',
    severityLow: 'Low',
    severityMedium: 'Medium',
    severityHigh: 'High',
    toneLabel: 'Choose Tone',
    additionalContextLabel: 'Additional Context (Optional)',
    additionalContextPlaceholder: 'Ex: Cannot mention health issues, avoid talking about family, cannot use work-related excuses...',
    useEmojisLabel: 'Include Emojis',
    useEmojisDescription: 'Add emojis to the excuse',
    allowMatureLabel: 'Mature Language (+18)',
    allowMatureDescription: 'Allow profanity and explicit language',
    
    // Tone Buttons
    toneFormal: 'Professional',
    toneCasual: 'Casual',
    toneAffectionate: 'Affectionate',
    toneDramatic: 'Dramatic',
    toneYoung: 'Young',
    toneAbsurd: 'Absurd',
    
    // Actions
    generateButton: 'Generate Excuse',
    generating: 'Generating...',
    copyButton: 'Copy',
    copied: 'Copied!',
    shareWhatsApp: 'Send via WhatsApp',
    shareOther: 'Share',
    
    // Result Card
    resultTitle: 'Generated Excuse',
    wordCount: 'words',
    
    // Errors
    errorTitle: 'Error',
    errorGeneric: 'An error occurred while generating the excuse. Please try again.',
    errorFieldRequired: 'This field is required',
    
    // Credits
    creditsText: 'Developed by',
    creditsGitHub: 'GitHub'
  }
};

// Hook para usar traduções
export const useTranslation = (language = 'pt-PT') => {
  return {
    t: (key) => translations[language]?.[key] || key,
    language,
    languages
  };
};
