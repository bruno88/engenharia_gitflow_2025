import Avaliacao from "../models/avaliacao/Avaliacao.js";
import RepositorioAvaliacoes from "../models/avaliacao/RepositorioAvaliacoes.js";

// verifica se existe usuário logado
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  alert("Você precisa estar logado para avaliar a loja.");
  window.location.href = "../pages/login/login.html";
}

const form = document.getElementById("form-avaliacao");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nota = document.getElementById("nota").value;
  const comentario = document.getElementById("comentario").value;

  const avaliacao = new Avaliacao(
    usuarioLogado.nome,
    nota,
    comentario
  );

  RepositorioAvaliacoes.salvarAvaliacao(avaliacao);

  alert("Avaliação enviada com sucesso!");
  form.reset();
});
