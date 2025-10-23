# API Gympass Node.js

API de uma aplicação no estilo GymPass desenvolvida em Node.js com TypeScript, Fastify e Prisma, seguindo os princípios SOLID para um código limpo, escalável e de fácil manutenção.

## 📋 Principais Funcionalidades da Aplicação

- **Usuários (Users):** Podem se cadastrar, autenticar e visualizar seus perfis.
- **Academias (Gyms):** Podem ser cadastradas, buscadas por nome ou proximidade.
- **Check-ins:** Usuários podem realizar check-in em academias, com regras de negócio como validação de distância e limite de check-ins por dia.

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Ambiente de execução do JavaScript no servidor.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Fastify:** Framework web focado em performance e baixo overhead.
- **Prisma:** ORM para Node.js e TypeScript, utilizado para a comunicação com o banco de dados (PostgreSQL).
- **Zod:** Biblioteca para validação de esquemas e tipos.
- **Vitest:** Framework de testes para projetos Vite (e Node.js).
- **Docker:** Utilizado para criar um ambiente de desenvolvimento com PostgreSQL.
- **TSX:** Executa arquivos TypeScript diretamente sem a necessidade de compilação prévia em desenvolvimento.
- **TSUP:** Bundler para bibliotecas TypeScript.

## ✅ Requisitos Funcionais

- Deve ser possível se cadastrar;
- Deve ser possível se autenticar;
- Deve ser possível obter o perfil de um usuário logado;
- Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- Deve ser possível o usuário obter seu histórico de check-ins;
- Deve ser possível o usuário buscar academias próximas;
- Deve ser possível o usuário buscar academias pelo nome;
- Deve ser possível o usuário realizar check-in em uma academia;
- Deve ser possível validar o check-in de um usuário;
- Deve ser possível cadastrar uma academia;

## 📐 Regras de Negócio

- O usuário não deve poder se cadastrar com um e-mail duplicado;
- O usuário não pode fazer 2 check-ins no mesmo dia;
- O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- O check-in só pode ser validado até 20 minutos após ser criado;
- O check-in só pode ser validado por administradores;
- A academia só pode ser cadastrada por administradores;

## 🔒 Requisitos Não-Funcionais

- A senha do usuário precisa estar criptografada;
- Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- Todas listas de dados precisam estar paginadas com 20 itens por página;
- O usuário deve ser identificado por um JWT (JSON Web Token);

---

# 🚀 Como Executar o Projeto

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) e Docker Compose
- [Insomnia](https://insomnia.rest/) ou outro cliente HTTP (opcional)

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/INTLPiva/api-gympass.git
cd api-gympass
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis necessárias no arquivo `.env`:

```env
NODE_ENV=dev
JWT_SECRET="your-secret-key"
DATABASE_URL="postgresql://docker:docker@localhost:5432/apigympass?schema=public"
```

### 4. Inicie o banco de dados com Docker

Na raiz do projeto, execute o comando para subir o container do PostgreSQL:

```bash
docker-compose up -d
```

Este comando irá:

- Criar e iniciar um container PostgreSQL
- Configurar o banco de dados conforme especificado no `docker-compose.yml`
- Expor o banco na porta 5432

Para verificar se o container está rodando:

```bash
docker-compose ps
```

Para parar o container quando necessário:

```bash
docker-compose down
```

### 5. Execute as migrations do banco de dados

Após o container estar rodando, execute as migrations do Prisma:

```bash
npx prisma migrate deploy
```

Para visualizar o banco de dados com Prisma Studio:

```bash
npx prisma studio
```

## ▶️ Executando o Projeto

### Modo de desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

## 🧪 Testes

### Executar todos os testes unitários

```bash
npm test
```

### Executar testes E2E

```bash
npm run test:e2e
```

### Gerar relatório de cobertura

```bash
npm run test:coverage
```

### Executar testes com interface visual

```bash
npm run test:ui
```

## 📮 Testando as Requisições da API

### Importando no Insomnia

Para facilitar o teste das rotas da API, um arquivo `Insomnia.json` está disponível na raiz do projeto com todas as requisições pré-configuradas.

**Passos para importar:**

1. Abra o Insomnia
2. Clique em `Application` → `Preferences` → `Data` → `Import Data`
3. Selecione `From File`
4. Navegue até a raiz do projeto e selecione o arquivo `Insomnia.json`
5. Clique em `Import`

Após a importação, você terá acesso a todas as rotas da API

## 📁 Estrutura do Projeto

```
src/
├── @types/            # Definições de tipos TypeScript
├── env/               # Validação de variáveis de ambiente
├── http/              # Rotas, controllers e middlewares
│   ├── controllers/   # Lógica de controle das requisições
│   └── middlewares/   # Middlewares de autenticação, etc
├── lib/               # Configurações de bibliotecas
├── repositories/      # Repositórios (acesso a dados)
│   ├── in-memory/     # Implementações para testes
│   └── prisma/        # Implementações com Prisma
├── use-cases/         # Casos de uso (regras de negócio)
│   ├── errors/        # Erros personalizados da aplicação
│   └── factories/     # Factories seguindo o Factory Pattern
├── utils/             # Funções utilitárias
├── app.ts             # Configuração da aplicação Fastify
└── server.ts          # Arquivo principal da aplicação
```

## 🔄 Integração Contínua (CI)

Este projeto possui integração contínua configurada com **GitHub Actions**. A cada push realizado no repositório, as seguintes actions são executadas automaticamente:

### Actions Configuradas

#### 1. **Testes Unitários** 🧪

- **Trigger:** A cada push em qualquer branch
- **Execução:** Roda todos os testes unitários (`npm test`)
- **Objetivo:** Garantir que as regras de negócio e casos de uso estão funcionando corretamente
- **Duração média:** ~30 segundos

#### 2. **Testes E2E** 🔗

- **Trigger:** A cada push em qualquer branch
- **Execução:** Roda todos os testes end-to-end (`npm run test:e2e`)
- **Objetivo:** Validar o fluxo completo da aplicação, incluindo rotas HTTP e integração com banco de dados
- **Duração média:** ~1 minuto
