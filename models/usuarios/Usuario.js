export default class Usuario {
    #id;
    #role;
    #nome;
    #email;
    #senha;

    constructor(nome, email, senha, role = 'cliente', id = null) {
        this.#id = id || crypto.randomUUID();
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#role = role;
    }
    get role() { 
        return this.#role; 
    }
    set role(novaRole) { 
        this.#role = novaRole; 
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
            role: this.#role,
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
            obj.role,
            obj.id
        );
    }
}