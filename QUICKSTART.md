# Guia de Início Rápido

## 🚀 Configuração Inicial Rápida (5 minutos)

### 1. Clone ou Baixe o Projeto

### 2. Configure a API Key da OpenAI

**Obter a chave:**
1. Acesse https://platform.openai.com/api-keys
2. Crie uma nova API key
3. Copie a chave

**Configurar no Backend:**
```bash
cd backend
copy .env.example .env
```

Edite o arquivo `.env` e substitua `your_openai_api_key_here` pela sua chave real:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Executar o Backend

**Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

**Linux/Mac:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

✅ Backend rodando em: http://localhost:8000
📚 Documentação da API: http://localhost:8000/docs

### 4. Executar o Frontend (Nova janela do terminal)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend rodando em: http://localhost:3000

### 5. Testar a Aplicação

1. Abra http://localhost:3000 no navegador
2. Preencha os campos:
   - Para quem: "Chefe"
   - Compromisso: "Reunião de segunda-feira"
   - Escolha o tom: "Profissional"
   - Ajuste a gravidade
3. Clique em "Gerar Desculpa"
4. Aguarde alguns segundos
5. Copie ou compartilhe a desculpa gerada!

## 🐳 Alternativa: Usar Docker

Se preferir usar Docker:

```bash
# Na raiz do projeto
copy .env.example .env
# Edite .env e adicione sua OPENAI_API_KEY

docker-compose up -d
```

Acesse: http://localhost:3000

## ❗ Problemas Comuns

### Erro: "OPENAI_API_KEY não configurada"
- Certifique-se de ter criado o arquivo `.env` no diretório `backend/`
- Verifique se a chave está correta

### Erro: "Porta 8000 já em uso"
- Outra aplicação está usando a porta 8000
- Mude a porta no comando: `uvicorn app.main:app --reload --port 8001`

### Erro no Frontend: "Failed to fetch"
- Verifique se o backend está rodando em http://localhost:8000
- Verifique o console do navegador para mais detalhes

### Erro: "Module not found"
- No backend: Certifique-se de ter ativado o venv e instalado as dependências
- No frontend: Execute `npm install` novamente

## 💰 Custos da OpenAI

Este projeto usa GPT-3.5-turbo, que é muito econômico:
- ~$0.001 por desculpa gerada (aproximadamente 1000 desculpas por $1)
- Configure limites de gasto na OpenAI: https://platform.openai.com/account/limits

## 📖 Próximos Passos

- Leia o README.md completo para entender a arquitetura
- Explore a documentação da API em /docs
- Customize os prompts em `backend/app/services/llm_chain.py`
- Modifique o design em `frontend/src/components/`

## 🆘 Precisa de Ajuda?

1. Verifique os logs do backend no terminal
2. Abra o Console do Navegador (F12) para erros do frontend
3. Consulte a documentação da API em /docs
4. Abra uma issue no GitHub

---

**Boa sorte! 🎭**
