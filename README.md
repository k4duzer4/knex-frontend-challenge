# Knex — Desafio Técnico 2026

Este repositório contém os cases técnicos para as áreas **Backend**, **Frontend** e **Fullstack**. Escolha o case de acordo com a vaga e envie o link do(s) repositório(s) com sua solução.

---

## Por área

### Backend

Resolva o case em [`knex-backend-case/`](./knex-backend-case/).

API RESTful para uma **plataforma de vendas corporativas**: empresas cadastram produtos, usuários podem ser colaboradores (gerenciam o catálogo da própria empresa) ou consumidores (apenas compram). Foco em login/registro, autenticação/autorização com JWT, CRUD de produtos e transações.

---

### Frontend

Resolva o case em [`knex-frontend-case/`](./knex-frontend-case/) consumindo a API em [`knex-frontend-api-to-consume/`](./knex-frontend-api-to-consume/).

Site vitrine de **Loja de Doces** com React: página de cadastro/login de admin, CRUD de produtos e depoimentos. A API mockada está em `knex-frontend-api-to-consume` — suba-a localmente e consuma os endpoints no seu frontend.

---

### Fullstack

Resolva **os dois cases** acima: o backend da plataforma de vendas corporativas e o frontend da loja de doces (usando a API fornecida em `knex-frontend-api-to-consume`).

---

## Entrega

- **Não há formato obrigatório.** Você pode criar um repositório novo, fazer fork deste repositório ou usar qualquer outra forma de hospedar seu código.
- A entrega é feita **enviando o link dos repositórios** de acordo com o case:
  - **Backend:** link do repositório com a API
  - **Frontend:** link do repositório com o frontend
  - **Fullstack:** link(s) do(s) repositório(s) — pode ser um único repo com backend + frontend ou repositórios separados

---

## Estrutura do repositório

```
knex-challange-2026/
├── knex-backend-case/          # Case Backend — Plataforma de vendas corporativas
├── knex-frontend-case/         # Case Frontend — Site vitrine Loja de Doces
├── knex-frontend-api-to-consume/  # API para o case Frontend (consumir no seu projeto)
└── README.md                   # Este arquivo
```
