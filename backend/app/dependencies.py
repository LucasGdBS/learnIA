from app.AIChat.agent_models_enum import AgentModelEnum
from fastapi import Query, Body, HTTPException, status
from app.AIChat.agent_factory import AgentFactory

def get_agent(
        model: AgentModelEnum = Query(..., description="Modelo de IA a ser usado"),
        apiKey: str = Body(..., description="API Key do provedor")
):
    try:
        return AgentFactory.create(model, apiKey)
    except NotImplementedError as e:
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))