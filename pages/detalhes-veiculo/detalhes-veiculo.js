import ArmazenamentoUsuario from "../../models/usuarios/ArmazenamentoUsuario.js";
import ArmazenamentoVeiculo from "../../models/veiculos/ArmazenamentoVeiculo.js";

ArmazenamentoUsuario.carregar();
ArmazenamentoVeiculo.carregar();

// --- Compatibilidade com nomes diferentes no projeto ---
function obterUsuarioLogado() {
  if (typeof ArmazenamentoUsuario.obterUsuarioLogado === "function") {
    return ArmazenamentoUsuario.obterUsuarioLogado();
  }
  if (typeof ArmazenamentoUsuario.getUsuarioLogado === "function") {
    return ArmazenamentoUsuario.getUsuarioLogado();
  }
  return null;
}

function salvarUsuario(usuario) {
  if (typeof ArmazenamentoUsuario.atualizar === "function") {
    return ArmazenamentoUsuario.atualizar(usuario);
  }
  if (typeof ArmazenamentoUsuario.atualizarUsuario === "function") {
    return ArmazenamentoUsuario.atualizarUsuario(usuario);
  }
}

// --- Protege a página ---
const usuarioLogado = obterUsuarioLogado();
if (!usuarioLogado) {
  alert("Você precisa estar logado para acessar esta página.");
  window.location.href = "/pages/login/login.html";
}

// --- Veículo ---
const params = new URLSearchParams(window.location.search);
const idVeiculo = params.get("id");

const detalhes = document.getElementById("detalhes-veiculo");
const veiculos = ArmazenamentoVeiculo.listarVeiculos();
const veiculo = veiculos.find(v => v.id === idVeiculo);

function renderBotaoFavorito(btn) {
  const ehFav = usuarioLogado.isFavorito(idVeiculo);
  btn.classList.toggle("is-favorito", ehFav);
  btn.textContent = ehFav ? "❤️ Favorito" : "⭐ Favoritar";
}

window.addEventListener("DOMContentLoaded", () => {
  if (!veiculo) {
    detalhes.innerHTML = "<p>Veículo não encontrado.</p>";
    return;
  }

  // ======================
  // ADMIN (editar veículo)
  // ======================
  if (usuarioLogado.role === "adm") {
    detalhes.innerHTML = `
      <h2 class="veiculo-titulo">Editar Veículo</h2>

      <div class="form-group">
        <label class="label" for="marca">Marca</label>
        <input class="input-field" type="text" id="marca" value="${veiculo.marca}"/>
      </div>

      <div class="form-group">
        <label class="label" for="modelo">Modelo</label>
        <input class="input-field" type="text" id="modelo" value="${veiculo.modelo}" />
      </div>

      <div class="form-group">
        <label class="label" for="ano">Ano</label>
        <input class="input-field" type="number" id="ano" value="${veiculo.ano}" />
      </div>

      <div class="form-group">
        <label class="label" for="descricao">Descrição</label>
        <input class="input-field" type="text" id="descricao" value="${veiculo.descricao}">
      </div>

      <div class="form-group">
        <label class="label" for="imagem">Imagem (URL)</label>
        <input class="input-field" type="text" id="imagem" value="${veiculo.imagem ?? ""}" />
      </div>

      <div class="acoes-container">
        <button class="btn btn-salvar" id="salvar-btn">Salvar</button>
        <button class="btn btn-excluir" id="excluir-btn">Excluir</button>
        <button class="btn btn-voltar" onclick="window.location.href='/'">Voltar</button>
      </div>
    `;

    const excluirBtn = document.getElementById("excluir-btn");
    if (excluirBtn) {
      excluirBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir este veículo?")) {
          ArmazenamentoVeiculo.apagarVeiculo(veiculo.id);
          window.location.href = "/";
        }
      });
    }

    const salvarBtn = document.getElementById("salvar-btn");
    if (salvarBtn) {
      salvarBtn.addEventListener("click", () => {
        veiculo.marca = document.getElementById("marca").value;
        veiculo.modelo = document.getElementById("modelo").value;
        veiculo.ano = parseInt(document.getElementById("ano").value);
        veiculo.descricao = document.getElementById("descricao").value;
        veiculo.imagem = document.getElementById("imagem").value;

        ArmazenamentoVeiculo.atualizarVeiculo(veiculo);
        alert("Veículo atualizado com sucesso!");
        window.location.href = "/";
      });
    }

    return;
  }

  // ======================
  // CLIENTE (detalhes + favoritos)
  // ======================
  detalhes.innerHTML = `
    <div class="veiculo-capa-container">
      <img src="${veiculo.imagem || "/assets/logo.png"}" alt="Imagem do veículo" class="veiculo-imagem-detalhes"/>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:12px;">
      <h1 class="veiculo-titulo">${veiculo.marca} ${veiculo.modelo}</h1>

      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button id="btn-favorito" class="btn-favorito" type="button">⭐ Favoritar</button>
        <a class="btn-favoritos-link" href="/pages/favoritos/favoritos.html">Ver Favoritos</a>
      </div>
    </div>

    <div class="info-grid" style="margin-top:12px;">
      <div class="info-item">
        <span class="label">Marca</span>
        <span class="valor">${veiculo.marca}</span>
      </div>
      <div class="info-item">
        <span class="label">Modelo</span>
        <span class="valor">${veiculo.modelo}</span>
      </div>
      <div class="info-item">
        <span class="label">Ano</span>
        <span class="valor">${veiculo.ano}</span>
      </div>
    </div>

    <div class="info-item" style="margin-top:12px;">
      <span class="label">Descrição</span>
      <p class="valor">${veiculo.descricao}</p>
    </div>

    <div class="acoes-container" style="margin-top:16px;">
      <button class="btn btn-voltar" onclick="window.location.href='/'">Voltar</button>
    </div>
  `;

  const btnFavorito = document.getElementById("btn-favorito");
  renderBotaoFavorito(btnFavorito);

  btnFavorito.addEventListener("click", () => {
    if (usuarioLogado.isFavorito(idVeiculo)) {
      usuarioLogado.removerFavorito(idVeiculo);
    } else {
      usuarioLogado.adicionarFavorito(idVeiculo);
    }
    salvarUsuario(usuarioLogado);
    renderBotaoFavorito(btnFavorito);
  });
});
