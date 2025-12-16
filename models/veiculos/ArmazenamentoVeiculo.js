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

    static ordenarPorAno(veiculos, ordem) {
        if (!ordem)
            return veiculos;

        return [...veiculos].sort((a, b) => {
            switch (ordem) {
                case "crescente":
                    return a.ano - b.ano;
                case "decrescente":
                    return b.ano - a.ano;
            }
        });
    }

    static ordenarPorNome(veiculos, ordem) {
        if (!ordem)
            return veiculos;

        return [...veiculos].sort((a, b) => {
            switch (ordem) {
                case "crescente":
                    return a.modelo.localeCompare(b.modelo);
                case "decrescente":
                    return b.modelo.localeCompare(a.modelo);
            }
        });
    }

    static filtrarVeiculos(veiculos, filtroAno = null, filtroNome = null) {
        let resultado = [...veiculos];

        if (filtroAno) {
            resultado = this.ordenarPorAno(resultado, filtroAno);
        }

        if (filtroNome) {
            resultado = this.ordenarPorNome(resultado, filtroNome);
        }

        return resultado;
    }
}