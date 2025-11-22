import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { ApiService, StorageService } from "../services/api";
import type { ApiKey, Message } from "../types";

export default function ChatPage() {
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keys = StorageService.getAllApiKeys();
    setApiKeys(keys);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedApiKey || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Preparar mensagens para a API (sem timestamp)
      const apiMessages = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await ApiService.sendMessage(
        selectedApiKey.model,
        selectedApiKey.apiKey,
        apiMessages
      );

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Desculpe, ocorreu um erro ao processar sua mensagem. Verifique sua API key e tente novamente.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm("Tem certeza que deseja limpar o chat?")) {
      setMessages([]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (apiKeys.length === 0) {
    return (
      <div className="min-h-screen bg-[#1e2129] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔑</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Nenhuma API Key Configurada
          </h2>
          <p className="text-white opacity-70 mb-6">
            Você precisa configurar pelo menos uma API key para usar o chat.
          </p>
          <a
            href="/"
            className="bg-[#009485] hover:bg-[#007a6e] text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Configurar API Keys
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#1e2129] flex flex-col">
      {/* Header */}
      <div className="bg-[#2a2d38] shadow-sm border-b border-[#3a3d48] p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Chat IA</h1>

          <div className="flex items-center gap-4">
            <select
              value={selectedApiKey?.id || ""}
              onChange={(e) => {
                const key = apiKeys.find((k) => k.id === e.target.value);
                setSelectedApiKey(key || null);
              }}
              className="px-3 py-2 bg-[#006e63] border border-[#009485] rounded-md focus:outline-none focus:ring-2 focus:ring-[#009485] text-white"
            >
              <option value="">Selecione uma API Key</option>
              {apiKeys.map((key) => (
                <option key={key.id} value={key.id}>
                  {key.name} ({key.model})
                </option>
              ))}
            </select>

            <button
              onClick={clearChat}
              disabled={messages.length === 0}
              className="text-red-400 hover:text-red-300 disabled:text-gray-600 font-medium transition-colors"
            >
              Limpar Chat
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto p-4">
          {!selectedApiKey ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-white opacity-70">
                <div className="text-4xl mb-4">💬</div>
                <p>Selecione uma API Key para começar a conversar</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 ? (
                  <div className="text-center text-white opacity-70 mt-8">
                    <div className="text-4xl mb-4">🚀</div>
                    <p>Comece uma conversa! Digite sua mensagem abaixo.</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-sm lg:max-w-2xl px-4 py-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-[#009485] text-white"
                            : "bg-[#2a2d38] border border-[#3a3d48] shadow-sm"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <div className="text-white text-sm *:text-white h1:text-white h2:text-white h3:text-white p:text-white ul:text-white ol:text-white li:text-white strong:text-white em:text-white code:text-[#009485] code:bg-[#1e2129] code:px-1 code:rounded pre:bg-[#1a1a1a] pre:text-white pre:p-3 pre:rounded a:text-[#009485] blockquote:text-white blockquote:border-l-4 blockquote:border-[#009485] blockquote:pl-4">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                        <p
                          className={`text-xs mt-1 ${
                            message.role === "user"
                              ? "text-white opacity-70"
                              : "text-white opacity-50"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#2a2d38] border border-[#3a3d48] shadow-sm rounded-lg px-4 py-2 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#009485] rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-[#009485] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#009485] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-white opacity-70">
                          Digitando...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSendMessage}
                className="border-t border-[#3a3d48] bg-[#2a2d38] p-4"
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-[#006e63] border border-[#009485] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009485] disabled:bg-gray-700 text-white placeholder-gray-300"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-[#009485] hover:bg-[#007a6e] disabled:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    {isLoading ? "..." : "Enviar"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
