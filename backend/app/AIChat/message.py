from pydantic import BaseModel, field_validator
from typing import List, Literal

class Message(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: List[str] | str

    @property
    def gemini_role(self):
        return "model" if self.role == "assistant" else self.role
    
    def __repr__(self):
        return f"Message(role={self.role}, content={self.content})"
    
    @field_validator("content", mode="before")
    def ensure_list(cls, v):
        if isinstance(v, str):
            return [v]
        return v