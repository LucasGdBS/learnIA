import React, { useState, useEffect } from "react";
import { ApiService, StorageService } from "../services/api";
import type { ApiKey } from "../types";

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    apiKey: "",
  });

  useEffect(() => {
    const loadApiKeys = () => {
      const keys = StorageService.getAllApiKeys();
      setApiKeys(keys);
    };

    const loadAvailableModels = async () => {
      try {
        const models = await ApiService.getAvailableModels();
        setAvailableModels(models);
        if (models.length > 0 && !formData.model) {
          setFormData((prev) => ({ ...prev, model: models[0] }));
        }
      } catch (error) {
        console.error("Erro ao carregar modelos:", error);
      }
    };

    loadApiKeys();
    loadAvailableModels();
  }, [formData.model]);

  const loadApiKeys = () => {
    const keys = StorageService.getAllApiKeys();
    setApiKeys(keys);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.apiKey.trim()) return;

    setIsLoading(true);
    try {
      // Testar a API key antes de salvar
      const isValid = await ApiService.testApiKey(
        formData.model,
        formData.apiKey
      );

      if (!isValid) {
        alert("API Key inválida para este modelo");
        return;
      }

      const newApiKey: ApiKey = {
        id: crypto.randomUUID(),
        name: formData.name,
        model: formData.model,
        apiKey: formData.apiKey,
        createdAt: new Date(),
      };

      StorageService.saveApiKey(newApiKey);
      loadApiKeys();
      setFormData({ name: "", model: availableModels[0] || "", apiKey: "" });
      setShowForm(false);
      alert("API Key salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar API key:", error);
      alert("Erro ao validar API key");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta API key?")) {
      StorageService.deleteApiKey(id);
      loadApiKeys();
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciar API Keys
          </h1>
          <p className="text-gray-600">
            Adicione e gerencie suas chaves de API para diferentes modelos de IA
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? "Cancelar" : "Adicionar Nova API Key"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Nova API Key</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome da Configuração
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Minha chave do Gemini"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Modelo
                </label>
                <select
                  id="model"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, model: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="apiKey"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={formData.apiKey}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, apiKey: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sua API key"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {isLoading ? "Testando..." : "Salvar API Key"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">API Keys Salvas</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {apiKeys.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Nenhuma API key configurada ainda.
              </div>
            ) : (
              apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{apiKey.name}</h3>
                    <p className="text-sm text-gray-600">
                      Modelo: {apiKey.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      Criado em: {apiKey.createdAt.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-500">
                      ••••••••{apiKey.apiKey.slice(-4)}
                    </div>
                    <button
                      onClick={() => handleDelete(apiKey.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
