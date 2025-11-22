import type { ApiKey, Message } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export class ApiService {
  static async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/agents`);
      if (!response.ok) {
        throw new Error("Falha ao buscar modelos disponíveis");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
      throw error;
    }
  }

  static async testApiKey(model: string, apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/ask?model=${model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello" }],
          apiKey,
        }),
      });
      return response.ok;
    } catch (error) {
      console.error("Erro ao testar API key:", error);
      return false;
    }
  }

  static async sendMessage(
    model: string,
    apiKey: string,
    messages: Pick<Message, "role" | "content">[]
  ): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/ask?model=${model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          apiKey,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Erro ao enviar mensagem");
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw error;
    }
  }
}

export class StorageService {
  private static STORAGE_KEY = "learnIA_apiKeys";

  static saveApiKey(apiKey: ApiKey): void {
    const apiKeys = this.getAllApiKeys();
    apiKeys.push(apiKey);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(apiKeys));
  }

  static getAllApiKeys(): ApiKey[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];

    return JSON.parse(data).map(
      (key: Omit<ApiKey, "createdAt"> & { createdAt: string }) => ({
        ...key,
        createdAt: new Date(key.createdAt),
      })
    );
  }

  static deleteApiKey(id: string): void {
    const apiKeys = this.getAllApiKeys().filter((key) => key.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(apiKeys));
  }

  static getApiKeyById(id: string): ApiKey | null {
    const apiKeys = this.getAllApiKeys();
    return apiKeys.find((key) => key.id === id) || null;
  }
}
