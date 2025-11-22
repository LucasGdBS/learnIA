<!-- markdownlint-disable MD029 -->
# LearnIA - Frontend

Interface web moderna para chat com modelos de IA, construída em React com TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first
- **React Markdown** - Renderização de Markdown
- **React Router DOM** - Roteamento para SPA

## 📁 Estrutura do Projeto

```yaml
frontend/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   └── Navigation.tsx   # Componente de navegação
│   ├── pages/               # Páginas da aplicação
│   │   ├── ApiKeysPage.tsx  # Página de gerenciamento de API keys
│   │   └── ChatPage.tsx     # Página principal do chat
│   ├── services/            # Serviços e APIs
│   │   └── api.ts          # Cliente para comunicação com backend
│   ├── types/              # Definições TypeScript
│   │   └── index.ts        # Interfaces e tipos
│   ├── App.tsx             # Componente raiz
│   ├── main.tsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── public/                 # Arquivos estáticos
├── Dockerfile             # Container Docker
├── nginx.conf            # Configuração Nginx para produção
├── package.json          # Dependências e scripts
├── tailwind.config.js    # Configuração Tailwind
├── tsconfig.json         # Configuração TypeScript
└── vite.config.ts        # Configuração Vite
```

## 🎨 Design System

### Paleta de Cores

```css
/* Cores principais */
--primary: #009485      /* Verde principal */
--primary-dark: #007a6e /* Verde escuro */
--background: #1e2129   /* Fundo escuro */
--surface: #2a2d38      /* Superfícies */
--border: #3a3d48       /* Bordas */
--accent: #006e63       /* Accent */
```

### Componentes de UI

- **Chat Interface**: Design inspirado em aplicativos modernos de mensagens
- **Tema Escuro**: Interface otimizada para longas sessões de trabalho
- **Responsivo**: Adaptável para desktop, tablet e mobile
- **Markdown Support**: Renderização completa de respostas formatadas

## 🏗️ Arquitetura

### Estrutura de Componentes

```yaml
App
├── Navigation
└── Router
    ├── ApiKeysPage (Gerenciamento de chaves)
    └── ChatPage (Interface de chat)
```

### Estado da Aplicação

- **Local Storage**: Persistência de API keys e configurações
- **React State**: Estado da sessão de chat
- **Context API**: Compartilhamento de dados entre componentes

### Serviços

1. **ApiService**: Comunicação com backend
   - `getAvailableModels()`: Lista modelos disponíveis
   - `testApiKey()`: Valida API keys
   - `sendMessage()`: Envia mensagens para IA

2. **StorageService**: Gerenciamento de dados locais
   - `saveApiKey()`: Armazena nova API key
   - `getAllApiKeys()`: Lista todas as chaves
   - `deleteApiKey()`: Remove chave específica

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn

### Instalação

1. **Navegue até o diretório do frontend:**

```bash
cd frontend
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure variáveis de ambiente:**

```bash
# Crie um arquivo .env
VITE_API_URL=http://localhost:8000
```

## 🚀 Execução

### Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Docker

```bash
# Build
docker build -t learnai-frontend .

# Run
docker run -p 80:80 learnai-frontend
```

## 📱 Funcionalidades

### Gerenciamento de API Keys

- ✅ Adicionar múltiplas API keys
- ✅ Validação automática de chaves
- ✅ Suporte a diferentes modelos (Gemini)
- ✅ Exclusão de chaves
- ✅ Persistência local

### Interface de Chat

- ✅ Chat em tempo real com IA
- ✅ Suporte a Markdown nas respostas
- ✅ Histórico de mensagens
- ✅ Indicador de digitação
- ✅ Timestamps das mensagens
- ✅ Limpeza de chat
- ✅ Seleção de modelo/API key

### Prompt de Sistema

- ✅ Prompt de sistema customizado
- ✅ Professor de Tecnologia como persona
- ✅ Respostas didáticas e técnicas
- ✅ Configuração pelo frontend

## 🎯 Experiência do Usuário

### Fluxo Principal

1. **Setup Inicial**: Usuário configura API keys
2. **Seleção**: Escolhe modelo e chave para usar
3. **Chat**: Interage com IA de forma natural
4. **Gerenciamento**: Pode adicionar/remover chaves

### Recursos de UX

- **Loading States**: Indicadores visuais durante requests
- **Error Handling**: Mensagens claras de erro
- **Responsive Design**: Funciona em qualquer dispositivo
- **Keyboard Shortcuts**: Enter para enviar mensagens
- **Auto-scroll**: Scroll automático para novas mensagens

## 🔧 Configurações

### Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#009485',
        'primary-dark': '#007a6e',
        background: '#1e2129',
        surface: '#2a2d38',
        border: '#3a3d48',
        accent: '#006e63'
      }
    }
  }
}
```

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## 📦 Build e Deploy

### Nginx (Produção)

```nginx
server {
    listen 80;
    server_name _;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker Multi-stage

```dockerfile
# Build stage
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testes

### ESLint

```bash
npm run lint
```

### Testes Unitários (Futuro)

```bash
npm run test
```

## 🔄 Próximas Funcionalidades

- [ ] Temas personalizáveis
- [ ] Exportação de conversas
- [ ] Histórico de sessões
- [ ] Upload de arquivos
- [ ] Modo streaming
- [ ] PWA (Progressive Web App)
- [ ] Atalhos de teclado avançados
- [ ] Integração com mais modelos de IA

## 📊 Performance

- **Bundle Size**: Otimizado com tree-shaking
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Lazy loading de recursos
- **Caching**: Estratégias de cache para produção

## 🛡️ Segurança

- **XSS Protection**: Sanitização de conteúdo
- **HTTPS**: Comunicação segura
- **API Keys**: Armazenamento local seguro
- **CORS**: Configuração adequada

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
- A validação da API key é feita diretamente com o provedor
- O chat não mantém histórico entre sessões
