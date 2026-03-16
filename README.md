# 🍰 Cup&Cake Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7-EC5990?logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-UI-000000)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=1A2B34)

Frontend do case técnico da Knex para autenticação de admin, vitrine e gestão de produtos/depoimentos da loja de doces.

</div>

## 📌 Visão Geral

O projeto implementa um sistema frontend completo com:

- 🔐 Login e cadastro com validação em tempo real
- 🍭 Área logada protegida por token
- 🛍️ Vitrine de produtos
- 🧰 CRUD de produtos
- 💬 CRUD de depoimentos
- 👀 Modo somente leitura para visualizar a loja como usuário comum
- 📱 Layout responsivo com transições animadas

## 🧱 Stack Utilizada

### Core

- React 19
- TypeScript
- Vite
- React Router DOM

### Formulários, validação e API

- React Hook Form
- Zod (+ @hookform/resolvers)
- Axios

### UI/UX

- Framer Motion
- React Toastify
- CSS modular por seção/componente

### Qualidade de código

- ESLint (flat config)
- Prettier

## 🧩 Padrões de Projeto Utilizados

### 1. Component-based architecture

- A interface foi quebrada em componentes pequenos e reutilizáveis.
- Componentes de UI genéricos (botões, inputs, títulos) ficam separados dos componentes de domínio.

### 2. Organização por domínio (feature-first)

- As principais áreas da landing (hero, products, testimonials, contact, etc.) estão em `sections/`.
- Cada domínio concentra seus arquivos de `components`, `hooks`, `types`, `constants` e `styles`.

### 3. Separação de responsabilidades

- `services/`: comunicação com API e regras de integração.
- `schemas/`: validação de dados com Zod.
- `routes/`: controle de acesso e proteção de rotas.
- `utils/`: funções utilitárias puras.

### 4. Tipagem forte com TypeScript

- Props, entidades e contratos de API são tipados.
- Reduz erros em runtime e melhora manutenção/evolução do código.

### 5. Estado local + hooks customizados

- Estado de UI é mantido próximo dos componentes que o utilizam.
- Regras repetíveis de comportamento são extraídas para hooks customizados.

### 6. UX orientada a feedback

- Formulários com validação em tempo real.
- Feedback de sucesso/erro com toasts e estados de carregamento.

## 🗂️ Estrutura de Pastas

- `src/components/auth`: componentes visuais e de formulário da autenticação (login/cadastro).
- `src/components/ui`: biblioteca interna de componentes reutilizáveis (botões, input e títulos).
- `src/components/layout`: elementos estruturais compartilhados entre páginas.
- `src/pages`: composição de telas completas e orquestração de seções.
- `src/sections`: blocos de negócio/landing por contexto funcional.
- `src/services`: camada de acesso HTTP e manipulação de payload/response.
- `src/schemas`: regras de validação dos formulários com mensagens de erro.
- `src/routes`: roteamento da aplicação e proteção de páginas autenticadas.
- `src/hooks`: hooks de uso transversal (ex.: autenticação).
- `src/types`: contratos e tipos compartilhados entre camadas.
- `src/utils`: utilitários de formatação e helpers puros (cookies, moeda, string etc.).

### Convenções aplicadas

- `index.tsx` para componente principal da pasta.
- `styles.css` colocalizado por componente/seção.
- `constants.ts`, `types.ts` e `utils.ts` próximos ao domínio onde são usados.
- Nomes de componentes em PascalCase e funções utilitárias em camelCase.

## 🔐 Fluxo de Autenticação

1. Usuário faz login em `/auth/login`
2. Token é persistido em cookies
3. Rotas protegidas validam presença do token
4. Requisições privadas enviam `Authorization: <token>`
5. Logout remove token e retorna para login

## 🛍️ Fluxo de Produtos (CRUD)

1. Upload da imagem em `/files` (multipart)
2. Criação do produto em `/products` com `file_id`
3. Listagem com `/products`
4. Edição por `PUT /products/:id`
5. Exclusão por `DELETE /products/:id`

## 👀 Modo Somente Leitura

Quando ativado no header:

- Oculta botões e ações administrativas
- Oculta modais de criação/edição/exclusão
- Fecha estados de modal abertos
- Mantém navegação e visualização da loja

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm install
```

### Ambiente

Crie um arquivo `.env` (se necessário no seu setup):

```env
VITE_API_BASE_URL=https://knex.zernis.space
```

### Desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
npm run preview
```

## 🧪 Qualidade e Padronização

```bash
npm run lint
npm run format:check
npm run format
```

## 🌐 API

- Base URL: https://knex.zernis.space
- Health: https://knex.zernis.space/health

## 🧭 Boas práticas implementadas

- Validação de formulários em tempo real
- Feedback visual com mensagens de erro e sucesso
- Tratamento de exceções em operações assíncronas
- Componentização por domínio
- Tipagem forte de props, serviços e entidades
- Estados de carregamento e fallback de erro

## 📸 Prints da Aplicação

Imagens organizadas em docs/screenshots.

### 01. Login Admin

![01 - Login Admin](docs/screenshots/01-login.png)

### 02. Cadastro Admin

![02 - Cadastro Admin](docs/screenshots/02-register.png)

### 03. Home Logada (Modo Admin)

![03 - Home Admin](docs/screenshots/03-home-admin.png)

### 04. Home Logada (Modo Somente Leitura)

![04 - Home Somente Leitura](docs/screenshots/04-home-readonly.png)

### 05. Criar Produto (Modal)

![05 - Criar Produto](docs/screenshots/05-products-create-modal.png)

### 06. Listagem de Produtos

![06 - Lista de Produtos](docs/screenshots/06-products-list.png)

### 07. Editar Produto (Modal)

![07 - Editar Produto](docs/screenshots/07-products-edit-modal.png)

### 08. Confirmar Exclusão de Produto

![08 - Confirmar Exclusão de Produto](docs/screenshots/08-products-delete-confirm.png)

### 09. Criar Depoimento (Modal)

![09 - Criar Depoimento](docs/screenshots/09-testimonials-create.png)

### 10. Responsividade Mobile

![10 - Responsividade Mobile](docs/screenshots/10-responsive-mobile.png)

### 11. Feedback de Sucesso

![11 - Feedback de Sucesso](docs/screenshots/11-feedback-toast-success.png)

## 👨‍💻 Autor

Desenvolvido por Carlos Franco para o processo seletivo da Knex Consultoria Jr.
