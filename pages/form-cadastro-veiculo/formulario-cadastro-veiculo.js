import Veiculo from "../../models/veiculos/Veiculo.js";
import ArmazenamentoVeiculo from "../../models/veiculos/ArmazenamentoVeiculo.js";
ArmazenamentoVeiculo.carregar(); // carrega os dados de veiculo que estão em localstorage pro vetor static da classe
let user = ArmazenamentoVeiculo.obterUsuarioLogado();
if (!user) {
    alert("Você precisa estar logado para cadastrar um veículo.");
    window.location.href = "/pages/login/login.html";
}
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = Number(document.getElementById("ano").value);
    const imagem = document.getElementById("imagem").value || null;
    const descricao = document.getElementById("descricao").value;

    const novoVeiculo = new Veiculo(marca, modelo, ano, imagem, descricao);
    ArmazenamentoVeiculo.salvarVeiculo(novoVeiculo);

    alert("Veículo cadastrado com sucesso!");
    event.target.reset();
});
