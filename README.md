# API Games: Empresas de Jogos

API REST desenvolvida do zero em **Node.js + TypeScript + Express**, com banco **PostgreSQL** acessado pelo **Prisma**. Possui cadastro e login de usuários com **JWT**, controle de acesso por perfil (**STAFF** e **ADMIN**) e cadastro/listagem de **empresas de jogos**.

Projeto desenvolvido para a disciplina de Projeto de Navegação e Interação (FATEC Jales), seguindo as Apostilas 1, 2 e 3 do Prof. André Mussato, adaptado ao tema "empresas de jogos".

## Tecnologias

- Node.js e TypeScript
- Express
- PostgreSQL e Prisma ORM
- Zod (validação de dados)
- bcryptjs (criptografia de senha)
- JSON Web Token (autenticação)
- CORS e dotenv

## Funcionalidades

- Cadastro de usuário com validação e senha criptografada
- Login com geração de token JWT (validade de 30 dias)
- Consulta dos dados do usuário logado
- Cadastro de empresas de jogos (somente ADMIN) e listagem
- Cadastro de jogos ligados a uma empresa existente (somente ADMIN) e listagem

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19 ou superior
- [PostgreSQL](https://www.postgresql.org/) e pgAdmin
- [Postman](https://www.postman.com/) (ou outro cliente HTTP) para testar
- [Git](https://git-scm.com/)

## Como baixar e configurar

**1. Clone o repositório e instale as dependências:**
```bash
git clone https://github.com/SEU_USUARIO/api-games.git
cd api-games
npm install
```
> Se a pasta do projeto for `backend`, entre nela antes do `npm install`.

**2. Crie o banco de dados:** no pgAdmin, crie um banco chamado `bdGames`.

**3. Crie o arquivo `.env`** na raiz do projeto (ao lado do `package.json`):
```env
PORT=3333
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/bdGames?schema=public"
JWT_SECRET="gere_um_hash_aqui"
```
- Troque `SUA_SENHA` pela senha do seu PostgreSQL.
- Para o `JWT_SECRET`, use qualquer texto longo ou um hash MD5 (ex.: de https://www.md5hashgenerator.com/).
- O `.env` **não** é versionado, então cada pessoa cria o seu.

**4. Crie as tabelas e gere o Prisma Client:**
```bash
npx prisma migrate dev
npx prisma generate
```

**5. Inicie o servidor:**
```bash
npm run dev
```
O servidor sobe em `http://localhost:3333`.

## Rotas

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/users` | Público | Cadastra um usuário |
| POST | `/session` | Público | Faz login e retorna o token JWT |
| GET | `/me` | Autenticado | Dados do usuário logado |
| POST | `/empresa` | ADMIN | Cadastra uma empresa |
| GET | `/empresa` | Autenticado | Lista as empresas |
| POST | `/jogo` | ADMIN | Cadastra um jogo ligado a uma empresa |
| GET | `/jogo` | Autenticado | Lista os jogos com a empresa associada |

Rotas protegidas exigem o header `Authorization: Bearer SEU_TOKEN`.

### Exemplos

**Cadastrar usuário** `POST /users`
```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "123456"
}
```

**Login** `POST /session`
```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```
Resposta: `id`, `name`, `email`, `role` e `token`.

**Cadastrar empresa** `POST /empresa` (token de ADMIN)
```json
{
  "nome": "Nintendo",
  "ceo": "Shuntaro Furukawa",
  "anoFundacao": 1889,
  "cidade": "Quioto",
  "pais": "Japão"
}
```

**Cadastrar jogo** `POST /jogo` (token de ADMIN). O `empresa_id` é o id de uma empresa já cadastrada (veja em `GET /empresa`):
````````````````json
{
  "empresa_id": "ID_DA_EMPRESA",
  "nome": "The Legend of Zelda: Breath of the Wild",
  "preco": 299.9,
  "anoLancamento": 2017
}
````````````````

### Como virar administrador

Todo usuário novo nasce como `STAFF`. Para cadastrar empresas, altere o perfil direto no banco (pgAdmin):
```sql
UPDATE users
SET role = 'ADMIN'
WHERE id = 'ID_DO_USUARIO';
```
Depois faça login novamente em `/session`.

## Estrutura do projeto

```
backend/
├── prisma/
│   ├── schema.prisma          # Modelos User e Empresa
│   └── migrations/
├── src/
│   ├── @types/express/        # Tipagem do req.user_id
│   ├── controllers/           # user/ e empresa/
│   ├── middlewares/           # validateSchema, isAuthenticated, isAdmin
│   ├── prisma/index.ts        # Conexão com o banco
│   ├── schemas/               # Validações com Zod
│   ├── services/              # Regras de negócio (user/ e empresa/)
│   ├── routes.ts
│   └── server.ts
├── .env                       # Não versionado
├── package.json
└── tsconfig.json
```

Fluxo de uma requisição: **rota → middlewares → controller → service → banco de dados**.

## Respostas de erro

| Status | Quando |
|---|---|
| 400 | Dados fora das regras do Zod, usuário já existente, login incorreto |
| 401 | Token ausente ou inválido, ou usuário sem permissão de ADMIN |
| 500 | Erro interno do servidor |

## Autores

- Guilherme Zanardi ([@guilhermezanardi07](https://github.com/guilhermezanardi07))
- Rafael Dias ([@bnedr02](https://github.com/bnedr02))
