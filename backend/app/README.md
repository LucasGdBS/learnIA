<!-- markdownlint-disable MD029 -->
# LearnIA - Backend API

API REST para chat com modelos de IA, desenvolvida em FastAPI com arquitetura modular e suporte a múltiplos provedores de IA.

## 🚀 Tecnologias Utilizadas

- **FastAPI** - Framework web moderno e rápido para Python
- **Google Gemini API** - Integração com modelos de IA do Google
- **Uvicorn** - Servidor ASGI para aplicações Python
- **Python 3.14+** - Linguagem de programação
- **UV** - Gerenciador de pacotes e dependências Python

## 📁 Estrutura do Projeto

```bash
backend/
├── app/
│   ├── AIChat/                 # Módulo principal de IA
│   │   ├── agent.py           # Classe base abstrata para agentes
│   │   ├── agent_factory.py   # Factory para criação de agentes
│   │   ├── agent_models_enum.py # Enum com modelos disponíveis
│   │   ├── gemini_agent.py    # Implementação do agente Gemini
│   │   └── message.py         # Model Pydantic para mensagens
│   ├── dependencies.py        # Dependências do FastAPI
│   ├── main.py               # Aplicação principal FastAPI
│   └── settings.py           # Configurações de variáveis de ambiente da aplicação
├── Dockerfile                # Container Docker
└── pyproject.toml           # Configuração do projeto Python
```

## 🏗️ Arquitetura

O backend utiliza o padrão **Factory** para criar agentes de IA e o padrão **Strategy** para diferentes implementações de modelos:

### Componentes Principais

1. **Agent (Classe Abstrata)**: Define a interface comum para todos os agentes de IA
2. **AgentFactory**: Responsável pela criação de instâncias de agentes específicos
3. **GeminiAgent**: Implementação concreta para o modelo Google Gemini
4. **Message**: Model Pydantic para validação e serialização de mensagens
5. **AgentModelEnum**: Enum que define os modelos de IA disponíveis

### Fluxo de Dados

```bash
Cliente → FastAPI → AgentFactory → GeminiAgent → Google Gemini API → Resposta
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Python 3.14 ou superior
- UV (gerenciador de pacotes)

### Instalação

1. **Navegue até o diretório do backend:**

```bash
cd backend
```

2. **Instale as dependências:**

```bash
uv sync
```

3. **Configure as variáveis de ambiente:**

```bash
# Crie um arquivo .env (opcional)
ALLOW_HOSTS=["http://localhost:3000","https://yourdomain.com"]
```

## 🚀 Execução

### Desenvolvimento

```bash
# Com UV
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Ou diretamente
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Produção

```bash
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Docker

```bash
# Build
docker build -t learnai-backend .

# Run
docker run -p 8000:8000 learnai-backend -e ALLOW_HOSTS=["http://localhost:3000"]
```

## 📋 Endpoints da API

### `POST /ask`

Envia mensagens para o modelo de IA selecionado.
**Query Parameters:**

- `model` (required): Modelo de IA (ex: `gemini`)

**Body:**

```json

{
  "apiKey": "sua-api-key",
  "messages": [
    {
      "role": "user", 
      "content": "Sua pergunta aqui"
    }
  ]
}
```

**Response:**

```json
{
  "message": "Resposta do modelo de IA"
}
```

### `GET /agents`

Lista todos os modelos de IA disponíveis.

**Response:**

```json
["gemini"]
```

### `GET /system-prompt`

Retorna o prompt de sistema padrão usado pela aplicação.

**Response:**

```json
{
  "system_prompt": "## Prompt de Sistema — Professor de Tecnologia\n..."
}
```

## 🧪 Testes e Qualidade de Código

### Linting

```bash
# Verificar código com Ruff
uvx ruff check .

# Corrigir problemas automaticamente
uvx ruff check . --fix
```

### Testes (Em desenvolvimento)

```bash
# Executar testes (quando implementados)
uv run pytest
```

## 🔌 Adicionando Novos Modelos de IA

Para adicionar suporte a um novo modelo:

1. **Adicione o modelo ao enum:**

```python
# agent_models_enum.py
class AgentModelEnum(Enum):
    GEMINI = "gemini"
    NOVO_MODEL = "novo_model"  # Adicione aqui
```

2. **Crie a implementação do agente:**

```python
# novo_model_agent.py
from app.AIChat.agent import Agent

class NovoModelAgent(Agent):
    def chat(self, messages: List[Message]) -> str:
        # Implementar integração com o novo modelo
        pass
```

3. **Registre no factory:**

```python
# agent_factory.py
class AgentFactory:
    _registry = {
        AgentModelEnum.GEMINI: GeminiAgent,
        AgentModelEnum.NOVO_MODEL: NovoModelAgent,  # Adicione aqui
    }
```

## 🛡️ Segurança

- **CORS**: Configurado para aceitar apenas origens autorizadas
- **Validação**: Todas as entradas são validadas com Pydantic
- **API Keys**: Gerenciadas pelo frontend e não armazenadas no backend

## 🐳 Docker

O backend está containerizado e pronto para deploy:

```dockerfile
FROM python:3.14-slim
WORKDIR /app
COPY . .
RUN pip install uv && uv sync
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📝 Logs

O sistema utiliza logs estruturados para monitoramento:

- Requisições HTTP
- Erros de integração com APIs
- Validações de dados
- Performance de requests

## ⚡ Performance

- **Async/Await**: Suporte completo a operações assíncronas
- **Streaming**: Preparado para respostas em stream (futuro)
- **Connection Pooling**: Reutilização de conexões HTTP
- **Validação Eficiente**: Pydantic para serialização rápida

## 🔄 Próximas Funcionalidades

- [ ] Implementação de testes automatizados
- [ ] Suporte a streaming de respostas
- [ ] Integração com OpenAI GPT
- [ ] Sistema de rate limiting
- [ ] Métricas e observabilidade
- [ ] Cache de respostas
