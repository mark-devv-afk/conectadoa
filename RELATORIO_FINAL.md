# Relatório Final do PIE II

## 1. Identificação

| Campo | Valor |
| :--- | :--- |
| **Seu Nome Completo** | [SEU NOME COMPLETO AQUI] |
| **ONG/Empresa** | ConectaDoa (Gestão de Doações para Comunidades e ONGs) |
| **Link do repositório** | https://github.com/mark-devv-afk/conectadoa |

> **Nota:** Certifique-se de que o repositório no GitHub está configurado como **público** para que o avaliador consiga acessar sem necessidade de login.

---

## 2. Como rodar o projeto

```bash
git clone https://github.com/mark-devv-afk/conectadoa.git && cd conectadoa
vp install
Copiar .env.example para .env e preencher DB_PASSWORD e JWT_SECRET
No MySQL: executar database/schema.sql e database/seed.sql (ou rodar: node database/init.js)
Terminal 1: vp run api
Terminal 2: vp dev
Abrir http://localhost:5173
```

### Usuário de demonstração

| Campo | Valor |
| :--- | :--- |
| **E-mail** | voluntario@exemplo.com |
| **Senha** | conectadoa123 |

---

## 3. O que funciona e o que ficou pendente

| Funciona | Pendente |
| :--- | :--- |
| Login com autenticação JWT e botão Sair (logout com expiração de sessão) | Edição e exclusão de doações já registradas |
| Cadastro, validação de campos e listagem de doadores | Mensagem visual mais amigável (toast/modal) quando o token expira |
| Registro de doação com múltiplos itens em transação SQL atômica (`COMMIT`/`ROLLBACK`) | Filtro avançado e paginação na listagem de doações |
| Rotas da API totalmente protegidas (HTTP 401 quando sem token ou token inválido) | Exportação de relatórios de doações em formato PDF/Excel |
| Interface SPA responsiva (Mobile-First) com proteção contra XSS | Layout otimizado da tabela de itens de doações em telas muito pequenas |
