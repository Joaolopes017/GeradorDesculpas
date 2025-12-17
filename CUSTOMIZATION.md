# Guia de Melhorias e Customizações

## 🎨 Customizações de Prompt

### Modificar o Tom das Desculpas

Edite `backend/app/services/llm_chain.py`:

```python
# Adicione um novo tom na seção TOM DRAMÁTICO:

TOM HUMORÍSTICO:
- Linguagem leve e bem-humorada
- Uso de piadas sutis (não ofensivas)
- Tom descontraído
- Ex: "Fala sério, dessa vez foi épico o azar aqui! 😅"
```

### Adicionar Novos Tipos de Destinatários

Edite `backend/app/api/endpoints/generator.py`:

```python
@router.get("/roles")
async def get_common_roles():
    return {
        "roles": [
            "Chefe",
            # ... existentes ...
            "Terapeuta",  # Adicione novos
            "Personal Trainer",
            "Veterinário"
        ]
    }
```

### Ajustar a Temperatura do Modelo

No arquivo `backend/.env`:

```bash
# Valores menores = mais conservador e previsível
MODEL_TEMPERATURE=0.5

# Valores maiores = mais criativo e variado
MODEL_TEMPERATURE=0.9
```

## 🎯 Melhorias de Performance

### 1. Cache de Respostas Comuns

Adicione em `backend/app/services/llm_chain.py`:

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_cached_excuse(receiver_role, event_context, severity_level, tone_style):
    # Implementar lógica de cache
    pass
```

### 2. Rate Limiting

Instale e configure SlowAPI:

```bash
pip install slowapi
```

Em `backend/app/main.py`:

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@router.post("/generate")
@limiter.limit("10/minute")
async def generate_excuse(request: Request, data: ExcuseRequest):
    # ... código existente
```

## 🌟 Novas Funcionalidades

### 1. Histórico de Desculpas

**Backend** - Adicione em `backend/app/services/history.py`:

```python
from typing import List
from datetime import datetime

class ExcuseHistory:
    def __init__(self):
        self.history: List[dict] = []
    
    def add(self, excuse: dict):
        self.history.append({
            **excuse,
            "timestamp": datetime.now()
        })
    
    def get_recent(self, limit: int = 10):
        return self.history[-limit:]

history_service = ExcuseHistory()
```

**Frontend** - Adicione novo componente `HistoryList.jsx`:

```jsx
export function HistoryList({ items }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Desculpas Recentes</h3>
      {items.map((item, i) => (
        <div key={i} className="p-3 bg-gray-50 rounded">
          <p className="text-sm">{item.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Modo Escuro

Em `frontend/src/App.jsx`:

```jsx
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Adicione botão de toggle */}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        {/* ... resto do código */}
      </div>
    </div>
  );
}
```

Configure Tailwind para dark mode em `tailwind.config.js`:

```js
export default {
  darkMode: 'class',
  // ... resto da config
}
```

### 3. Integração com Telegram

Adicione em `frontend/src/lib/utils.js`:

```javascript
export function shareToTelegram(text) {
  const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
```

Adicione botão em `ResultCard.jsx`:

```jsx
<button onClick={() => shareToTelegram(excuse.content)}>
  📱 Telegram
</button>
```

## 🔧 Trocar o Modelo de IA

### Usar GPT-4 (Mais Inteligente, Mais Caro)

Em `backend/.env`:

```bash
MODEL_NAME=gpt-4
MAX_TOKENS=400
```

### Usar Llama 3 Local (Gratuito, Offline)

1. Instale Ollama: https://ollama.ai
2. Baixe o modelo: `ollama pull llama3`
3. Modifique `backend/app/services/llm_chain.py`:

```python
from langchain_community.llms import Ollama

self.llm = Ollama(
    model="llama3",
    temperature=settings.MODEL_TEMPERATURE
)
```

### Usar Claude (Anthropic)

```bash
pip install langchain-anthropic
```

```python
from langchain_anthropic import ChatAnthropic

self.llm = ChatAnthropic(
    model="claude-3-sonnet-20240229",
    anthropic_api_key=settings.ANTHROPIC_API_KEY
)
```

## 📊 Adicionar Analytics

### Google Analytics

Em `frontend/index.html`:

```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</head>
```

### Mixpanel

```bash
npm install mixpanel-browser
```

```javascript
import mixpanel from 'mixpanel-browser';

mixpanel.init('YOUR_TOKEN');

// Ao gerar desculpa
mixpanel.track('Excuse Generated', {
  tone: formData.tone_style,
  severity: formData.severity_level
});
```

## 🔐 Autenticação de Usuários

Para limitar o uso por usuário:

1. Use Supabase Auth ou Firebase Auth
2. Implemente JWT no backend
3. Adicione middleware de autenticação:

```python
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()

async def verify_token(credentials = Depends(security)):
    # Verificar token JWT
    if not valid_token(credentials.credentials):
        raise HTTPException(status_code=401)
    return user
```

## 🎓 Recursos para Aprender Mais

- **LangChain**: https://python.langchain.com/docs/
- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Prompt Engineering**: https://www.promptingguide.ai/

---

**Continue Desenvolvendo! 🚀**
