from google import genai
from google.genai.types import Content, Part
from app.AIChat.agent import Agent
from app.AIChat.message import Message
from google.genai.errors import ClientError
from typing import List


class GeminiAgent(Agent):
    def __init__(self, apiKey, model, initial_prompt=None):
        super().__init__(apiKey, model, initial_prompt)
        self.client = genai.Client(
            api_key=apiKey
        )
    
    def chat(self, messages: List[Message]):
        try:
            contents = [
                Content(role=msg.gemini_role, parts=[Part.from_text(text=c) for c in msg.content])
                for msg in messages
            ]

            response = self.client.models.generate_content(
                model=self.model.value,
                contents=contents
            )

            return response.text
        except ClientError:
            raise
