# ConectaDoa — Projeto Integrador Extensionista II

Projeto desenvolvido para a disciplina **Projeto Integrador Extensionista II (PIE II)** do curso de Análise e Desenvolvimento de Sistemas.

O **ConectaDoa** é uma aplicação web completa (Frontend SPA + API REST + Banco de Dados Relacional) para conexão e gestão de doações para organizações não-governamentais (ONGs), estruturada em monólito cliente-servidor em 3 camadas.

---

## 🛠️ Stack Tecnológica

- **Frontend:** HTML5 Semântico, CSS3 (Mobile-First, Grid e Flexbox), JavaScript (ES Modules, SPA via hash `#`) com [Vite+](https://vite.plus/)
- **Backend:** Node.js com [Express](https://expressjs.com/)
- **Banco de Dados:** MySQL / MariaDB (via XAMPP ou instalação local)
- **Driver de Conexão:** [mysql2](https://github.com/sidorares/node-mysql2) com Pool de Conexões e Promises
- **Segurança:** Consultas parametrizadas com `?` (anti SQL injection) e renderização segura de texto via DOM (anti XSS)
- **Variáveis de Ambiente:** [dotenv](https://github.com/motdotla/dotenv)
- **Proxy:** Configurado via `vite.config.ts` encaminhando `/api` para a porta 3000

---

## 📱 Telas do MVP (Frontend SPA)

A interface é uma Single Page Application leve que navega através do hash da URL, sem recarregar a página:

1. **Doadores (`#/doadores`)**:
   - Formulário de cadastro de novos doadores com campos validados (nome, e-mail e telefone).
   - Listagem em cartões dos doadores cadastrados.
   - Edição de doador com preenchimento automático do formulário.
   - Exclusão com confirmação e tratamento de integridade referencial (bloqueio caso o doador possua doações).
   - Layout responsivo: formulário e lista empilhados no celular, e lado a lado em telas largas (>= 960px).

2. **Registrar Doação (`#/doacoes/nova`)**:
   - Seleção do doador e data da doação (preenchida por padrão com a data atual via `hoje()`).
   - Campo opcional de observação.
   - Inclusão dinâmica de múltiplos itens com agrupamento por categorias em `<optgroup>`.
   - Gravação atômica via transação no banco de dados.

3. **Listagem de Doações (`#/doacoes`)**:
   - Totalizador com número de doações registradas.
   - Cartões com doador, data formatada (padrão brasileiro `DD/MM/AAAA`) e lista de itens doados com quantidades e unidades.
   - Layout responsivo em grid com até 3 colunas em telas grandes.

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Vite+](https://vite.plus/) instalado globalmente (`vp`) ou gerenciador de pacotes (`pnpm`/`npm`)
- [Git](https://git-scm.com/)
- [XAMPP](https://www.apachefriends.org/) ou servidor MySQL / MariaDB rodando na porta 3306

---

## 🗄️ Banco de Dados

Os scripts SQL estão organizados na pasta `database/`:

- `database/schema.sql`: Estrutura das tabelas (`doador`, `categoria`, `item`, `doacao`, `doacao_item`) com chaves primárias, estrangeiras com `ON DELETE CASCADE`, regras de `CHECK`, `UNIQUE` e proteção contra dados nulos.
- `database/seed.sql`: Carga inicial de dados de exemplo para testes.

### Como importar no MySQL / phpMyAdmin:

1. Inicie os módulos **Apache** e **MySQL** no painel de controle do XAMPP.
2. Acesse o phpMyAdmin em `http://localhost/phpmyadmin`.
3. Na aba **SQL**, execute o script `database/schema.sql`.
4. Em seguida, na base criada, execute o script `database/seed.sql`.

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

Testes manuais completos de todos os endpoints encontram-se no arquivo [`api.http`](file:///C:/Users/Balta/.gemini/antigravity/scratch/conectadoa/api.http).

---

## 📁 Estrutura de Pastas

```text
conectadoa/
├── database/
│   ├── schema.sql        # Estrutura do banco de dados (DDL)
│   └── seed.sql          # Dados iniciais de teste (DML)
├── server/
│   ├── db.js             # Pool de conexões MySQL
│   ├── index.js          # Inicialização do Express e middlewares
│   ├── validacao.js      # Regras de validação de negócio no servidor
│   └── routes/
│       ├── doadores.js   # CRUD de doadores
│       ├── itens.js      # Catálogo de itens
│       └── doacoes.js    # Rotas de doações com transação SQL
├── src/
│   ├── api.js            # Camada centralizada de chamadas à API (fetch)
│   ├── main.js           # Roteamento SPA com hash
│   ├── style.css         # Estilos mobile-first (Grid e Flexbox)
│   ├── ui.js             # Funções de apoio (el seguro anti-XSS, datas, mensagens)
│   └── pages/
│       ├── doacoes.js    # Telas de cadastro e listagem de doações
│       └── doadores.js   # Tela de gestão de doadores
├── .env.example          # Modelo de variáveis de ambiente
├── .env                  # Variáveis locais (ignorado no Git)
├── .gitignore            # Arquivos ignorados pelo Git
├── api.http              # Testes manuais de todos os endpoints
├── index.html            # Estrutura fixa (header, nav, main, footer)
├── package.json          # Dependências e scripts
├── vite.config.ts        # Configuração do Vite+ com proxy /api -> porta 3000
└── README.md             # Documentação do projeto
```
