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
    this.#favoritos = Array.isArray(favoritos) ? [...favoritos] : [];
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
  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get email() {
    return this.#email;
  }
  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get senha() {
    return this.#senha;
  }
  set senha(novaSenha) {
    this.#senha = novaSenha;
  }

  get favoritos() {
    return [...this.#favoritos];
  }
  set favoritos(lista) {
    this.#favoritos = Array.isArray(lista) ? [...lista] : [];
  }

  adicionarFavorito(idVeiculo) {
    const id = String(idVeiculo);
    if (!this.#favoritos.includes(id)) {
      this.#favoritos.push(id);
    }
  }

  removerFavorito(idVeiculo) {
    const id = String(idVeiculo);
    this.#favoritos = this.#favoritos.filter((v) => v !== id);
  }

  isFavorito(idVeiculo) {
    const id = String(idVeiculo);
    return this.#favoritos.includes(id);
  }

  toJSON() {
    return {
      id: this.#id,
      role: this.#role,
      nome: this.#nome,
      email: this.#email,
      senha: this.#senha,
      favoritos: [...this.#favoritos],
    };
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Usuario(
      obj.nome,
      obj.email,
      obj.senha,
      obj.role ?? 'cliente',
      obj.id ?? null,
      obj.favoritos ?? []
    );
  }
}
