# 📚 Exemplos de Uso da API

## Testando a API com cURL

### 1. Health Check

```bash
curl http://localhost:8000/api/health
```

**Resposta:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000000"
}
```

### 2. Listar Tons Disponíveis

```bash
curl http://localhost:8000/api/tones
```

**Resposta:**
```json
{
  "tones": [
    {
      "value": "Profissional",
      "label": "Profissional",
      "description": "Formal e polido, ideal para contextos de trabalho",
      "emoji": "💼"
    },
    {
      "value": "Casual",
      "label": "Casual",
      "description": "Descontraído e direto, para amigos e conhecidos",
      "emoji": "😎"
    }
  ]
}
```

### 3. Gerar Desculpa - Cenário Profissional

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_role": "Chefe",
    "event_context": "Reunião de status mensal",
    "severity_level": 8,
    "tone_style": "Profissional",
    "user_hint": "problema no transporte público"
  }'
```

**Resposta:**
```json
{
  "content": "Prezado [nome], peço desculpas pelo inconveniente. Infelizmente, tive um problema inesperado com o transporte público que me impossibilitou de chegar a tempo para a reunião. Comprometo-me a revisar a ata assim que disponível e alinhar os próximos passos ainda hoje.",
  "generated_at": "2024-01-15T10:35:22.123456",
  "tone_used": "Profissional",
  "word_count": 42
}
```

### 4. Gerar Desculpa - Cenário Casual

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_role": "Amigo",
    "event_context": "Happy hour depois do trabalho",
    "severity_level": 3,
    "tone_style": "Casual"
  }'
```

**Resposta:**
```json
{
  "content": "Fala mano! Cara, deu um problema aqui que não tinha como prever 😅 Não vou conseguir colar no happy hour hoje. Bora marcar pra semana que vem?",
  "generated_at": "2024-01-15T10:36:15.789012",
  "tone_used": "Casual",
  "word_count": 28
}
```

### 5. Gerar Desculpa - Cenário Afetivo

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_role": "Namorada",
    "event_context": "Jantar romântico de aniversário",
    "severity_level": 10,
    "tone_style": "Afetivo",
    "user_hint": "emergência familiar"
  }'
```

**Resposta:**
```json
{
  "content": "Amor, sinto muitíssimo mesmo por isso 😔 Tive uma emergência familiar urgente que surgiu de última hora e precisei resolver imediatamente. Sei o quanto esse jantar era importante e o quanto você estava esperando. Posso compensar no fim de semana com algo muito especial? Te amo ❤️",
  "generated_at": "2024-01-15T10:37:42.345678",
  "tone_used": "Afetivo",
  "word_count": 52
}
```

### 6. Gerar Desculpa - Cenário Dramático

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_role": "Cliente Importante",
    "event_context": "Apresentação de proposta comercial",
    "severity_level": 9,
    "tone_style": "Dramático",
    "user_hint": "problema de saúde súbito"
  }'
```

**Resposta:**
```json
{
  "content": "Peço sinceras desculpas pelo ocorrido. Infelizmente, fui acometido por um problema de saúde súbito que me impossibilitou completamente de comparecer à apresentação. Compreendo a gravidade da situação e estou tomando todas as providências para reagendar com a máxima urgência. Fico à disposição para alinharmos uma nova data o quanto antes.",
  "generated_at": "2024-01-15T10:38:19.901234",
  "tone_used": "Dramático",
  "word_count": 58
}
```

## Testando com Python (Requests)

### Instalação

```bash
pip install requests
```

### Script de Teste

```python
import requests
import json

# Configuração
BASE_URL = "http://localhost:8000/api"

def test_health():
    """Testa o health check"""
    response = requests.get(f"{BASE_URL}/health")
    print("Health Check:", response.json())
    return response.status_code == 200

def test_generate_excuse():
    """Gera uma desculpa de exemplo"""
    payload = {
        "receiver_role": "Professor",
        "event_context": "Prova de matemática",
        "severity_level": 6,
        "tone_style": "Profissional",
        "user_hint": "fiquei doente"
    }
    
    response = requests.post(
        f"{BASE_URL}/generate",
        json=payload,
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 200:
        result = response.json()
        print("\n" + "="*50)
        print("DESCULPA GERADA:")
        print("="*50)
        print(f"\n{result['content']}\n")
        print(f"Tom: {result['tone_used']}")
        print(f"Palavras: {result['word_count']}")
        print("="*50)
        return True
    else:
        print(f"Erro: {response.status_code}")
        print(response.json())
        return False

def test_all_tones():
    """Testa todos os tons disponíveis"""
    tones_response = requests.get(f"{BASE_URL}/tones")
    tones = tones_response.json()["tones"]
    
    for tone in tones:
        print(f"\nTestando tom: {tone['label']} {tone['emoji']}")
        payload = {
            "receiver_role": "Colega de Trabalho",
            "event_context": "Almoço de equipe",
            "severity_level": 5,
            "tone_style": tone["value"]
        }
        
        response = requests.post(f"{BASE_URL}/generate", json=payload)
        if response.status_code == 200:
            print(f"✓ {tone['label']}: {response.json()['content'][:50]}...")
        else:
            print(f"✗ Erro ao testar {tone['label']}")

if __name__ == "__main__":
    print("Iniciando testes da API...\n")
    
    # Teste 1: Health Check
    print("1. Testando Health Check...")
    if test_health():
        print("✓ Health check OK\n")
    
    # Teste 2: Gerar Desculpa
    print("2. Testando Geração de Desculpa...")
    test_generate_excuse()
    
    # Teste 3: Todos os Tons
    print("\n3. Testando Todos os Tons...")
    test_all_tones()
    
    print("\n✓ Testes concluídos!")
```

### Executar

```bash
python test_api.py
```

## Testando com JavaScript (Fetch)

```javascript
// Configuração
const BASE_URL = 'http://localhost:8000/api';

// Health Check
async function testHealth() {
  const response = await fetch(`${BASE_URL}/health`);
  const data = await response.json();
  console.log('Health:', data);
}

// Gerar Desculpa
async function generateExcuse() {
  const payload = {
    receiver_role: 'Chefe',
    event_context: 'Reunião matinal',
    severity_level: 7,
    tone_style: 'Profissional',
    user_hint: 'trânsito'
  };

  const response = await fetch(`${BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log('Desculpa:', data.content);
  console.log('Palavras:', data.word_count);
}

// Executar testes
testHealth();
generateExcuse();
```

## Testando com Postman

### 1. Importar Coleção

Crie uma nova coleção no Postman com os seguintes requests:

#### Request 1: Health Check
- **Method**: GET
- **URL**: `http://localhost:8000/api/health`

#### Request 2: Gerar Desculpa Profissional
- **Method**: POST
- **URL**: `http://localhost:8000/api/generate`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "receiver_role": "Chefe",
  "event_context": "Reunião importante",
  "severity_level": 8,
  "tone_style": "Profissional",
  "user_hint": "problema de saúde"
}
```

#### Request 3: Listar Tons
- **Method**: GET
- **URL**: `http://localhost:8000/api/tones`

#### Request 4: Listar Roles
- **Method**: GET
- **URL**: `http://localhost:8000/api/roles`

## Testes de Validação (Casos de Erro)

### Teste 1: Campo obrigatório faltando

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_role": "Chefe",
    "severity_level": 5,
    "tone_style": "Profissional"
  }'
```

**Resposta Esperada (422):**
```json
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "event_context"],
      "msg": "Field required",
      "input": {...}
    }
  ]
}
```

### Teste 2: Severidade fora do range

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_role": "Chefe",
    "event_context": "Reunião",
    "severity_level": 15,
    "tone_style": "Profissional"
  }'
```

**Resposta Esperada (422):**
```json
{
  "detail": [
    {
      "type": "less_than_equal",
      "loc": ["body", "severity_level"],
      "msg": "Input should be less than or equal to 10"
    }
  ]
}
```

### Teste 3: Tom inválido

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_role": "Chefe",
    "event_context": "Reunião",
    "severity_level": 5,
    "tone_style": "TomInexistente"
  }'
```

**Resposta Esperada (422):**
```json
{
  "detail": [
    {
      "type": "value_error",
      "loc": ["body", "tone_style"],
      "msg": "Tom deve ser um dos seguintes: Profissional, Casual, Afetivo, Dramático"
    }
  ]
}
```

## Medindo Performance

### Script de Benchmark

```python
import requests
import time
import statistics

BASE_URL = "http://localhost:8000/api"

def benchmark_api(iterations=10):
    times = []
    
    payload = {
        "receiver_role": "Chefe",
        "event_context": "Reunião",
        "severity_level": 5,
        "tone_style": "Profissional"
    }
    
    for i in range(iterations):
        start = time.time()
        response = requests.post(f"{BASE_URL}/generate", json=payload)
        end = time.time()
        
        if response.status_code == 200:
            elapsed = end - start
            times.append(elapsed)
            print(f"Request {i+1}: {elapsed:.2f}s")
    
    print(f"\n{'='*40}")
    print(f"Média: {statistics.mean(times):.2f}s")
    print(f"Mediana: {statistics.median(times):.2f}s")
    print(f"Min: {min(times):.2f}s")
    print(f"Max: {max(times):.2f}s")
    print(f"{'='*40}")

benchmark_api()
```

## Exemplos de Integração

### React

```jsx
import { useState } from 'react';

function ExcuseForm() {
  const [excuse, setExcuse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiver_role: 'Chefe',
          event_context: 'Reunião',
          severity_level: 5,
          tone_style: 'Profissional'
        })
      });

      const data = await response.json();
      setExcuse(data.content);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Desculpa'}
      </button>
      {excuse && <p>{excuse}</p>}
    </div>
  );
}
```

### Node.js Express

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.post('/excuse', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8000/api/generate', {
      receiver_role: req.body.receiver_role,
      event_context: req.body.event_context,
      severity_level: req.body.severity_level,
      tone_style: req.body.tone_style
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

---

**💡 Dica**: Use a documentação interativa em `http://localhost:8000/docs` para testar a API diretamente no navegador!
