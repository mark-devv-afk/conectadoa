import "./style.css";
import { lerNomeUsuario, lerToken, sair } from "./api.js";
import { telaDoacoes, telaNovaDoacao } from "./pages/doacoes.js";
import { telaDoadores } from "./pages/doadores.js";
import { telaLogin } from "./pages/login.js";

const app = document.querySelector("#app");

function mostrarApp() {
  app.innerHTML = `
    <header class="topo">
      <strong class="marca">ConectaDoa</strong>
      <nav>
        <button type="button" data-tela="doadores">Doadores</button>
        <button type="button" data-tela="novaDoacao">Registrar doação</button>
        <button type="button" data-tela="doacoes">Doações</button>
      </nav>
      <div class="usuario-area">
        <span class="usuario"></span>
        <button type="button" id="sair" class="secundario">Sair</button>
      </div>
    </header>
    <div id="conteudo"></div>
  `;

  app.querySelector(".usuario").textContent = lerNomeUsuario() || "Voluntário";
  const conteudo = app.querySelector("#conteudo");
  const telas = {
    doadores: telaDoadores,
    novaDoacao: telaNovaDoacao,
    doacoes: telaDoacoes,
  };

  for (const botao of app.querySelectorAll("nav button")) {
    botao.onclick = () => {
      for (const b of app.querySelectorAll("nav button")) {
        b.removeAttribute("aria-current");
      }
      botao.setAttribute("aria-current", "page");
      telas[botao.dataset.tela](conteudo);
    };
  }

  app.querySelector("#sair").onclick = () => {
    sair();
    iniciar();
  };

  const primeiroBotao = app.querySelector('nav button[data-tela="doadores"]');
  if (primeiroBotao) primeiroBotao.setAttribute("aria-current", "page");
  telaDoadores(conteudo);
}

function iniciar() {
  if (lerToken()) {
    mostrarApp();
  } else {
    telaLogin(app, mostrarApp);
  }
}

iniciar();
