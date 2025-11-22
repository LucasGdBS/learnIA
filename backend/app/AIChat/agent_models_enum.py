from enum import Enum

class AgentModelEnum(Enum):
    GPT = "OpenAi GPT-4"
    GEMINI = "gemini-2.5-flash"

    def __str__(self):
        return self.value
    
    @classmethod
    def list_values(cls):
        return [m.value for m in cls]
    
    @classmethod
    def list_names(cls):
        return [m.name for m in cls]
    
    @classmethod
    def to_dict(cls):
        return {m.name: m.value for m in cls}
