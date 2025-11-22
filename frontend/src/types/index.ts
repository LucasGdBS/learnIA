export interface ApiKey {
  id: string;
  name: string;
  model: string;
  apiKey: string;
  createdAt: Date;
}

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  apiKeyId: string;
  messages: Message[];
  createdAt: Date;
}
