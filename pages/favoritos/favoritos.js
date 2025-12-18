import ArmazenamentoUsuario from "../../models/usuarios/ArmazenamentoUsuario.js";
import ArmazenamentoVeiculo from "../../models/veiculos/ArmazenamentoVeiculo.js";

ArmazenamentoUsuario.carregar();
ArmazenamentoVeiculo.carregar();

// Compatibilidade
function obterUsuarioLogado() {
  if (typeof ArmazenamentoUsuario.obterUsuarioLogado === "function") return ArmazenamentoUsuario.obterUsuarioLogado();
  if (typeof ArmazenamentoUsuario.getUsuarioLogado === "function") return ArmazenamentoUsuario.getUsuarioLogado();
  return null;
}
function salvarUsuario(usuario) {
  if (typeof ArmazenamentoUsuario.atualizar === "function") return ArmazenamentoUsuario.atualizar(usuario);
  if (typeof ArmazenamentoUsuario.atualizarUsuario === "function") return ArmazenamentoUsuario.atualizarUsuario(usuario);
}

const usuario = obterUsuarioLogado();
if (!usuario) {
  alert("Você precisa estar logado.");
  window.location.href = "/pages/login/login.html";
}

const lista = document.getElementById("favoritos-lista");
const veiculos = ArmazenamentoVeiculo.listarVeiculos();

const favoritos = (usuario.favoritos || [])
  .map(id => veiculos.find(v => v.id === id))
  .filter(Boolean);

if (favoritos.length === 0) {
  lista.innerHTML = `<p style="text-align:center;">Você ainda não favoritou nenhum veículo.</p>`;
} else {
  lista.innerHTML = favoritos.map(v => `
    <div class="veiculo-card">
      <img src="${v.imagem || "/assets/logo.png"}" alt="Veículo">
      <div class="veiculo-info">
        <h3>${v.marca} ${v.modelo}</h3>
        <p><strong>Ano:</strong> ${v.ano}</p>
        <p>${v.descricao || ""}</p>

        <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
          <a class="btn-favoritos-link" href="/pages/detalhes-veiculo/detalhes-veiculo.html?id=${v.id}">Ver detalhes</a>
          <button class="btn-favorito is-favorito" data-id="${v.id}" type="button">❌ Remover</button>
        </div>
      </div>
    </div>
  `).join("");

  lista.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      usuario.removerFavorito(id);
      salvarUsuario(usuario);
      window.location.reload();
    });
  });
}
