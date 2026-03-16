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

## ✅ Aderência ao Case

### O que não pode faltar

- ✅ Uso de ESLint e Prettier
- ✅ Código limpo e semântico
- ✅ Componentização adequada
- ✅ Responsividade
- ✅ Tratamento de erros

### O que pode te destacar

- ✅ Uso de TypeScript
- ✅ Utilização de recursos modernos de UI
- ✅ Animações fluidas nas transições

## 🗂️ Estrutura de Pastas

```text
src/
  components/      # Componentes reutilizáveis (UI, auth, layout)
  hooks/           # Hooks globais
  pages/           # Páginas principais (Home, Login)
  routes/          # Rotas e proteção de acesso
  schemas/         # Schemas de validação (Zod)
  sections/        # Seções da landing (hero, products, testimonials...)
  services/        # Camada de API (axios e serviços)
  types/           # Tipos compartilhados
  utils/           # Helpers e utilitários
```

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

## 📸 Sessão de Prints (README)

Para fortalecer sua entrega, adicione as imagens em `docs/screenshots/` e referencie no README.

### Prints recomendados (obrigatórios para este case)

1. `01-login.png`

- Tela de login com validação visual (erro de email/senha).

2. `02-register.png`

- Tela de cadastro com validação em tempo real.

3. `03-home-admin.png`

- Home logada com controles de admin visíveis.

4. `04-home-readonly.png`

- Modo somente leitura ativado (sem controles de CRUD).

5. `05-products-create-modal.png`

- Modal de criação de produto com campos preenchidos.

6. `06-products-list.png`

- Lista/carrossel de produtos carregada da API.

7. `07-products-edit-modal.png`

- Fluxo de atualização de produto.

8. `08-products-delete-confirm.png`

- Confirmação de exclusão de produto.

9. `09-testimonials-create.png`

- Criação de depoimento.

10. `10-responsive-mobile.png`

- Versão mobile (menu, cards, formulários).

11. `11-feedback-toast-success.png`

- Feedback de sucesso.

12. `12-feedback-toast-error.png`

- Feedback de erro/tratamento de falhas de API.

### Bloco pronto para colar no README

```md
## 📸 Prints da Aplicação

### Autenticação

![Login](docs/screenshots/01-login.png)
![Cadastro](docs/screenshots/02-register.png)

### Área logada

![Home Admin](docs/screenshots/03-home-admin.png)
![Home Somente Leitura](docs/screenshots/04-home-readonly.png)

### CRUD de Produtos

![Criar Produto](docs/screenshots/05-products-create-modal.png)
![Lista de Produtos](docs/screenshots/06-products-list.png)
![Editar Produto](docs/screenshots/07-products-edit-modal.png)
![Excluir Produto](docs/screenshots/08-products-delete-confirm.png)

### Depoimentos e Responsividade

![Criar Depoimento](docs/screenshots/09-testimonials-create.png)
![Mobile](docs/screenshots/10-responsive-mobile.png)

### Feedbacks e Tratamento de Erros

![Sucesso](docs/screenshots/11-feedback-toast-success.png)
![Erro](docs/screenshots/12-feedback-toast-error.png)
```

## 👨‍💻 Autor

Desenvolvido por Carlos Franco para o processo seletivo da Knex Consultoria Jr.
