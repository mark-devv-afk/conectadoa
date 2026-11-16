# ConectaDoa — Projeto Integrador Extensionista II

Projeto desenvolvido para a disciplina **Projeto Integrador Extensionista II (PIE II)** do curso de Análise e Desenvolvimento de Sistemas.

O **ConectaDoa** é uma aplicação web para gestão e conexão de doações para organizações não-governamentais (ONGs), estruturada em arquitetura cliente-servidor em monólito simples.

---

## 🛠️ Stack Tecnológica

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules) com [Vite+](https://vite.plus/)
- **Backend:** Node.js com [Express](https://expressjs.com/)
- **Banco de Dados:** MySQL / MariaDB (via XAMPP ou instalação local)
- **Driver de Conexão:** [mysql2](https://github.com/sidorares/node-mysql2) com Pool de Conexões e Promises
- **Variáveis de Ambiente:** [dotenv](https://github.com/motdotla/dotenv)
- **Proxy:** Configurado via `vite.config.ts` encaminhando `/api` para a porta 3000

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Vite+](https://vite.plus/) instalado globalmente (`vp`) ou gerenciador de pacotes (`pnpm`/`npm`)
- [Git](https://git-scm.com/)
- [XAMPP](https://www.apachefriends.org/) ou servidor MySQL / MariaDB rodando na porta 3306

---

## 🗄️ Banco de Dados

Os scripts SQL estão organizados na pasta `database/`:

- `database/schema.sql`: Criação das tabelas (`doador`, `categoria`, `item`, `doacao`, `doacao_item`) com chaves primárias, estrangeiras com `ON DELETE CASCADE`, regras de `CHECK`, `UNIQUE` e proteção contra dados nulos.
- `database/seed.sql`: Carga de dados de exemplo para testes.

### Como importar no MySQL / XAMPP:

1. Inicie o módulo **MySQL** no painel do XAMPP.
2. Abra o phpMyAdmin em `http://localhost/phpmyadmin` ou cliente MySQL de sua preferência.
3. Execute primeiro o script `database/schema.sql`.
4. Em seguida, execute o script `database/seed.sql`.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/conectadoa.git
cd conectadoa
```

### 2. Instalar as dependências

Utilizando o Vite+ (`vp`):

```bash
vp install
```

_(ou se preferir utilizar npm: `npm install`)_

### 3. Configurar variáveis de ambiente

Copie o arquivo de exemplo para criar o seu `.env`:

```bash
# No Windows (PowerShell)
Copy-Item .env.example .env

# No Linux/macOS
cp .env.example .env
```

Preencha com as credenciais do seu banco local no `.env`:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=conectadoa
```

---

## ▶️ Rodando a Aplicação

Para executar o projeto completo, abra dois terminais:

### Terminal 1 — Iniciar a API (Backend Express)

```bash
vp run api
```

_(ou `npm run api`)_  
A API iniciará em: **http://localhost:3000**  
Rota de status: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Terminal 2 — Iniciar o Frontend (Vite+)

```bash
vp dev
```

_(ou `npm run dev`)_  
O servidor de desenvolvimento iniciará em: **http://localhost:5173**

---

## 📡 Endpoints da API REST (MVP)

| Método   | Rota                | Descrição                                        | Status de Sucesso |
| -------- | ------------------- | ------------------------------------------------ | ----------------- |
| `GET`    | `/api/health`       | Verifica integridade da API e conexão ao banco   | 200 OK            |
| `GET`    | `/api/doadores`     | Lista todos os doadores ordenados por nome       | 200 OK            |
| `GET`    | `/api/doadores/:id` | Busca um doador específico por ID                | 200 OK            |
| `POST`   | `/api/doadores`     | Cadastra novo doador (validação e e-mail único)  | 201 Created       |
| `PUT`    | `/api/doadores/:id` | Atualiza dados de um doador existente            | 200 OK            |
| `DELETE` | `/api/doadores/:id` | Remove doador (protegido se houver doações)      | 204 No Content    |
| `GET`    | `/api/itens`        | Catálogo de itens com suas categorias            | 200 OK            |
| `GET`    | `/api/doacoes`      | Lista doações com dados do doador e itens        | 200 OK            |
| `POST`   | `/api/doacoes`      | Registra doação com múltiplos itens em transação | 201 Created       |

Testes manuais completos de todos os endpoints encontram-se no arquivo [`api.http`](file:///C:/Users/Balta/.gemini/antigravity/scratch/conectadoa/api.http) (compatível com a extensão REST Client do VS Code).

---

## 📁 Estrutura de Pastas

```text
conectadoa/
├── database/
│   ├── schema.sql      # Estrutura do banco de dados (DDL)
│   └── seed.sql        # Dados iniciais de teste (DML)
├── server/
│   ├── db.js           # Pool de conexões MySQL
│   ├── index.js        # Inicialização do Express e middlewares
│   ├── validacao.js    # Regras de validação de negócio
│   └── routes/
│       ├── doadores.js # Rotas de CRUD de doadores
│       ├── itens.js    # Rota de catálogo de itens
│       └── doacoes.js  # Rotas de doações com transação SQL
├── src/
│   ├── main.js         # Código JavaScript do frontend
│   └── style.css       # Estilos da aplicação
├── .env.example        # Modelo de variáveis de ambiente
├── .env                # Variáveis locais (ignorado no Git)
├── .gitignore          # Arquivos ignorados pelo Git
├── api.http            # Testes manuais de todos os endpoints
├── index.html          # Documento HTML principal
├── package.json        # Dependências e scripts
├── vite.config.ts      # Configuração do Vite+ com proxy /api
└── README.md           # Documentação do projeto
```
