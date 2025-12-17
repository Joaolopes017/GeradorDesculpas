"""
Serviço de integração com LangChain para geração de desculpas
"""
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class ExcuseGeneratorService:
    """Serviço responsável pela geração de desculpas usando LangChain"""
    
    def __init__(self):
        """Inicializa o modelo e o template de prompt"""
        self.llm = ChatOpenAI(
            model=settings.MODEL_NAME,
            temperature=settings.MODEL_TEMPERATURE,
            max_tokens=settings.MAX_TOKENS,
            api_key=settings.OPENAI_API_KEY  #Nota: Parâmetro api_key utilizado conforme especificação da biblioteca LangChain
        )
        
        self.prompt_template = self._create_prompt_template()
        
        #Implementação da cadeia LCEL (LangChain Expression Language) para processamento sequencial
        self.chain = self.prompt_template | self.llm | StrOutputParser()
    
    def _remove_emojis(self, text: str) -> str:
        """Remove todos os emojis do texto"""
        import re
        #Expressão regular para identificação e remoção de caracteres emoji e símbolos Unicode especiais
        emoji_pattern = re.compile(
            "["
            u"\U0001F600-\U0001F64F"  #Bloco Unicode: Emoticons faciais
            u"\U0001F300-\U0001F5FF"  #Bloco Unicode: Símbolos diversos e pictogramas
            u"\U0001F680-\U0001F6FF"  #Bloco Unicode: Símbolos de transporte e mapas
            u"\U0001F1E0-\U0001F1FF"  #Bloco Unicode: Bandeiras regionais (iOS)
            u"\U00002702-\U000027B0"
            u"\U000024C2-\U0001F251"
            u"\U0001F900-\U0001F9FF"  #Bloco Unicode: Símbolos e pictogramas suplementares
            u"\U0001FA00-\U0001FA6F"  #Bloco Unicode: Símbolos de xadrez
            u"\U0001FA70-\U0001FAFF"  #Bloco Unicode: Símbolos e pictogramas estendidos A
            u"\U00002600-\U000026FF"  #Bloco Unicode: Símbolos diversos
            u"\U00002700-\U000027BF"  #Bloco Unicode: Dingbats
            "]+", 
            flags=re.UNICODE
        )
        return emoji_pattern.sub('', text).strip()
    
    def _create_prompt_template(self) -> ChatPromptTemplate:
        """
        Cria o template de prompt otimizado para geração de desculpas plausíveis
        Baseado na Teoria da Atribuição e princípios de psicologia social
        """
        system_message = """Você é um especialista em comunicação interpessoal e mediação de conflitos, com profundo conhecimento em Teoria da Atribuição e psicologia social.

Sua tarefa é redigir mensagens CURTAS de texto (estilo WhatsApp/SMS) para justificar ausências ou atrasos de forma plausível e socialmente aceitável.

⚠️ ATENÇÃO CRÍTICA: Se receber uma instrução explícita para NÃO usar emojis, você DEVE obedecer ABSOLUTAMENTE. Não use NENHUM emoji, símbolo emotivo, ou caractere especial decorativo. Apenas texto alfabético puro.

🔞 LINGUAGEM ADULTA E TEMAS MADUROS: Quando explicitamente permitido (allow_mature_content=True), você DEVE:
- Usar palavrões portugueses naturais (caralho, foda-se, merda, porra, etc.)
- Mencionar temas adultos quando relevante (ressaca pesada, sexo, problemas íntimos, etc.)
- Ser mais cru e direto na linguagem
- NÃO seja tímido - se está permitido, USE linguagem adulta de verdade
- Exemplos válidos: "Desculpa, tive uma ressaca do caralho", "Estava a foder e não vi as horas", "Tive problemas com a minha vida sexual"

DIRETRIZES PSICOLÓGICAS FUNDAMENTAIS:

1. PLAUSIBILIDADE & LOCUS DE CONTROLE:
   - A justificativa DEVE soar como EXTERNA e INCONTROLÁVEL
   - Evite causas que impliquem negligência pessoal
   - Boas causas: eventos de saúde súbitos, problemas de infraestrutura (trânsito, transporte), emergências domésticas/familiares
   - Más causas: "esqueci", "dormi demais", "não quis ir"

2. BOA INTENÇÃO (Critical):
   - SEMPRE inicie reafirmando sutilmente que você QUERIA comparecer
   - Demonstre que o plano original era moralmente correto
   - Ex: "Estava me preparando para sair quando...", "Saí com antecedência mas..."

3. CONCISÃO E NATURALIDADE:
   - Mensagens MUITO longas parecem defensivas ou mentirosas (over-explaining)
   - 2-4 linhas de texto são ideais
   - Use linguagem natural, não robótica
   - Evite clichês como "Espero que entenda" - varie o fechamento

4. ADAPTAÇÃO DE TOM (CRÍTICO):

   TOM PROFISSIONAL:
   - Linguagem formal e polida
   - Foco no impacto no trabalho/compromisso
   - Ofereça solução ou compensação
   - SEM emojis ou gírias
   - Ex: "Prezado [nome], infelizmente tive um imprevisto inadiável que me impediu de comparecer à reunião. Comprometo-me a revisar a ata e alinhar os próximos passos ainda hoje."
   
   TOM CASUAL:
   - Linguagem descontraída e direta, mas SEMPRE PLAUSÍVEL
   - Gírias leves são permitidas
   - Uso moderado de emojis (1-2 no máximo)
   - Tom de "colega" mas COM DESCULPA REAL E CRÍVEL
   - Mesmo casual, a desculpa deve fazer sentido e ser aceitável
   - NUNCA invente motivos absurdos ou impossíveis (isso é só para tom Ridículo)
   - Ex: "Cara, deu um problema aqui que não tinha como prever 😅 Compenso na próxima, beleza?"
   - Ex 2: "Mano, tive um perrengue sério com transporte hoje, não rolou mesmo"
   
   TOM AFETIVO/EMPÁTICO:
   - Linguagem calorosa e emotiva
   - Foco na relação e nos sentimentos do outro
   - Validação dos sentimentos ("Sei o quanto isso era importante")
   - Uso moderado de emojis de carinho (❤️, 😔)
   - Ex: "Amor, sinto muito mesmo por faltar. Sei o quanto você esperava por isso 😔 Tive um imprevisto que não consegui contornar. Posso compensar no fim de semana?"
   
   TOM DRAMÁTICO:
   - Linguagem mais intensa e urgente
   - Ênfase na gravidade do imprevisto
   - Pode ser mais longo se necessário
   - Ex: "Desculpa pelo susto! Aconteceu uma situação aqui que realmente me pegou de surpresa e foi impossível sair. Estou resolvendo agora mas fiquei péssimo por não avisar antes."
   
   TOM JOVEM:
   - Linguagem muito informal, estilo internet/redes sociais
   - Frases mais curtas e diretas, menos pontuação
   - Pode usar abreviações da internet (tipo "pq", "tb", "vc" com moderação)
   - Uso liberal de emojis (2-4)
   - Menos vírgulas, mais natural e "desleixado" mas compreensível
   - Use vírgulas apenas quando ABSOLUTAMENTE necessário para não perder sentido
   - Ex: "mano desculpa mas deu um perrengue aqui 😭 não deu pra ir msm tentei muito compenso qualquer coisa prometo 🙏✨"
   - Ex 2: "oi amor sinto mt n consegui ir 😔 rolou um problema serio aqui mas prometo compensar viu ❤️"
   
   TOM RIDÍCULO/ABSURDO:
   - ESTE É O ÚNICO TOM para desculpas COMPLETAMENTE absurdas e surreais
   - Motivos IMPOSSÍVEIS, ilógicos e exagerados que CLARAMENTE não fazem sentido
   - Pode incluir: alienígenas, conspirações, eventos sobrenaturais, teorias da conspiração ridículas
   - Quanto mais absurdo, engraçado e impossível, melhor
   - Pode ser dramático mas de forma CÔMICA e OBVIAMENTE FALSA
   - Use criatividade máxima e humor nonsense
   - TODOS OS OUTROS TONS devem ser plausíveis - APENAS Ridículo pode ser impossível
   - Ex: "Desculpa, fui abduzido por aliens que precisavam que eu explicasse como funcionam os memes. Levou mais tempo que o esperado porque eles não entenderam o conceito de 'sus' 👽"
   - Ex 2: "Não pude ir porque o meu gato começou a falar russo e tive que chamar um padre, um cientista e um linguista. Ainda estamos tentando entender o que ele quer 🐱"
   - Ex 3: "Descobri que sou descendente de reis vikings e tive que comparecer urgentemente a uma cerimônia de coroação em Valhalla. O Odin não aceita desculpas ⚔️"
   - Ex 4: "Estava prestes a sair quando descobri que sou na verdade um androide e tive que ir à manutenção urgente porque meu braço esquerdo começou a fazer sons de dial-up"

5. SEVERIDADE E DESCULPAS:
   - Para severidade BAIXA (1-3): Mensagem mais leve, compensação simples
   - Para severidade MÉDIA (4-7): Tom mais sério, pedido de desculpas claro
   - Para severidade ALTA (8-10): Tom muito sério, ênfase na excepcionalidade do ocorrido, proposta de compensação específica

6. FECHAMENTO ESTRATÉGICO:
   - Varie entre: propor reagendamento, oferecer compensação, expressar compromisso futuro
   - NÃO termine sempre da mesma forma
   - Para casos profissionais, ofereça próximos passos concretos

7. USO DE EMOJIS:
   - Por padrão, use emojis quando apropriado ao tom
   - PORÉM: Se o usuário instruir explicitamente para NÃO usar emojis, você DEVE obedecer completamente
   - Quando instruído a não usar emojis: ZERO emojis, nenhum símbolo emotivo, apenas texto puro

IMPORTANTE: Retorne APENAS o texto da mensagem, sem aspas, sem explicações adicionais, sem meta-comentários."""

        user_message = """Gere uma desculpa com os seguintes parâmetros:

Destinatário: {receiver_role}
Evento/Compromisso Perdido: {event_context}
Nível de Severidade: {severity_level}/10
Tom Desejado: {tone_style}
{hint_section}

Retorne apenas o texto da mensagem de desculpa."""

        return ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("human", user_message)
        ])
    
    async def generate_excuse(
        self,
        receiver_role: str,
        event_context: str,
        severity_level: int,
        tone_style: str,
        user_hint: str = None,
        additional_context: str = None,
        language: str = "pt-PT",
        use_emojis: bool = True,
        allow_mature_content: bool = False
    ) -> str:
        """
        Gera uma desculpa plausível baseada nos parâmetros fornecidos
        
        Args:
            receiver_role: Papel do destinatário (ex: Chefe, Amigo)
            event_context: Evento perdido
            severity_level: Gravidade de 1-10
            tone_style: Tom da mensagem
            user_hint: Dica opcional de motivo
            additional_context: Restrições ou contexto adicional
            language: Idioma da resposta (pt-PT, pt-BR, en-US)
            
        Returns:
            String com a desculpa gerada
        """
        try:
            #Preparação da seção de hints opcionais fornecidos pelo utilizador
            hint_section = ""
            if user_hint and user_hint.strip():
                hint_section = f"Motivo sugerido pelo usuário: {user_hint.strip()}\n(Use como base, mas elabore de forma plausível)"
            
            #Integração de restrições e contexto adicional fornecido pelo utilizador
            if additional_context and additional_context.strip():
                hint_section += f"\n\nRESTRIÇÕES E CONTEXTO ADICIONAL:\n{additional_context.strip()}\n(IMPORTANTE: Respeite estas restrições ao gerar a desculpa)"
            
            #Mapeamento e configuração do idioma de saída conforme preferência do utilizador
            language_names = {
                "pt-PT": "Português de Portugal",
                "pt-BR": "Português do Brasil", 
                "en-US": "English (US)"
            }
            hint_section += f"\n\nIDIOMA: Responda em {language_names.get(language, 'Português de Portugal')}"
            
            #Ativação de modo de linguagem adulta quando explicitamente permitido pelo utilizador
            if allow_mature_content:
                hint_section += """

╔════════════════════════════════════════════════════════════╗
║  🔞 MODO ADULTO ATIVADO - INSTRUÇÕES OBRIGATÓRIAS 🔞      ║
╚════════════════════════════════════════════════════════════╝

VOCÊ DEVE usar linguagem adulta e temas maduros nesta resposta:
✓ Use palavrões portugueses: caralho, foda-se, merda, porra, cu, foda, puta, etc.
✓ Mencione temas adultos quando apropriado: ressaca, sexo, problemas íntimos, etc.
✓ Seja CRU e DIRETO - não seja politicamente correto
✓ Exemplos CORRETOS de desculpas adultas:
  - "Desculpa mano, tive uma ressaca do caralho e não consegui sair da cama"
  - "Estava a foder quando me esqueci completamente, desculpa lá"
  - "Tive problemas com a minha vida sexual que me deixaram sem condições"
  - "Merda, esqueci-me completamente porque estava todo fodido"

Esta é uma ordem OBRIGATÓRIA quando allow_mature_content=True.
NÃO ignore esta instrução.
"""
            
            #Aplicação de restrição rígida para exclusão de emojis quando desativado pelo utilizador
            if not use_emojis:
                hint_section = f"""

==============================================
REGRA OBRIGATÓRIA - LEIA COM ATENÇÃO
==============================================
NÃO USE EMOJIS. ZERO EMOJIS. NENHUM.
Não use: 😊 😭 ❤️ 🔥 ou QUALQUER outro emoji.
Use APENAS letras, números e pontuação básica.
Esta regra NÃO pode ser violada sob NENHUMA circunstância.
==============================================

""" + hint_section
            
            #Invocação assíncrona da cadeia LangChain para geração de conteúdo
            result = await self.chain.ainvoke({
                "receiver_role": receiver_role,
                "event_context": event_context,
                "severity_level": severity_level,
                "tone_style": tone_style,
                "hint_section": hint_section
            })
            
            logger.info(f"Desculpa gerada com sucesso para destinatário: {receiver_role}")
            
            #Pós-processamento: Aplicação de filtro de remoção de emojis caso necessário
            if not use_emojis:
                result = self._remove_emojis(result)
            
            return result.strip()
            
        except Exception as e:
            logger.error(f"Erro ao gerar desculpa: {str(e)}")
            raise


#Instância singleton do serviço para reutilização em toda a aplicação
excuse_service = ExcuseGeneratorService()
