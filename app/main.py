from app.AIChat.agent import Agent
from app.AIChat.message import Message
from fastapi import FastAPI, Depends, HTTPException, status
from app.dependencies import get_agent
from app.AIChat.agent_models_enum import AgentModelEnum

app = FastAPI()

@app.post("/", tags=["AI Model"])
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