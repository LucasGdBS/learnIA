from typing import Type
from app.AIChat.agent_models_enum import AgentModelEnum
from app.AIChat.gemini_agent import GeminiAgent

class AgentFactory:
    _registry: dict[AgentModelEnum, Type] = {
        AgentModelEnum.GEMINI: GeminiAgent,
    }

    @classmethod
    def create(cls, model: AgentModelEnum, apiKey: str):
        agent_class = cls._registry.get(model)
        if not agent_class:
            raise ValueError(f"{model.value} não é suportado")
        return agent_class(apiKey=apiKey, model=model)