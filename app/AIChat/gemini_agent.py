from google import genai
from google.genai.types import Content, Part
from app.AIChat.agent import Agent


class GeminiAgent(Agent):
    def __init__(self, apiKey, model, initial_prompt=None):
        super().__init__(apiKey, model, initial_prompt)
        self.client = genai.Client(
            api_key=apiKey
        )
    
    def _prepare_contents(self, messages):
        """Converte Message -> formato aceito pelo Gemini."""
        contents = []

        if self.initial_prompt:
            contents.append({"role": "system", "parts": [self.initial_prompt]})

        for msg in messages:
            parts = msg.content if isinstance(msg.content, list) else [msg.content]
            contents.append({"role": msg.role, "parts": parts})

        return contents
    
    def chat(self, messages):
        contents = [
            Content(role=msg.gemini_role, parts=[Part.from_text(text=c) for c in msg.content])
            for msg in messages
        ]

        response = self.client.models.generate_content(
            model=self.model.value,
            contents=contents
        )

        return response.text
