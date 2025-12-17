# Plausible Excuse Generator

Contextualized excuse generation system using LangChain and OpenAI GPT-3.5-turbo.

## Description

Web application that generates plausible excuses based on Attribution Theory principles and social psychology. The system adapts tone and content according to the recipient and provided context.

## Technologies

**Backend:**
- Python 3.11
- FastAPI
- LangChain
- OpenAI API

**Frontend:**
- React 18
- Vite
- Tailwind CSS

## Features

- 6 different tones: Professional, Casual, Affectionate, Dramatic, Young, Absurd
- Severity adjustment (1-10)
- Multi-language support (PT-PT, PT-BR, EN-US)
- Toggle emojis on/off
- Optional mature language mode (+18)
- Additional context field for specific constraints

## Installation

### Requirements
- Docker and Docker Compose
- OpenAI API Key

### Setup

1. Clone the repository
```bash
git clone https://github.com/Joaolopes017/GeradorDesculpas.git
cd GeradorDesculpas
```

2. Configure API key
```bash
cp .env.example .env
```
Edit `.env` and add your OpenAI key:
```
OPENAI_API_KEY=your_key_here
```

3. Start with Docker
```bash
docker-compose up -d --build
```

4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── api/endpoints/     # FastAPI endpoints
│   │   ├── core/              # Configuration
│   │   ├── schemas/           # Pydantic models
│   │   └── services/          # LangChain logic
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # Utilities and API client
│   └── package.json
└── docker-compose.yml
```

## API Usage

### Generate Excuse

```bash
POST /api/generate
Content-Type: application/json

{
  "receiver_role": "Boss",
  "event_context": "Important meeting",
  "severity_level": 7,
  "tone_style": "Profissional",
  "language": "en-US",
  "use_emojis": false,
  "allow_mature_content": false
}
```

### Response

```json
{
  "content": "Dear Sir/Madam, unfortunately I had an unavoidable situation that prevented me from attending the meeting...",
  "tone_used": "Profissional",
  "word_count": 28
}
```

## Development

### Local backend (without Docker)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Local frontend (without Docker)

```bash
cd frontend
npm install
npm run dev
```

## LangChain Implementation

The system uses LangChain Expression Language (LCEL) to build a processing chain:

```python
chain = prompt_template | llm | StrOutputParser()
```

The prompt is structured with instructions based on Attribution Theory, ensuring that excuses:
- Present external locus of control
- Demonstrate good initial intention
- Are concise and natural
- Adapt to the specified tone

## License

MIT License - see LICENSE for details.

## Author

João Lopes ([@joaolopes017](https://github.com/joaolopes017))
