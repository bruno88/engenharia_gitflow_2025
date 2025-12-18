import ArmazenamentoUsuario from "../../models/usuarios/ArmazenamentoUsuario.js";
import ArmazenamentoVeiculo from "../../models/veiculos/ArmazenamentoVeiculo.js";

ArmazenamentoUsuario.carregar(); // carrega os dados de veiculo que estão em localstorage pro vetor static da classe
ArmazenamentoVeiculo.carregar();
let user = ArmazenamentoUsuario.obterUsuarioLogado();

document.addEventListener('DOMContentLoaded', () => {
  carregarDadosPerfil();
  document.querySelector('.perfil-form').addEventListener('submit', salvarDadosPerfil);
});
function carregarDadosPerfil() {
  if (!user) {
    alert("Você precisa estar logado.");
    window.location.href = "/pages/login/login.html";
    return;
  }

  document.querySelector("#nome").value = user.nome ?? "";
  document.querySelector("#email").value = user.email ?? "";

 document.querySelector("#senha").value = user.senha ?? "";
  document.querySelector("#role").value = user.role ?? "";
}
function salvarDadosPerfil(event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const senha = document.querySelector("#senha").value;
  const role = document.querySelector("#role").value;

  if (!nome || !email || !role) {
    alert("Nome, Email e Tipo de Conta são obrigatórios.");
    return;
  }

  // Atualiza o usuário logado
  user.nome = nome;
  user.email = email;
  user.role = role;

  // Só altera a senha se foi digitada
  if (senha) {
    user.senha = senha;
  }

  // Atualiza no armazenamento
  ArmazenamentoUsuario.atualizar(user);
  ArmazenamentoUsuario.logout();

  alert("Dados do perfil salvos com sucesso! Relogue para continuar.");
  window.location.href = "/pages/login/login.html";
}

const usuario = ArmazenamentoUsuario.getUsuarioLogado();
const veiculos = ArmazenamentoVeiculo.listarVeiculos();

const container = document.getElementById("favoritos");

usuario.favoritos.forEach(id => {
  const veiculo = veiculos.find(v => v.id == id);

  if (veiculo) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${veiculo.modelo}</h4>
      <p>${veiculo.marca}</p>
    `;
    container.appendChild(div);
  }
})