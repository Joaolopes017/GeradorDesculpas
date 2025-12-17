@echo off
echo ====================================
echo  Gerador de Desculpas Plausíveis
echo  Script de Inicializacao - Frontend
echo ====================================
echo.

REM Verifica se node_modules existe
if not exist "node_modules" (
    echo [1/2] Instalando dependências do Node.js...
    call npm install
    echo ✓ Dependências instaladas
) else (
    echo [1/2] Dependências já instaladas
)

echo.
echo [2/2] Verificando configuração...
if not exist ".env" (
    echo ⚠ Arquivo .env não encontrado (opcional)
    echo Criando .env a partir do .env.example...
    copy .env.example .env
    echo ✓ Arquivo .env criado
) else (
    echo ✓ Arquivo .env encontrado
)

echo.
echo ====================================
echo  Iniciando servidor de desenvolvimento...
echo ====================================
echo.
echo Frontend disponível em: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm run dev
