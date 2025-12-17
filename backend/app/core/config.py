"""
Configurações globais da aplicação
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Configurações da aplicação carregadas de variáveis de ambiente"""
    
    #Metadados da aplicação
    APP_NAME: str = "Gerador de Desculpas Plausíveis"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    #Configurações da API OpenAI e modelo de linguagem
    OPENAI_API_KEY: str
    MODEL_NAME: str = "gpt-3.5-turbo"
    MODEL_TEMPERATURE: float = 0.7
    MAX_TOKENS: int = 300
    
    #Configuração de origens permitidas para CORS (Cross-Origin Resource Sharing)
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]
    
    #Parâmetros de limitação de taxa para controlo de tráfego
    RATE_LIMIT_PER_MINUTE: int = 10
    
    class Config:
        env_file = ".env"
        case_sensitive = True


#Instância global singleton das configurações da aplicação
settings = Settings()
