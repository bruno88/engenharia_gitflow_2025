import ArmazenamentoUsuario from "../../models/usuarios/ArmazenamentoUsuario.js";
import ArmazenamentoVeiculo from "../../models/veiculos/ArmazenamentoVeiculo.js";


ArmazenamentoVeiculo.carregar();
const user = ArmazenamentoUsuario.obterUsuarioLogado();
if(!user){
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/pages/login/login.html";
}
const urlParams = new URLSearchParams(window.location.search);
const veiculoId = urlParams.get("id");
const detalhes = document.getElementById("detalhes-veiculo");
const veiculos = ArmazenamentoVeiculo.listarVeiculos();
const veiculo = veiculos.find(v => v.id === veiculoId);


window.onload = function () {
    if (!veiculo) {
        detalhes.innerHTML = "<p>Veículo não encontrado.</p>";
    } else if(user.role == 'adm') {
        let div = document.createElement("div");
        div.innerHTML = `
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
                        <label class="label" for="imagem">URL da Imagem</label>
                        <input class="input-field" type="text" id="imagem" value="${veiculo.imagem}" />
                    </div>

                    <div class="acoes-container">
                        <button class="btn btn-salvar" id="salvar-btn">Salvar Edição</button>
                        <button class="btn btn-excluir" id="excluir-btn">Excluir Veículo</button>
                    </div>
        `;
        detalhes.appendChild(div);
    }else{
        let div = document.createElement("div");
        div.innerHTML = `
<div class="veiculo-capa-container">
                        <img src="${veiculo.imagem || "/assets/logo.png"}" alt="Imagem do veículo" class="veiculo-imagem-detalhes"/>
                    </div>
                    
                    <h1 class="veiculo-titulo">${veiculo.marca} ${veiculo.modelo}</h1>
                    
                    <div class="info-grid">
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

                    <div class="info-item">
                        <span class="label">Descrição</span>
                        <p class="valor">${veiculo.descricao}</p>
                    </div>

                    <div class="acoes-container">
                        <button class="btn btn-voltar" onclick="window.location.href='/index.html'">Voltar</button>
                    </div>
        `;
        detalhes.appendChild(div);
    }

    const excluirBtn = document.getElementById("excluir-btn");

    excluirBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir este veículo?")) {
            ArmazenamentoVeiculo.apagarVeiculo(veiculo.id);
            window.location.href = "/index.html";
        }
    });

    const salvarBtn = document.getElementById("salvar-btn");
    
    salvarBtn.addEventListener("click", () => {
        veiculo.marca = document.getElementById("marca").value;
        veiculo.modelo = document.getElementById("modelo").value;
        veiculo.ano = parseInt(document.getElementById("ano").value);
        veiculo.descricao = document.getElementById("descricao").value;
        veiculo.imagem = document.getElementById("imagem").value;
        ArmazenamentoVeiculo.atualizarVeiculo(veiculo);
        alert("Veículo atualizado com sucesso!");
        window.location.href = "/index.html";
    });
};



