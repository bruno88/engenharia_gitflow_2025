import ArmazenamentoVeiculo from "./models/veiculosArmazenamentoVeiculo.js";

ArmazenamentoVeiculo.carregar();

const containerLista = document.getElementById('lista-veiculos');

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

function exibirVeiculos() {
    const veiculos = ArmazenamentoVeiculo.listarVeiculos();

    containerLista.innerHTML = '';

    if (veiculos.length === 0) {
        containerLista.innerHTML = '<p class="mensagem-vazia">Nenhum veículo cadastrado.</p>';
        return;
    }

    veiculos.forEach(veiculo => {
        const card = criarCardVeiculo(veiculo);
        containerLista.appendChild(card);
    });
}

exibirVeiculos();