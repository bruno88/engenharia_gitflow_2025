import ArmazenamentoVeiculo from "./models/veiculos/ArmazenamentoVeiculo.js";

ArmazenamentoVeiculo.carregar();
const veiculos = ArmazenamentoVeiculo.listarVeiculos();
const containerLista = document.getElementById('lista-veiculos');
document.addEventListener('header:loaded', () => {
    const botaoBuscarVeiculo = document.getElementById('buscar-veiculo');
    if (!botaoBuscarVeiculo) return;

    botaoBuscarVeiculo.addEventListener('click', buscarVeiculo);});

//inicialização da variavel de busca ao carregar a página
window.onload = function() {
    const termo = localStorage.getItem("buscaVeiculo");

    if (termo) {
        executarBusca(termo);
        localStorage.removeItem("buscaVeiculo");
    }
};
//função chamada ao clicar no botão de busca
function buscarVeiculo(event) {
    event.preventDefault();
    const termoBusca = document.getElementById('termo-busca').value.toLowerCase();
    //salva o valor procurado no localStorage antes de redirecionar pro main
    localStorage.setItem("buscaVeiculo", termoBusca);
    const paginaAtual = window.location.pathname;

    if (paginaAtual !== "/") {
        window.location.href = "/";
        return;
    }

    // Se já estiver no index, executa a busca
    executarBusca(termoBusca);
}
//filtra e exibe os veículos conforme o termo buscado
function executarBusca(termoBusca) {
    const veiculosFiltrados = veiculos.filter(veiculo => 
        veiculo.marca.toLowerCase().includes(termoBusca) || 
        veiculo.modelo.toLowerCase().includes(termoBusca)
    );

    containerLista.innerHTML = '';

    if (veiculosFiltrados.length === 0) {
        containerLista.innerHTML = '<p class="mensagem-vazia">Nenhum veículo encontrado.</p>';
        return;
    }
    console.log(veiculosFiltrados);
    exibirVeiculos(veiculosFiltrados);
}

function criarCardVeiculo(veiculo) {
    const card = document.createElement('div');
    card.classList.add('veiculo-card');

    card.innerHTML = `
        <img src="${veiculo.imagem || '/assets/logo.png'}" alt="Imagem do veículo" class="veiculo-imagem">
        <div class="veiculo-info">
            <h3>${veiculo.marca} ${veiculo.modelo}</h3>
            <p>Ano: ${veiculo.ano}</p>
            <p>Descrição: ${veiculo.descricao}</p>
        </div>
    `;
    return card;
}

function exibirVeiculos(veiculosParaExibir = null) {
    containerLista.innerHTML = '';

    if (veiculos.length === 0) {
        containerLista.innerHTML = '<p class="mensagem-vazia">Nenhum veículo cadastrado.</p>';
        return;
    }

    veiculosParaExibir.forEach(veiculo => {
        const card = criarCardVeiculo(veiculo);
        containerLista.appendChild(card);
    });
}

exibirVeiculos(veiculos);