# Gerador de Desculpas Plausíveis 🎭

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Sistema Generativo de Justificativas Sociais usando IA - Um aplicativo que gera desculpas plausíveis e socialmente aceitáveis para situações cotidianas.

---

## 🚀 Início Rápido

**Quer começar imediatamente?** Siga o [Guia de Início Rápido (5 minutos)](QUICKSTART.md)

---

## 📋 Sobre o Projeto

Este é um MVP (Produto Mínimo Viável) completo e funcional de um gerador de desculpas baseado em princípios de **Teoria da Atribuição** e **Psicologia Social**. O sistema utiliza Grandes Modelos de Linguagem (LLMs) via LangChain para criar justificativas contextualizadas, plausíveis e adequadas ao tom e destinatário específicos.

### 🎬 Demo

![Demo](https://via.placeholder.com/800x450.png?text=Screenshot+da+Aplica%C3%A7%C3%A3o)

*Screenshot da aplicação em funcionamento*

### 🎯 Principais Funcionalidades

- ✅ Geração de desculpas personalizadas por contexto e destinatário
- ✅ 4 tons diferentes: Profissional, Casual, Afetivo e Dramático
- ✅ Ajuste de severidade de 1-10
- ✅ Integração com WhatsApp via Web Share API
- ✅ Copiar para área de transferência com feedback visual
- ✅ Interface responsiva e mobile-first
- ✅ API RESTful completa com FastAPI

## 🏗️ Arquitetura

### Backend
- **Python 3.11+**
- **FastAPI** - Framework web assíncrono
- **LangChain** - Orquestração de LLMs
- **OpenAI GPT-3.5** - Modelo de linguagem
- **Pydantic** - Validação de dados

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Web Share API** - Compartilhamento nativo

## 🚀 Como Executar

### Pré-requisitos

- Python 3.11+
- Node.js 18+
- Conta OpenAI com API Key
- Docker (opcional)

### Opção 1: Execução Local

#### Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente (Windows)
venv\Scripts\activate

# Ativar ambiente (Linux/Mac)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
copy .env.example .env
# Edite .env e adicione sua OPENAI_API_KEY

# Executar servidor
uvicorn app.main:app --reload
```

O backend estará disponível em `http://localhost:8000`
- Documentação da API: `http://localhost:8000/docs`

#### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (opcional)
copy .env.example .env

# Executar em modo de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

### Opção 2: Docker Compose

```bash
# Na raiz do projeto

# Criar arquivo .env na raiz
echo OPENAI_API_KEY=sua_chave_aqui > .env

# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

## 📡 Endpoints da API

### `POST /api/generate`
Gera uma desculpa plausível.

**Request Body:**
```json
{
  "receiver_role": "Chefe",
  "event_context": "Reunião de status",
  "severity_level": 7,
  "tone_style": "Profissional",
  "user_hint": "trânsito intenso"
}
```

**Response:**
```json
{
  "content": "Prezado [nome], infelizmente tive um imprevisto no trânsito...",
  "generated_at": "2024-01-15T10:30:00",
  "tone_used": "Profissional",
  "word_count": 45
}
```

### `GET /api/tones`
Lista os tons disponíveis.

### `GET /api/roles`
Lista sugestões de destinatários comuns.

### `GET /api/health`
Health check do serviço.

## 🎨 Interface do Usuário

A interface foi projetada seguindo princípios **Mobile First** com foco em:

1. **Baixa Latência Cognitiva** - Mínimo de inputs necessários
2. **Feedback Visual Imediato** - Estados de loading e sucesso claros
3. **Compartilhamento Fácil** - Um clique para WhatsApp/copiar
4. **Design Empático** - Sem julgamento, tom neutro e funcional

## 🔒 Segurança e Considerações Éticas

### Implementado
- ✅ Validação de dados com Pydantic
- ✅ CORS configurado para origens específicas
- ✅ Tratamento de erros e logs
- ✅ Variáveis de ambiente para secrets

### Recomendações para Produção
- 🔄 Rate Limiting (implementar SlowAPI)
- 🔄 Guardrails para conteúdo tóxico (Nemo Guardrails)
- 🔄 Cache de respostas para reduzir custos
- 🔄 Monitoramento de custos da OpenAI API
- 🔄 HTTPS obrigatório

## 💡 Roadmap Futuro

### Melhorias Planejadas
- [ ] Integração com Google Calendar (RAG para fatos reais)
- [ ] Personalização de voz (Few-Shot Learning do estilo do usuário)
- [ ] Análise de sentimento do destinatário
- [ ] Histórico de desculpas geradas
- [ ] Suporte a múltiplos idiomas
- [ ] Modo offline com modelos locais (Llama 3)

## 📦 Deploy

### Recomendações do MVP

**Frontend**: Vercel
- Build automático via Git
- CDN global
- Free tier generoso

**Backend**: Render.com
- Web Service (Free tier com cold starts)
- Suporta variáveis de ambiente
- Mantém serviço ativo com cron jobs

### Configuração no Render

1. Conectar repositório GitHub
2. Configurar:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**: Adicionar `OPENAI_API_KEY`

### Configuração no Vercel

1. Conectar repositório GitHub
2. Configurar:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Environment Variables**: `VITE_API_URL` (URL do backend no Render)

## 🧪 Testes

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm run test
```

## 📄 Licença

Este projeto é fornecido "como está" para fins educacionais e de demonstração.

## 📚 Documentação Completa

Este projeto inclui documentação extensiva para facilitar o uso e desenvolvimento:

| Documento | Descrição |
|-----------|-----------|
| 📖 **[QUICKSTART.md](QUICKSTART.md)** | Guia de início rápido - Configure e execute em 5 minutos |
| 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** | Arquitetura técnica detalhada com diagramas |
| 📡 **[API_EXAMPLES.md](API_EXAMPLES.md)** | Exemplos práticos de uso da API REST |
| 🎨 **[CUSTOMIZATION.md](CUSTOMIZATION.md)** | Como personalizar prompts, tons e funcionalidades |
| 🚀 **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)** | Guia completo de deploy para produção |
| 📊 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Sumário executivo do projeto |

## 🤝 Contribuições

Contribuições são bem-vindas! Este projeto é ideal para:

- 🎓 Estudantes aprendendo IA/LLMs
- 💼 Desenvolvedores explorando LangChain/FastAPI
- 🎨 Designers de UX/UI
- 📝 Escritores técnicos

**Como contribuir:**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📞 Suporte

Para questões, sugestões ou suporte:
- 📧 Abra uma [issue](https://github.com/seu-usuario/gerador-desculpas/issues)
- 💬 Consulte a [documentação completa](PROJECT_SUMMARY.md)
- 🐛 Reporte bugs com detalhes para reprodução

## ⭐ Mostre seu Apoio

Se este projeto foi útil para você, considere dar uma ⭐!

## 📄 Licença

Este projeto é fornecido "como está" para fins educacionais e de demonstração. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ usando Python, React e IA Generativa**

*Um exemplo prático de como LLMs podem resolver problemas humanos reais através de Engenharia de Prompt, Psicologia Social e Design Thinking.*

---

### 🔗 Links Úteis

- [Documentação FastAPI](https://fastapi.tiangolo.com/)
- [Documentação LangChain](https://python.langchain.com/docs/)
- [Documentação React](https://react.dev/)
- [OpenAI API](https://platform.openai.com/docs/)
- [Guia de Prompt Engineering](https://www.promptingguide.ai/)

---

**Made with 💜 by Jonas** | **Powered by GPT-3.5 & LangChain**
