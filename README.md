# ConectaDoa — Projeto Integrador Extensionista II

Projeto desenvolvido para a disciplina **Projeto Integrador Extensionista II (PIE II)** do curso de Análise e Desenvolvimento de Sistemas.

O **ConectaDoa** é uma aplicação web para gestão e conexão de doações para organizações não-governamentais (ONGs), estruturada em arquitetura cliente-servidor em monólito simples.

---

## 🛠️ Stack Tecnológica

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules) com [Vite+](https://vite.plus/)
- **Backend:** Node.js com [Express](https://expressjs.com/)
- **Variáveis de Ambiente:** [dotenv](https://github.com/motdotla/dotenv)
- **Proxy:** Configurado via `vite.config.ts` encaminhando `/api` para a porta 3000

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Vite+](https://vite.plus/) instalado globalmente (`vp`) ou gerenciador de pacotes (`pnpm`/`npm`)
- [Git](https://git-scm.com/)

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

O arquivo `.env` conterá a porta padrão:

```env
PORT=3000
```

---

## ▶️ Rodando a Aplicação

Para executar o projeto completo, você precisará de dois terminais abertos:

### Terminal 1 — Iniciar a API (Backend Express)

```bash
vp run api
```

_(ou `npm run api`)_  
A API iniciará em: **http://localhost:3000**  
Rota de verificação de integridade: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Terminal 2 — Iniciar o Frontend (Vite+)

```bash
vp dev
```

_(ou `npm run dev`)_  
O servidor de desenvolvimento iniciará em: **http://localhost:5173**

---

## 🌐 Verificação

Ao abrir **http://localhost:5173** no navegador, o frontend fará uma chamada assíncrona para `/api/health` através do proxy configurado no Vite+, exibindo na tela:

> **ConectaDoa**  
> Status da API: **ok (_data e hora_)**

---

## 📁 Estrutura de Pastas

```text
conectadoa/
├── server/
│   └── index.js        # API Express com rota /api/health
├── src/
│   ├── main.js         # Código JavaScript do frontend (fetch /api/health)
│   └── style.css       # Estilos da aplicação
├── .env.example        # Modelo de variáveis de ambiente (versionado no Git)
├── .env                # Variáveis locais de ambiente (ignorado no .gitignore)
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── index.html          # Documento HTML principal
├── package.json        # Dependências e scripts do projeto
├── vite.config.ts      # Configuração do Vite+ com proxy /api -> porta 3000
└── README.md           # Documentação do projeto
```
