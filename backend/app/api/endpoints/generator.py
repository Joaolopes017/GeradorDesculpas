"""
Endpoints para geração de desculpas
"""
from fastapi import APIRouter, HTTPException
from app.schemas.excuse import ExcuseRequest, ExcuseResponse, HealthResponse
from app.services.llm_chain import excuse_service
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION
    )


@router.post("/generate", response_model=ExcuseResponse)
async def generate_excuse(data: ExcuseRequest):
    """
    Gera uma desculpa plausível baseada nos parâmetros fornecidos
    """
    try:
        #Processamento da requisição através do serviço LangChain
        excuse_text = await excuse_service.generate_excuse(
            receiver_role=data.receiver_role,
            event_context=data.event_context,
            severity_level=data.severity_level,
            tone_style=data.tone_style,
            user_hint=data.user_hint,
            additional_context=data.additional_context,
            language=data.language or "pt-PT",
            use_emojis=data.use_emojis if data.use_emojis is not None else True,
            allow_mature_content=data.allow_mature_content if data.allow_mature_content is not None else False
        )
        
        #Construção do objeto de resposta com metadados calculados
        return ExcuseResponse(
            content=excuse_text,
            tone_used=data.tone_style,
            word_count=len(excuse_text.split())
        )
        
    except Exception as e:
        logger.error(f"Erro ao gerar desculpa: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao gerar desculpa. Verifique os logs do servidor."
        )


@router.get("/tones")
async def get_available_tones():
    """Lista os tons de mensagem disponíveis"""
    return {
        "tones": [
            {
                "value": "Profissional",
                "label": "Profissional",
                "description": "Formal e polido, ideal para contextos de trabalho",
                "emoji": "💼"
            },
            {
                "value": "Casual",
                "label": "Casual",
                "description": "Descontraído e direto, para amigos e conhecidos",
                "emoji": "😎"
            },
            {
                "value": "Afetivo",
                "label": "Afetivo",
                "description": "Caloroso e empático, para relações próximas",
                "emoji": "❤️"
            },
            {
                "value": "Dramático",
                "label": "Dramático",
                "description": "Intenso e urgente, para situações graves",
                "emoji": "😰"
            },
            {
                "value": "Jovem",
                "label": "Jovem",
                "description": "Estilo internet, informal, com emojis e gírias",
                "emoji": "🔥"
            },
            {
                "value": "Ridículo",
                "label": "Ridículo",
                "description": "Desculpas absurdas, surreais e hilariantes",
                "emoji": "🤪"
            }
        ]
    }


@router.get("/roles")
async def get_common_roles():
    """Lista sugestões de destinatários comuns"""
    return {
        "roles": [
            "Chefe",
            "Colega de Trabalho",
            "Cliente",
            "Professor",
            "Amigo",
            "Namorado(a)",
            "Familiar",
            "Médico",
            "Proprietário (aluguel)"
        ]
    }
