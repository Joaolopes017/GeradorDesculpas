# 🚀 Guia de Deploy para Produção

Este guia detalha como fazer o deploy do Gerador de Desculpas Plausíveis em ambientes de produção.

---

## 📋 Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se de:

- [ ] Ter uma conta OpenAI com API Key ativa
- [ ] Ter configurado limites de gasto na OpenAI
- [ ] Ter testado localmente (backend + frontend)
- [ ] Ter conta no GitHub para versionamento
- [ ] Ter conta na Vercel (frontend)
- [ ] Ter conta no Render (backend)

---

## 🔧 Opção 1: Deploy Híbrido (Recomendado para MVP)

### Frontend na Vercel + Backend no Render

Esta é a configuração **gratuita** e mais simples para MVPs.

---

## 🎨 Deploy do Frontend (Vercel)

### Passo 1: Preparar o Repositório

```bash
# Inicializar git (se ainda não foi feito)
cd GeradorDesculpas
git init
git add .
git commit -m "Initial commit"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/seu-usuario/gerador-desculpas.git
git branch -M main
git push -u origin main
```

### Passo 2: Importar no Vercel

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `gerador-desculpas`
5. Configure:

**Framework Preset**: Vite  
**Root Directory**: `frontend`  
**Build Command**: `npm run build` (detectado automaticamente)  
**Output Directory**: `dist` (detectado automaticamente)  

### Passo 3: Configurar Variáveis de Ambiente

Em **Environment Variables**, adicione:

```
VITE_API_URL=https://seu-backend.onrender.com/api
```

*Nota: Você obterá a URL do backend após fazer o deploy no Render*

### Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde o build (1-2 minutos)
3. Acesse a URL fornecida (ex: `gerador-desculpas.vercel.app`)

### ✅ Frontend Deployado!

Sempre que você fizer `git push`, o Vercel automaticamente rebuilda e deploya.

---

## ⚙️ Deploy do Backend (Render)

### Passo 1: Criar Web Service

1. Acesse https://render.com
2. Faça login com GitHub
3. Clique em "New +" → "Web Service"
4. Conecte o repositório `gerador-desculpas`

### Passo 2: Configurar o Serviço

**Name**: `gerador-desculpas-backend`  
**Region**: Oregon (US West) ou Frankfurt (Europe)  
**Branch**: `main`  
**Root Directory**: `backend`  
**Runtime**: `Python 3`  
**Build Command**: 
```bash
pip install -r requirements.txt
```

**Start Command**:
```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Instance Type**: `Free` (para MVP)

### Passo 3: Configurar Variáveis de Ambiente

Em **Environment Variables**, adicione:

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
MODEL_NAME=gpt-3.5-turbo
MODEL_TEMPERATURE=0.7
MAX_TOKENS=300
DEBUG=False
```

### Passo 4: Deploy

1. Clique em "Create Web Service"
2. Aguarde o build (3-5 minutos)
3. Anote a URL fornecida (ex: `https://gerador-desculpas-backend.onrender.com`)

### Passo 5: Testar Backend

Acesse: `https://seu-backend.onrender.com/api/health`

Você deve ver:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "..."
}
```

### Passo 6: Atualizar Frontend

Volte ao Vercel e atualize a variável de ambiente:

```
VITE_API_URL=https://seu-backend.onrender.com/api
```

Clique em "Redeploy" no Vercel.

### ✅ Backend Deployado!

---

## ⚠️ Importante: Cold Starts no Render (Free Tier)

No plano gratuito do Render, o backend **"dorme"** após 15 minutos de inatividade.

**Consequências:**
- Primeira requisição após inatividade leva 30-60 segundos
- Usuário pode pensar que o app está quebrado

**Soluções:**

### 1. Ping Service (Gratuito)

Use um serviço de cron job para manter o backend ativo:

**Opção A: Cron-Job.org**
1. Acesse https://cron-job.org
2. Crie uma conta gratuita
3. Adicione um job:
   - **URL**: `https://seu-backend.onrender.com/api/health`
   - **Interval**: A cada 10 minutos
   - **Method**: GET

**Opção B: UptimeRobot**
1. Acesse https://uptimerobot.com
2. Adicione um monitor HTTP
3. URL: `https://seu-backend.onrender.com/api/health`
4. Intervalo: 5 minutos

### 2. Upgrade para Plano Pago ($7/mês)

- Sem cold starts
- Instância sempre ativa
- Mais memória e CPU

---

## 🐳 Opção 2: Deploy com Docker (VPS/AWS/GCP)

### Preparação

1. Configure variáveis no arquivo `.env` na raiz:

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
MODEL_NAME=gpt-3.5-turbo
```

2. Build e run:

```bash
docker-compose up -d --build
```

### Deploy em VPS (DigitalOcean, Linode, etc.)

```bash
# No servidor
git clone https://github.com/seu-usuario/gerador-desculpas.git
cd gerador-desculpas

# Criar arquivo .env
echo "OPENAI_API_KEY=sk-..." > .env

# Iniciar com Docker
docker-compose up -d

# Configurar Nginx como reverse proxy
sudo apt install nginx
```

**Configuração Nginx** (`/etc/nginx/sites-available/gerador`):

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend
    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/gerador /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL com Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

---

## ☁️ Opção 3: Deploy na AWS (Avançado)

### Arquitetura

```
Frontend: S3 + CloudFront
Backend: ECS Fargate ou Lambda
Database: RDS PostgreSQL (se adicionar histórico)
```

### 1. Frontend no S3 + CloudFront

```bash
cd frontend
npm run build

# Instalar AWS CLI
aws s3 mb s3://gerador-desculpas-frontend
aws s3 sync dist/ s3://gerador-desculpas-frontend/

# Configurar CloudFront CDN
aws cloudfront create-distribution --origin-domain-name gerador-desculpas-frontend.s3.amazonaws.com
```

### 2. Backend no ECS Fargate

1. Build da imagem Docker
2. Push para ECR (Elastic Container Registry)
3. Criar cluster ECS
4. Criar task definition
5. Criar service

```bash
# Build e push
aws ecr create-repository --repository-name gerador-backend
docker build -t gerador-backend backend/
docker tag gerador-backend:latest AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/gerador-backend:latest
docker push AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/gerador-backend:latest
```

---

## 🔒 Segurança em Produção

### 1. Rate Limiting

Adicione no backend (`app/main.py`):

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@router.post("/generate")
@limiter.limit("10/minute")
async def generate_excuse(...):
    ...
```

### 2. CORS Restrito

Em `backend/app/core/config.py`:

```python
ALLOWED_ORIGINS = [
    "https://seu-dominio.vercel.app",
    "https://seu-dominio.com"
]
```

### 3. Secrets Management

**Render**: Use Environment Variables (já configurado)

**AWS**: Use AWS Secrets Manager
```python
import boto3

client = boto3.client('secretsmanager')
secret = client.get_secret_value(SecretId='openai-api-key')
```

**Docker**: Use Docker Secrets
```bash
echo "sk-proj-xxx" | docker secret create openai_key -
```

### 4. HTTPS Obrigatório

Vercel e Render já fornecem SSL automaticamente.

Para VPS, use Let's Encrypt (mostrado acima).

---

## 📊 Monitoramento e Logging

### 1. Logs Centralizados

**Render**: Logs integrados no dashboard

**AWS**: CloudWatch Logs

**Docker**: 
```bash
docker-compose logs -f
```

### 2. Error Tracking (Sentry)

```bash
pip install sentry-sdk
```

```python
# backend/app/main.py
import sentry_sdk

sentry_sdk.init(
    dsn="https://xxx@xxx.ingest.sentry.io/xxx",
    traces_sample_rate=1.0,
)
```

### 3. Analytics (Opcional)

**Frontend**: Google Analytics ou Mixpanel

```html
<!-- frontend/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 💰 Estimativa de Custos (Produção)

### Configuração Recomendada (Startup/MVP)

| Serviço | Plano | Custo |
|---------|-------|-------|
| Frontend (Vercel) | Free | $0 |
| Backend (Render) | Starter | $7/mês |
| OpenAI API | Pay-as-you-go | $5-20/mês |
| Domínio | Namecheap | $10/ano |
| **Total** | | **~$15-30/mês** |

### Configuração Escalada (Pequena Empresa)

| Serviço | Plano | Custo |
|---------|-------|-------|
| Frontend (Vercel) | Pro | $20/mês |
| Backend (Render) | Standard | $25/mês |
| Database (Render) | PostgreSQL | $7/mês |
| OpenAI API | Pay-as-you-go | $50-100/mês |
| Sentry | Developer | $26/mês |
| **Total** | | **~$130-180/mês** |

---

## 🧪 Testes Pós-Deploy

### Checklist

1. [ ] Frontend carrega sem erros
2. [ ] Health check do backend responde
3. [ ] Geração de desculpa funciona
4. [ ] Copiar para clipboard funciona
5. [ ] Compartilhamento WhatsApp funciona
6. [ ] Formulário valida inputs corretamente
7. [ ] Erros são exibidos ao usuário
8. [ ] Responsividade mobile está OK
9. [ ] HTTPS está ativo
10. [ ] Logs estão sendo capturados

### Script de Teste Automatizado

```bash
#!/bin/bash

echo "Testando deploy..."

# Health check
curl -f https://seu-backend.onrender.com/api/health || exit 1
echo "✓ Backend health OK"

# Teste de geração
curl -f -X POST https://seu-backend.onrender.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"receiver_role":"Teste","event_context":"Teste","severity_level":5,"tone_style":"Profissional"}' \
  || exit 1
echo "✓ Geração de desculpa OK"

# Frontend
curl -f https://seu-frontend.vercel.app || exit 1
echo "✓ Frontend OK"

echo "✓ Todos os testes passaram!"
```

---

## 🔄 CI/CD Automatizado (Opcional)

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      # Testes automatizados
      - name: Test Backend
        run: |
          cd backend
          pip install -r requirements.txt
          pytest
      
      # Deploy automático (Vercel e Render detectam push no main)
      - name: Notify Deploy
        run: echo "Deploy triggered"
```

---

## 📞 Troubleshooting de Deploy

### Erro: "Application Error" no Render

**Causa**: Build falhou ou start command incorreto

**Solução**: 
1. Verifique logs no dashboard do Render
2. Confirme que `requirements.txt` está correto
3. Verifique o start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Erro: "CORS Error" no Frontend

**Causa**: Backend não permite origem do frontend

**Solução**: Adicione URL do Vercel em `ALLOWED_ORIGINS`:

```python
ALLOWED_ORIGINS = [
    "https://seu-app.vercel.app",
]
```

### Erro: "Service Unavailable" (503)

**Causa**: OpenAI API key inválida ou limite excedido

**Solução**: 
1. Verifique a key em render.com → Environment Variables
2. Verifique limites em platform.openai.com/account/limits

### Erro: Cold Start muito lento

**Solução**: Implemente ping service ou upgrade para plano pago

---

## 🎉 Deploy Concluído!

Seu app está no ar! Compartilhe com o mundo:

- 🌐 Frontend: `https://seu-app.vercel.app`
- 🔧 Backend: `https://seu-backend.onrender.com`
- 📚 Docs: `https://seu-backend.onrender.com/docs`

---

**Parabéns pelo deploy! 🚀**
