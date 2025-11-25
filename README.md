# Financial Wallet - Frontend

Uma aplicação frontend completa para carteira financeira digital, onde usuários podem se cadastrar, autenticar, depositar dinheiro, transferir saldo para outros usuários e reverter operações quando necessário.

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Next.js** | 16.x | Framework React com SSR/SSG, otimização de performance e roteamento automático |
| **React** | 19.x | Biblioteca para construção de interfaces com Server Components e Concurrent Features |
| **TypeScript** | 5.9.x | Tipagem estática para maior segurança e manutenibilidade do código |
| **Styled Components** | 6.x | CSS-in-JS para estilização componentizada e dinâmica |
| **React Query** | 5.x | Gerenciamento de estado do servidor com cache inteligente e sincronização |
| **React Hook Form** | 7.x | Gerenciamento de formulários com validação performática |
| **Zod** | 4.x | Validação de schemas com inferência de tipos TypeScript |
| **AWS Amplify** | 6.x | Autenticação segura com Amazon Cognito |
| **Axios** | 1.x | Cliente HTTP com interceptors para requisições à API |

## 📋 Funcionalidades

### Autenticação
- ✅ Cadastro de usuários com validação de dados
- ✅ Confirmação de email via código
- ✅ Login com autenticação segura (AWS Cognito)
- ✅ Recuperação de senha
- ✅ Logout com limpeza de sessão

### Carteira
- ✅ Visualização de saldo (com toggle de visibilidade)
- ✅ Depósito de valores
- ✅ Transferência entre usuários
- ✅ Histórico de transações
- ✅ Reversão de transferências

### UX/UI
- ✅ Feedback visual de operações (loading, sucesso, erro)
- ✅ Validação em tempo real nos formulários
- ✅ Interface responsiva
- ✅ Proteção de rotas autenticadas

## 🏗️ Arquitetura

```
src/
├── components/          # Componentes reutilizáveis (Button, Input, Modal, etc.)
├── config/              # Configurações de ambiente
├── hooks/               # Custom hooks (useAuth, useUser, useWallet)
├── interfaces/          # Definições de tipos TypeScript
├── lib/                 # Validações Zod e utilitários
├── pages/               # Rotas da aplicação (Pages Router)
│   ├── auth/            # Páginas de autenticação
│   ├── dashboard.tsx    # Dashboard principal
│   ├── deposit.tsx      # Página de depósito
│   └── transfer.tsx     # Página de transferência
├── services/            # Camada de acesso a dados (API services)
├── styles/              # Estilos globais e por página
└── utils/               # Funções utilitárias (formatters, cookies)
```

### Padrões e Princípios Aplicados

- **Separation of Concerns**: Lógica de negócio separada dos componentes UI
- **Custom Hooks**: Encapsulamento de lógica reutilizável (useAuth, useUser, useWallet)
- **Service Layer**: Abstração das chamadas à API em serviços dedicados
- **Component Composition**: Componentes pequenos e focados em responsabilidade única
- **Type Safety**: Tipagem forte em toda a aplicação com TypeScript
- **Form Validation**: Validação centralizada com Zod schemas

## 🔐 Segurança

- Autenticação via AWS Cognito (OAuth 2.0 / JWT)
- Tokens armazenados em cookies HTTP
- Validação de entrada em todos os formulários
- Proteção de rotas com verificação de sessão
- Sanitização de dados antes de envio à API

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ 
- Yarn ou npm
- Backend da aplicação rodando

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3003/v1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your_client_id
NEXT_PUBLIC_COGNITO_REGION=us-east-2
```

### Instalação

```bash
# Instalar dependências
yarn install

# Rodar em desenvolvimento
yarn dev

# Build para produção
yarn build

# Rodar em produção
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura de Componentes

| Componente | Descrição |
|------------|-----------|
| `Button` | Botão reutilizável com variantes (primary, success, danger, outline) |
| `Input` | Campo de entrada com suporte a estados de erro |
| `Card` | Container estilizado para conteúdo |
| `Modal` | Dialog modal para confirmações |
| `Label` | Label estilizado para formulários |
| `ErrorMessage` | Exibição de mensagens de erro |
| `SuccessMessage` | Exibição de mensagens de sucesso |
| `UserHeader` | Header com informações do usuário logado |

## 🔄 Fluxo de Dados

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Pages     │────▶│   Hooks     │────▶│  Services   │
│  (UI/View)  │◀────│ (State Mgmt)│◀────│  (API)      │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Components  │     │ React Query │     │   Axios     │
│ (Reusable)  │     │  (Cache)    │     │  (HTTP)     │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `yarn dev` | Inicia servidor de desenvolvimento |
| `yarn build` | Gera build de produção |
| `yarn start` | Inicia servidor de produção |
| `yarn lint` | Executa verificação de lint |

## 🎯 Requisitos Atendidos

| Requisito | Status |
|-----------|--------|
| Criar cadastro | ✅ |
| Criar autenticação | ✅ |
| Enviar dinheiro (transferência) | ✅ |
| Receber dinheiro | ✅ |
| Depositar dinheiro | ✅ |
| Validar saldo antes da transferência | ✅ (Backend) |
| Saldo negativo acrescenta no depósito | ✅ (Backend) |
| Reversão de operações | ✅ |

## 🔮 Melhorias Futuras

- [ ] Testes unitários com Jest/React Testing Library
- [ ] Testes E2E com Cypress/Playwright
- [ ] PWA (Progressive Web App)
- [ ] Dark Mode
- [ ] Internacionalização (i18n)
- [ ] Docker containerization

## 👤 Autor

Desenvolvido como parte do desafio técnico SF Tech.

## 📄 Licença

Este projeto está sob a licença MIT.
