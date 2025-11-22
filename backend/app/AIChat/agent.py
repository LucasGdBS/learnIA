from abc import ABC, abstractmethod
from app.AIChat.message import Message
from typing import List
from app.AIChat.agent_models_enum import AgentModelEnum

class Agent(ABC):
    def __init__(self, apiKey: str, model: AgentModelEnum, initial_prompt = None):
        self.apiKey = apiKey
        self.initial_prompt = initial_prompt
        self.model = model
    
    @abstractmethod
    def chat(self, messages: List[Message]) -> str:
        """Recebe uma lista de mensagens (ex: [{'role': 'user', 'content': 'Olá'}])
        e retorna a resposta do modelo."""
        pass

    def __str__(self) -> str:
        """Retorna o nome do agente (ex: 'OpenAI GPT-4')."""
        return self.model.name

    def __repr__(self):
        return f"<{self.__class__.__name__} model={self.model}>"
    

