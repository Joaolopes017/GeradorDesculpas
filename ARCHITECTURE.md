# Arquitetura Técnica Detalhada

## 📐 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        USUÁRIO                               │
│                     (Navegador Web)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components                                          │  │
│  │  ├─ ExcuseGenerator (Formulário principal)          │  │
│  │  ├─ ToneButton (Seletor de tom)                     │  │
│  │  └─ ResultCard (Exibição do resultado)              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Hooks                                               │  │
│  │  └─ useClipboard (Copiar para área de transferência)│  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services                                            │  │
│  │  ├─ API Client (Comunicação com backend)            │  │
│  │  └─ Utils (Web Share API, WhatsApp)                 │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ REST API
                     │ (JSON)
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   BACKEND (FastAPI)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Endpoints                                       │  │
│  │  ├─ POST /api/generate (Gerar desculpa)             │  │
│  │  ├─ GET /api/tones (Listar tons)                    │  │
│  │  ├─ GET /api/roles (Listar destinatários)           │  │
│  │  └─ GET /api/health (Health check)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Schemas (Pydantic)                                  │  │
│  │  ├─ ExcuseRequest (Validação de entrada)            │  │
│  │  └─ ExcuseResponse (Estrutura de resposta)          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services                                            │  │
│  │  └─ ExcuseGeneratorService                          │  │
│  │     └─ LangChain LCEL Pipeline                      │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ OpenAI API
                     │ (HTTPS)
                     │
┌────────────────────▼────────────────────────────────────────┐
│                 OpenAI GPT-3.5/4                             │
│              (Large Language Model)                          │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 Fluxo de Dados Detalhado

### 1. Geração de Desculpa (Happy Path)

```
[Usuário] 
    ↓ preenche formulário
[ExcuseGenerator Component]
    ↓ handleSubmit()
[API Client]
    ↓ POST /api/generate
[FastAPI Router]
    ↓ validação com Pydantic
[ExcuseRequest Schema] ✓
    ↓ passa para serviço
[ExcuseGeneratorService]
    ↓ constrói prompt
[LangChain Prompt Template]
    ↓ injeta variáveis
[ChatPromptTemplate]
    ↓ envia para LLM
[OpenAI API]
    ↓ processa com GPT
[ChatOpenAI Model]
    ↓ retorna resposta
[StrOutputParser]
    ↓ extrai string
[ExcuseGeneratorService]
    ↓ retorna ao router
[ExcuseResponse Schema]
    ↓ JSON response
[API Client]
    ↓ setResult()
[ResultCard Component]
    ↓ exibe ao usuário
[Usuário] 👍
```

## 🗂️ Estrutura de Diretórios Completa

```
GeradorDesculpas/
│
├── backend/                      # Backend Python/FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # Entry point FastAPI
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py        # Configurações globais
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── endpoints/
│   │   │       ├── __init__.py
│   │   │       └── generator.py # Rotas da API
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── excuse.py        # Modelos Pydantic
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── llm_chain.py     # Lógica LangChain
│   │   └── utils/
│   │       └── __init__.py
│   ├── requirements.txt         # Dependências Python
│   ├── Dockerfile              # Container backend
│   ├── .env.example            # Template de variáveis
│   ├── .gitignore
│   ├── start.bat               # Script Windows
│   └── start.sh                # Script Linux/Mac
│
├── frontend/                    # Frontend React/Vite
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExcuseGenerator.jsx  # Formulário principal
│   │   │   ├── ToneButton.jsx       # Botão de tom
│   │   │   └── ResultCard.jsx       # Card de resultado
│   │   ├── hooks/
│   │   │   └── useClipboard.js      # Hook de clipboard
│   │   ├── lib/
│   │   │   ├── api.js               # Cliente API
│   │   │   └── utils.js             # Utilidades
│   │   ├── App.jsx              # Componente raiz
│   │   ├── main.jsx             # Entry point React
│   │   └── index.css            # Estilos Tailwind
│   ├── index.html               # HTML principal
│   ├── package.json             # Dependências Node
│   ├── vite.config.js           # Config Vite
│   ├── tailwind.config.js       # Config Tailwind
│   ├── postcss.config.js        # Config PostCSS
│   ├── Dockerfile              # Container frontend
│   ├── .env.example            # Template de variáveis
│   ├── .gitignore
│   ├── start.bat               # Script Windows
│   └── start.sh                # Script Linux/Mac
│
├── docker-compose.yml           # Orquestração Docker
├── .env.example                # Variáveis Docker Compose
├── .gitignore                  # Git ignore global
├── README.md                   # Documentação principal
├── QUICKSTART.md               # Guia rápido
└── CUSTOMIZATION.md            # Guia de customização
```

## 🧩 Componentes e Responsabilidades

### Backend

#### 1. **main.py** (Aplicação FastAPI)
- Inicializa a aplicação FastAPI
- Configura CORS
- Registra routers
- Define eventos de startup/shutdown

#### 2. **config.py** (Configurações)
- Carrega variáveis de ambiente
- Define constantes da aplicação
- Configurações do modelo LLM

#### 3. **generator.py** (Endpoints)
- `POST /api/generate`: Gera desculpa
- `GET /api/tones`: Lista tons disponíveis
- `GET /api/roles`: Lista destinatários comuns
- `GET /api/health`: Health check

#### 4. **excuse.py** (Schemas)
- `ExcuseRequest`: Valida entrada do usuário
- `ExcuseResponse`: Estrutura a resposta
- `HealthResponse`: Resposta do health check

#### 5. **llm_chain.py** (Serviço LangChain)
- `ExcuseGeneratorService`: Classe principal
- `_create_prompt_template()`: Cria template psicológico
- `generate_excuse()`: Executa cadeia LCEL

### Frontend

#### 1. **ExcuseGenerator.jsx** (Formulário)
- Gerencia estado do formulário
- Valida inputs localmente
- Faz requisição à API
- Controla loading e erros

#### 2. **ToneButton.jsx** (Botão de Tom)
- Componente reutilizável
- Visual feedback de seleção
- Emojis contextuais

#### 3. **ResultCard.jsx** (Resultado)
- Exibe desculpa gerada
- Botões de ação (Copiar, WhatsApp)
- Feedback visual de sucesso
- Contador de palavras

#### 4. **useClipboard.js** (Hook)
- Copia texto para clipboard
- Feedback temporizado
- Tratamento de erros

#### 5. **api.js** (Cliente API)
- Classe APIClient
- Métodos para todos os endpoints
- Tratamento centralizado de erros

#### 6. **utils.js** (Utilidades)
- Web Share API
- Fallback WhatsApp
- Formatação de dados

## 🔐 Fluxo de Segurança

```
[Request]
    ↓
[CORS Middleware] → Valida origem
    ↓
[Pydantic Validation] → Valida tipos e ranges
    ↓
[Business Logic] → Processa requisição
    ↓
[Rate Limiter*] → (Futuro) Limita requisições
    ↓
[LLM API] → Envia para OpenAI
    ↓
[Guardrails*] → (Futuro) Valida conteúdo
    ↓
[Response]
```

*Não implementado no MVP, mas recomendado para produção

## 🎨 Fluxo de Estilização (Frontend)

```
[Tailwind Classes]
    ↓ processadas por
[PostCSS]
    ↓ gera
[Optimized CSS]
    ↓ servido por
[Vite Dev Server]
```

### Classes Tailwind Principais Usadas:

- **Layout**: `flex`, `grid`, `container`, `space-y-*`
- **Cores**: `bg-indigo-600`, `text-gray-700`
- **Bordas**: `rounded-xl`, `border-gray-200`
- **Sombras**: `shadow-xl`, `shadow-lg`
- **Transições**: `transition-all`, `duration-200`
- **Responsividade**: `sm:`, `md:`, `lg:`

## ⚡ Otimizações de Performance

### Backend
1. **Async/Await**: Todas operações I/O são assíncronas
2. **Connection Pooling**: Conexões HTTP reutilizadas
3. **Pydantic**: Validação rápida em C
4. **ASGI**: Uvicorn com workers múltiplos

### Frontend
1. **Vite**: Build ultra-rápido com esbuild
2. **Code Splitting**: Chunks automáticos
3. **Lazy Loading**: Componentes carregados sob demanda
4. **Tree Shaking**: Remove código não usado

## 📊 Métricas de Performance Esperadas

| Métrica | Valor Esperado |
|---------|---------------|
| Tempo de resposta da API | 2-5 segundos |
| Tamanho do bundle (frontend) | ~150KB (gzipped) |
| First Contentful Paint | <1.5s |
| Time to Interactive | <3s |
| Lighthouse Score | 90+ |

## 🔄 Pipeline de Desenvolvimento

```
[Código Local]
    ↓ git push
[GitHub Repository]
    ↓ webhook
[Vercel (Frontend)] → Build & Deploy
[Render (Backend)] → Build & Deploy
    ↓
[Produção]
```

## 🎯 Pontos de Extensão Futuros

1. **Database Layer**: Adicionar PostgreSQL/MongoDB
2. **Authentication**: JWT + OAuth2
3. **Caching**: Redis para respostas comuns
4. **Queue System**: Celery para processamento assíncrono
5. **Analytics**: Mixpanel/GA4 integração
6. **Monitoring**: Sentry para error tracking
7. **Testing**: Pytest (backend) + Vitest (frontend)

---

**Esta arquitetura foi projetada para ser:**
- 📈 **Escalável**: Fácil adicionar features
- 🔧 **Manutenível**: Código organizado e documentado
- ⚡ **Performática**: Otimizada para baixa latência
- 🔒 **Segura**: Validações em múltiplas camadas
- 🎨 **Extensível**: Arquitetura desacoplada
