from app.AIChat.agent_models_enum import AgentModelEnum
from fastapi import Query, Body
from app.AIChat.agent_factory import AgentFactory

def get_agent(
        model: AgentModelEnum = Query(..., description="Model de IA a ser usado"),
        apiKey: str = Body(..., description="API Key do provedor")
):
    return AgentFactory.create(model, apiKey)