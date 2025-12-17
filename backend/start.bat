@echo off
echo ====================================
echo  Gerador de Desculpas Plausíveis
echo  Script de Inicializacao - Backend
echo ====================================
echo.

REM Verifica se o ambiente virtual existe
if not exist "venv" (
    echo [1/4] Criando ambiente virtual...
    python -m venv venv
    echo ✓ Ambiente virtual criado
) else (
    echo [1/4] Ambiente virtual já existe
)

echo.
echo [2/4] Ativando ambiente virtual...
call venv\Scripts\activate.bat

echo.
echo [3/4] Instalando dependências...
pip install -q -r requirements.txt
echo ✓ Dependências instaladas

echo.
echo [4/4] Verificando configuração...
if not exist ".env" (
    echo ⚠ ATENÇÃO: Arquivo .env não encontrado!
    echo.
    echo Criando .env a partir do .env.example...
    copy .env.example .env
    echo.
    echo ❗ IMPORTANTE: Edite o arquivo .env e adicione sua OPENAI_API_KEY!
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Arquivo .env encontrado
)

echo.
echo ====================================
echo  Iniciando servidor FastAPI...
echo ====================================
echo.
echo Backend disponível em: http://localhost:8000
echo Documentação da API: http://localhost:8000/docs
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

REM Mudança: usar porta 8001 se 8000 estiver ocupada
python -m uvicorn app.main:app --reload --port 8001
