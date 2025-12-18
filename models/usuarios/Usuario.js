export default class Usuario {
  #id;
  #role;
  #nome;
  #email;
  #senha;
  #favoritos;

  constructor(nome, email, senha, role = 'cliente', id = null, favoritos = []) {
    this.#id = id || crypto.randomUUID();
    this.#nome = nome;
    this.#email = email;
    this.#senha = senha;
    this.#role = role;
    this.#favoritos = Array.isArray(favoritos) ? favoritos : [];
  }

  get id() { return this.#id; }
  get role() { return this.#role; }
  get nome() { return this.#nome; }
  get email() { return this.#email; }
  get senha() { return this.#senha; }

  get favoritos() { return this.#favoritos; }

  adicionarFavorito(idVeiculo) {
    if (!this.#favoritos.includes(idVeiculo)) this.#favoritos.push(idVeiculo);
  }

  removerFavorito(idVeiculo) {
    this.#favoritos = this.#favoritos.filter(id => id !== idVeiculo);
  }

  isFavorito(idVeiculo) {
    return this.#favoritos.includes(idVeiculo);
  }

  toJSON() {
    return {
      id: this.#id,
      role: this.#role,
      nome: this.#nome,
      email: this.#email,
      senha: this.#senha,
      favoritos: this.#favoritos
    };
  }

  static fromJSON(obj) {
    return new Usuario(
      obj.nome,
      obj.email,
      obj.senha,
      obj.role,
      obj.id,
      obj.favoritos || []
    );
  }
}
