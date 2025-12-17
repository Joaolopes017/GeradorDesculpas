#!/bin/bash

echo "===================================="
echo " Gerador de Desculpas Plausíveis"
echo " Script de Inicialização - Frontend"
echo "===================================="
echo ""

# Verifica se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "[1/2] Instalando dependências do Node.js..."
    npm install
    echo "✓ Dependências instaladas"
else
    echo "[1/2] Dependências já instaladas"
fi

echo ""
echo "[2/2] Verificando configuração..."
if [ ! -f ".env" ]; then
    echo "⚠ Arquivo .env não encontrado (opcional)"
    echo "Criando .env a partir do .env.example..."
    cp .env.example .env
    echo "✓ Arquivo .env criado"
else
    echo "✓ Arquivo .env encontrado"
fi

echo ""
echo "===================================="
echo " Iniciando servidor de desenvolvimento..."
echo "===================================="
echo ""
echo "Frontend disponível em: http://localhost:3000"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

npm run dev
