#!/bin/bash

echo "===================================="
echo " Gerador de Desculpas Plausíveis"
echo " Script de Inicialização - Backend"
echo "===================================="
echo ""

# Verifica se o ambiente virtual existe
if [ ! -d "venv" ]; then
    echo "[1/4] Criando ambiente virtual..."
    python3 -m venv venv
    echo "✓ Ambiente virtual criado"
else
    echo "[1/4] Ambiente virtual já existe"
fi

echo ""
echo "[2/4] Ativando ambiente virtual..."
source venv/bin/activate

echo ""
echo "[3/4] Instalando dependências..."
pip install -q -r requirements.txt
echo "✓ Dependências instaladas"

echo ""
echo "[4/4] Verificando configuração..."
if [ ! -f ".env" ]; then
    echo "⚠ ATENÇÃO: Arquivo .env não encontrado!"
    echo ""
    echo "Criando .env a partir do .env.example..."
    cp .env.example .env
    echo ""
    echo "❗ IMPORTANTE: Edite o arquivo .env e adicione sua OPENAI_API_KEY!"
    echo ""
    exit 1
else
    echo "✓ Arquivo .env encontrado"
fi

echo ""
echo "===================================="
echo " Iniciando servidor FastAPI..."
echo "===================================="
echo ""
echo "Backend disponível em: http://localhost:8000"
echo "Documentação da API: http://localhost:8000/docs"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

python -m uvicorn app.main:app --reload
