import "./style.css";

const app = document.querySelector("#app");
app.innerHTML = `
<div class="card">
  <h1>ConectaDoa</h1>
  <p>Status da API: <strong id="status">verificando...</strong></p>
</div>
`;

async function verificarApi() {
  const status = document.querySelector("#status");
  try {
    const resposta = await fetch("/api/health");
    const dados = await resposta.json();
    status.textContent = `${dados.status} (${dados.hora})`;
  } catch {
    status.textContent = "API fora do ar";
  }
}

verificarApi();
