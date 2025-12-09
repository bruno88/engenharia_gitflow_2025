import Veiculo from "./Veiculo.js";

export default class ArmazenamentoVeiculo {

    static veiculos = [];
    //rode para carregar os veiculos do localstorage
    static carregar() {
        const dados = localStorage.getItem('veiculos');
        if (dados) {
            const lista = JSON.parse(dados);
            this.veiculos = lista.map(v => Veiculo.fromJSON(v));
        }
    }

    static salvarVeiculo(veiculo) {
        this.veiculos.push(veiculo);
        localStorage.setItem('veiculos', JSON.stringify(this.veiculos));
    }

    static apagarVeiculo(id) {
        this.veiculos = this.veiculos.filter(v => v.id !== id);
        localStorage.setItem('veiculos', JSON.stringify(this.veiculos));
    }
    
    static listarVeiculos() {
        return [...this.veiculos];
    }
}