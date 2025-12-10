export default class Veiculo {
    //pra vc que esta implementando a listagem de veículos, essa classe está usando fromJSOn e toJSON, que são métodos pra converter pra json e de json pra objeto
    #id
    #marca;
    #modelo;
    #ano;
    #imagem;
    #descricao;
    constructor(marca, modelo, ano, imagem, descricao, id = null) {
        this.#id = id ?? crypto.randomUUID();
        this.#marca = marca;
        this.#modelo = modelo;
        this.#ano = ano;
        this.#imagem = imagem;
        this.#descricao = descricao;
    }
    set marca(marca) {
        this.#marca = marca;
    }
    set modelo(modelo) {
        this.#modelo = modelo;
    }
    set ano(ano) {
        this.#ano = ano;
    }
    set descricao(descricao) {
        this.#descricao = descricao;
    }

    set imagem(imagem) {
        this.#imagem = imagem;
    }
    get id() {
        return this.#id;
    }
    get marca() {
        return this.#marca;
    }
    get modelo() {
        return this.#modelo;
    }
    get ano() {
        return this.#ano;
    }
    get imagem() {
        return this.#imagem;
    }
    get descricao() {
        return this.#descricao;
    }
    toJSON() {
        return {
            id: this.#id,
            marca: this.#marca,
            modelo: this.#modelo,
            ano: this.#ano,
            imagem: this.#imagem,
            descricao: this.#descricao
        };
    }
    static fromJSON(obj) {
        return new Veiculo(
            obj.marca,
            obj.modelo,
            obj.ano,
            obj.imagem,
            obj.descricao,
            obj.id
        );
    }
}