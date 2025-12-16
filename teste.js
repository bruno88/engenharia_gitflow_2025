import ArmazenamentoVeiculo from "./models/veiculos/ArmazenamentoVeiculo.js";

ArmazenamentoVeiculo.carregar();

const veiculos = ArmazenamentoVeiculo.listarVeiculos();
const containerLista = document.getElementById("lista-veiculos");

document.addEventListener("header:loaded", () => {
    const botaoBuscarVeiculo = document.getElementById("buscar-veiculo");
    if (!botaoBuscarVeiculo) return;

    botaoBuscarVeiculo.addEventListener("click", buscarVeiculo);
});

document.addEventListener("DOMContentLoaded", () => {
    const termo = localStorage.getItem("buscaVeiculo");
    if (termo) {
        executarBusca(termo);
        localStorage.removeItem("buscaVeiculo");
    }

    const btFiltro = document.getElementById("btFiltro");
    btFiltro.addEventListener("click", aplicarFiltros);
});

function aplicarFiltros() {
    const filtroAno = document.getElementById("filtro-ano").value;
    const filtroNome = document.getElementById("filtro-nome").value;

    const veiculosBase = ArmazenamentoVeiculo.listarVeiculos();

    const veiculosFiltrados = ArmazenamentoVeiculo.filtrarVeiculos(
        veiculosBase,
        filtroAno,
        filtroNome
    );

    exibirVeiculos(veiculosFiltrados);
}

function buscarVeiculo(event) {
    event.preventDefault();

    const termoBusca = document
        .getElementById("termo-busca")
        .value.toLowerCase();

    localStorage.setItem("buscaVeiculo", termoBusca);

    if (window.location.pathname !== "/") {
        window.location.href = "/";
        return;
    }

    executarBusca(termoBusca);
}

function executarBusca(termoBusca) {
    const veiculosFiltrados = veiculos.filter(veiculo =>
        veiculo.marca.toLowerCase().includes(termoBusca) ||
        veiculo.modelo.toLowerCase().includes(termoBusca)
    );

    exibirVeiculos(veiculosFiltrados);
}

function criarCardVeiculo(veiculo) {
    const card = document.createElement("div");
    card.classList.add("veiculo-card");

    card.innerHTML = `
        <img src="${veiculo.imagem || "/assets/logo.png"}" 
             alt="Imagem do veículo" 
             class="veiculo-imagem">
        <div class="veiculo-info">
            <h3>${veiculo.marca} ${veiculo.modelo}</h3>
            <p>Ano: ${veiculo.ano}</p>
            <p>Descrição: ${veiculo.descricao}</p>
        </div>
    `;
    return card;
}

function exibirVeiculos(lista) {
    if (!containerLista) return;

    containerLista.innerHTML = "";

    if (!lista || lista.length === 0) {
        containerLista.innerHTML =
            '<p class="mensagem-vazia">Nenhum veículo encontrado.</p>';
        return;
    }

    lista.forEach(veiculo => {
        const card = criarCardVeiculo(veiculo);
        containerLista.appendChild(card);
    });
}

exibirVeiculos(veiculos);