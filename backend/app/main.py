from app.AIChat.agent import Agent
from app.AIChat.message import Message
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.dependencies import get_agent
from app.AIChat.agent_models_enum import AgentModelEnum
from app.settings import Settings

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=Settings.ALLOW_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask", tags=["AI Model"])
async def chat(
    messages: list[Message], 
    agent: Agent = Depends(get_agent)
):
    """
    Chat com IA usando prompt inicial fixo para contexto persistente.
    
    - **messages**: Lista de mensagens da conversa
    - **model**: Modelo de IA (via query parameter)
    - **apiKey**: Chave da API (via body)
    
    O sistema usa um prompt inicial fixo definido internamente.
    """
    try:
        response = agent.chat(messages)
        return {
            "message": response
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get("/agents", tags=["AI Model"])
async def get_agents():
    return AgentModelEnum.list_values()

@app.get("/system-prompt", tags=["AI Model"])
async def get_system_prompt():
    """
    Retorna o prompt inicial fixo do sistema.
    
    Use este prompt como primeira mensagem do tipo 'system' ao iniciar uma conversa.
    """
    
    return {
        "system_prompt": '''
## Prompt de Sistema — Professor de Tecnologia

Você é um professor de tecnologia altamente qualificado, especialista em desenvolvimento de software, arquitetura, infraestrutura, boas práticas, clean code, DevOps, qualidade de software e metodologias modernas.  
Seu papel é ensinar com clareza, precisão e didática.

### Regras gerais do seu comportamento:
1. **Responda sempre com respostas de tamanho médio** — nem curtas demais, nem longas demais.  
   Algo entre **5 e 12 linhas** é o ideal.
2. Explique conceitos com **clareza**, mas sem enrolar.
3. Sempre que possível:
   - Inclua **boas práticas**.
   - Indique **motivações** (“por que isso é assim?”).
   - Mostre exemplos simples quando necessário.
4. Evite jargões complexos sem explicação.
5. Não assuma informação não fornecida pelo usuário.
6. Mantenha sempre um tom **professoral, didático, calmo e confiante**.
7. Caso o usuário peça código, entregue **código limpo e idiomático**.
8. Para perguntas muito abertas, ofereça **contexto + resumo + orientação prática**.

### Objetivo final
Ensinar o usuário com a máxima qualidade técnica, mas de forma acessível.
'''.strip()
    }

@app.get("/", tags=["Info"])
async def root():
    """
    Informações sobre a API de Chat com IA.
    """
    return {
        "message": "API de Chat com IA - Sistema com Prompt Inicial Fixo",
        "description": "Sistema de chat com IA que utiliza um prompt inicial fixo otimizado para assistência em programação e tecnologia",
        "usage": {
            "endpoint": "/ask",
            "method": "POST", 
            "query_params": {
                "model": "Modelo de IA (ex: gemini)"
            },
            "body": {
                "apiKey": "Sua chave da API",
                "messages": "Lista de mensagens da conversa"
            },
            "example": {
                "messages": [
                    {"role": "user", "content": "Como criar uma função em Python?"}
                ]
            }
        },
        "features": [
            "Prompt inicial fixo otimizado para programação",
            "Contexto persistente durante toda a conversa",
            "Respostas técnicas e didáticas",
            "Suporte a múltiplos modelos de IA"
        ]
    }