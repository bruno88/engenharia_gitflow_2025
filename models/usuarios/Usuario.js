export default class Usuario {
    #id;
    #nome;
    #email;
    #senha;

    constructor(nome, email, senha, id = null) {
        this.#id = id ?? crypto.randomUUID();
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
    }

    get id() { 
        return this.#id; 
    }
    get nome() { 
        return this.#nome; 
    }
    get email() { 
        return this.#email; 
    }
    get senha() { 
        return this.#senha; 
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            senha: this.#senha
        };
    }

    static fromJSON(obj) {
        return new Usuario(
            obj.nome,
            obj.email,
            obj.senha,
            obj.id
        );
    }
}