# LearnIA - Chat com IA

## Frontend

Interface web para gerenciar API Keys e conversar com modelos de IA.

### Funcionalidades

#### 1. **Página de API Keys** (`/`)

- Visualizar API keys salvas localmente
- Adicionar novas API keys com validação
- Testar API keys antes de salvar
- Excluir API keys existentes
- Suporte a múltiplos modelos de IA

#### 2. **Página de Chat** (`/chat`)

- Interface de chat em tempo real
- Seleção de API key para a conversa
- Histórico de mensagens na sessão
- Indicador de "digitando" durante processamento
- Função para limpar o chat

### Como usar

1. **Configure suas API Keys**:

   - Acesse a página inicial (`/`)
   - Clique em "Adicionar Nova API Key"
   - Preencha o nome, selecione o modelo e cole sua API key
   - A API key será testada automaticamente antes de salvar

2. **Use o Chat**:
   - Vá para a página de Chat (`/chat`)
   - Selecione uma API key configurada
   - Digite sua mensagem e envie
   - Veja as respostas em tempo real

### Tecnologias utilizadas

- **React** com TypeScript
- **React Router DOM** para navegação
- **Tailwind CSS** para estilização
- **Vite** como bundler
- **LocalStorage** para persistência local

### Executar o projeto

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Configuração

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:8000
```

### Estrutura do projeto

```bash
src/
├── components/         # Componentes reutilizáveis
│   └── Navigation.tsx
├── pages/             # Páginas da aplicação
│   ├── ApiKeysPage.tsx
│   └── ChatPage.tsx
├── services/          # Serviços de API e Storage
│   └── api.ts
├── types/             # Tipos TypeScript
│   └── index.ts
├── App.tsx            # Componente principal
└── main.tsx           # Entry point
```

## Notas importantes

- As API keys são armazenadas apenas no navegador (localStorage)
- Nenhuma informação sensível é enviada para servidores externos
- A validação da API key é feita diretamente com o provedor
- O chat não mantém histórico entre sessões
