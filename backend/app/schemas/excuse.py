"""
Schemas Pydantic para validação de dados
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime


class ExcuseRequest(BaseModel):
    """Schema de requisição para geração de desculpa"""
    
    receiver_role: str = Field(
        ...,
        example="Chefe",
        description="Papel social do destinatário (ex: Chefe, Namorado(a), Amigo, Professor)"
    )
    
    event_context: str = Field(
        ...,
        example="Reunião de status mensal",
        description="Evento ou compromisso perdido"
    )
    
    severity_level: int = Field(
        default=5,
        ge=1,
        le=10,
        description="Gravidade do erro numa escala de 1 (leve) a 10 (muito grave)"
    )
    
    tone_style: str = Field(
        default="Profissional",
        description="Tom da mensagem: Profissional, Casual, Afetivo, Dramático"
    )
    
    user_hint: Optional[str] = Field(
        default=None,
        example="trânsito intenso",
        description="Dica opcional de motivo (ex: 'dor de cabeça', 'trânsito', 'emergência familiar')"
    )
    
    additional_context: Optional[str] = Field(
        default=None,
        example="Não posso mencionar problemas de saúde ou usar desculpas relacionadas com trabalho",
        description="Contexto adicional com restrições ou informações extras para melhorar a desculpa"
    )
    
    language: Optional[str] = Field(
        default="pt-PT",
        description="Idioma da desculpa: pt-PT, pt-BR, en-US"
    )
    
    use_emojis: Optional[bool] = Field(
        default=True,
        description="Se deve incluir emojis na desculpa"
    )
    
    allow_mature_content: Optional[bool] = Field(
        default=False,
        description="Permite linguagem adulta e palavrões quando apropriado"
    )
    
    @field_validator('tone_style')
    @classmethod
    def validate_tone(cls, v: str) -> str:
        """Valida o tom escolhido"""
        allowed_tones = ["Profissional", "Casual", "Afetivo", "Dramático", "Jovem", "Ridículo"]
        if v not in allowed_tones:
            raise ValueError(f"Tom deve ser um dos seguintes: {', '.join(allowed_tones)}")
        return v
    
    @field_validator('receiver_role', 'event_context')
    @classmethod
    def validate_not_empty(cls, v: str) -> str:
        """Garante que campos obrigatórios não sejam vazios"""
        if not v or v.strip() == "":
            raise ValueError("Este campo não pode estar vazio")
        return v.strip()


class ExcuseResponse(BaseModel):
    """Schema de resposta com a desculpa gerada"""
    
    content: str = Field(
        ...,
        description="Texto da desculpa gerada"
    )
    
    generated_at: str = Field(
        default_factory=lambda: datetime.now().isoformat(),
        description="Timestamp da geração"
    )
    
    tone_used: str = Field(
        ...,
        description="Tom aplicado na mensagem"
    )
    
    word_count: int = Field(
        ...,
        description="Contagem de palavras da desculpa"
    )


class HealthResponse(BaseModel):
    """Schema para health check"""
    
    status: str
    version: str
    timestamp: str = Field(
        default_factory=lambda: datetime.now().isoformat()
    )
