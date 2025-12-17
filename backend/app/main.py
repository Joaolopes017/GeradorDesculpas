"""
FastAPI Application - Gerador de Desculpas Plausíveis
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import generator
import logging

#Configuração do sistema de logging para monitorização e depuração
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

#Inicialização da instância FastAPI com metadados e documentação automática
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Sistema Generativo de Justificativas Sociais usando IA",
    docs_url="/docs",
    redoc_url="/redoc"
)

#Configuração de middleware CORS para permitir requisições cross-origin do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Registo de routers da API com prefixo e tags para organização
app.include_router(
    generator.router,
    prefix="/api",
    tags=["Geração de Desculpas"]
)


@app.on_event("startup")
async def startup_event():
    """Evento executado ao iniciar a aplicação"""
    logger.info(f"Iniciando {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info(f"Modelo configurado: {settings.MODEL_NAME}")
    
    if not settings.OPENAI_API_KEY:
        logger.warning("⚠️ OPENAI_API_KEY não configurada! A aplicação não funcionará corretamente.")
    else:
        logger.info("✅ OPENAI_API_KEY configurada")


@app.on_event("shutdown")
async def shutdown_event():
    """Evento executado ao desligar a aplicação"""
    logger.info("Encerrando aplicação...")


@app.get("/")
async def root():
    """Endpoint raiz com informações básicas"""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "docs": "/docs",
        "health": "/api/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
