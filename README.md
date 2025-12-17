# Gerador de Desculpas Plausíveis

Sistema de geração de desculpas contextualizadas usando LangChain e OpenAI GPT-3.5-turbo.

## Descrição

Aplicação web que gera desculpas plausíveis baseadas em princípios de Teoria da Atribuição e psicologia social. O sistema adapta o tom e conteúdo conforme o destinatário e contexto fornecidos.

## Tecnologias

**Backend:**
- Python 3.11
- FastAPI
- LangChain
- OpenAI API

**Frontend:**
- React 18
- Vite
- Tailwind CSS

## Funcionalidades

- 6 tons diferentes: Profissional, Casual, Afetivo, Dramático, Jovem, Ridículo
- Ajuste de severidade (1-10)
- Suporte multi-idioma (PT-PT, PT-BR, EN-US)
- Opção de ativar/desativar emojis
- Modo de linguagem adulta opcional (+18)
- Campo de contexto adicional para restrições específicas

## Instalação

### Requisitos
- Docker e Docker Compose
- OpenAI API Key

### Configuração

1. Clone o repositório
```bash
git clone https://github.com/Joaolopes017/GeradorDesculpas.git
cd GeradorDesculpas
```

2. Configure a API key
```bash
cp .env.example .env
```
Edite `.env` e adicione sua chave OpenAI:
```
OPENAI_API_KEY=sua_chave_aqui
```

3. Inicie com Docker
```bash
docker-compose up -d --build
```

4. Acesse a aplicação
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Documentação API: http://localhost:8000/docs

## Estrutura do Projeto

```
├── backend/
│   ├── app/
│   │   ├── api/endpoints/     # Endpoints FastAPI
│   │   ├── core/              # Configurações
│   │   ├── schemas/           # Modelos Pydantic
│   │   └── services/          # Lógica LangChain
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # Utilitários e API client
│   └── package.json
└── docker-compose.yml
```

## Uso da API

### Gerar Desculpa

```bash
POST /api/generate
Content-Type: application/json

{
  "receiver_role": "Chefe",
  "event_context": "Reunião importante",
  "severity_level": 7,
  "tone_style": "Profissional",
  "language": "pt-PT",
  "use_emojis": false,
  "allow_mature_content": false
}
```

### Resposta

```json
{
  "content": "Prezado, infelizmente tive um imprevisto inadiável que me impediu de comparecer à reunião...",
  "tone_used": "Profissional",
  "word_count": 28
}
```

## Desenvolvimento

### Backend local (sem Docker)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend local (sem Docker)

```bash
cd frontend
npm install
npm run dev
```

## Implementação LangChain

O sistema utiliza LangChain Expression Language (LCEL) para construir uma cadeia de processamento:

```python
chain = prompt_template | llm | StrOutputParser()
```

O prompt é estruturado com instruções baseadas em Teoria da Atribuição, garantindo que as desculpas:
- Apresentem locus de controle externo
- Demonstrem boa intenção inicial
- Sejam concisas e naturais
- Adaptem-se ao tom especificado

## Licença

MIT License - veja LICENSE para detalhes.

## Autor

João Lopes ([@joaolopes017](https://github.com/joaolopes017))
