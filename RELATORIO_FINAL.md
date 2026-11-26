# Relatório Final do PIE II

## 1. Identificação

| Campo | Valor |
| :--- | :--- |
| **Seu Nome Completo** | Marcos Oliveira Santos Junior |
| **ONG/Empresa** | ConectaDoa |
| **Link do repositório** | https://github.com/mark-devv-afk/conectadoa |

---

## 2. Como rodar o projeto

```bash
git clone https://github.com/mark-devv-afk/conectadoa.git && cd conectadoa
vp install
Copiar .env.example para .env e preencher DB_PASSWORD e JWT_SECRET
No MySQL: SOURCE database/schema.sql; e SOURCE database/seed.sql; (ou: node database/init.js)
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
| Login com autenticação JWT e botão Sair (logout seguro) | Edição e exclusão de doações já registradas |
| Cadastro, validação e listagem de doadores | Mensagem visual mais amigável (toast/modal) quando o token expira |
| Registro de doação com múltiplos itens em transação atômica (`COMMIT`/`ROLLBACK`) | Filtro avançado e paginação na listagem de doações |
| Rotas da API protegidas por token Bearer (retorno HTTP 401 sem token) | Exportação de relatórios de doações em formato PDF/Excel |
| Interface SPA responsiva (Mobile-First) com proteção contra XSS | Layout otimizado da listagem de doações em telas muito pequenas |
