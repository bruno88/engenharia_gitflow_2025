export default class RepositorioAvaliacoes {
  static obterAvaliacoes() {
    return JSON.parse(localStorage.getItem("avaliacoes")) || [];
  }

  static salvarAvaliacao(avaliacao) {
    const avaliacoes = this.obterAvaliacoes();
    avaliacoes.push(avaliacao);
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  }
}
