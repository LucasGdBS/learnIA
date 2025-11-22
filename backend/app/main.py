from app.AIChat.agent import Agent
from app.AIChat.message import Message
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.dependencies import get_agent
from app.AIChat.agent_models_enum import AgentModelEnum
<<<<<<< HEAD
from app.settings import Settings
=======
from settings import Settings
>>>>>>> f93cb51d22004d7c1a150af41159423b57038f01

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
async def chat(messages: list[Message], agent: Agent = Depends(get_agent)):
    try:
        response = agent.chat(messages)
        return {
            "message" : response
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get("/agents", tags=["AI Model"])
async def get_agents():
    return AgentModelEnum.list_values()