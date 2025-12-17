import Usuario from "./Usuario.js";

export default class ArmazenamentoUsuario {
  static usuarios = [];
  static chaveStorage = "usuarios_cadastrados";
  static chaveSessao = "usuario_logado";

  // Carrega usuários do LocalStorage para o vetor static
  static carregar() {
    const dados = localStorage.getItem(this.chaveStorage);
    if (dados) {
      const lista = JSON.parse(dados);
      this.usuarios = lista.map((u) => Usuario.fromJSON(u)).filter(Boolean);
    } else {
      this.usuarios = [];
    }
  }

  static listarUsuarios() {
    this.carregar();
    return [...this.usuarios];
  }

  static cadastrarUsuario(usuario) {
    this.carregar();
    const existe = this.usuarios.some((u) => u.email === usuario.email);
    if (existe) {
      throw new Error("E-mail já cadastrado.");
    }

    this.usuarios.push(usuario);
    localStorage.setItem(this.chaveStorage, JSON.stringify(this.usuarios));
  }

  // Valida credenciais e cria sessão (Login)
  static login(email, senha) {
    this.carregar();
    const usuarioEncontrado = this.usuarios.find(
      (u) => u.email === email && u.senha === senha
    );
    if (usuarioEncontrado) {
      // grava sessão como JSON (persistindo favoritos também)
      sessionStorage.setItem(
        this.chaveSessao,
        JSON.stringify(usuarioEncontrado.toJSON())
      );
      return true;
    }
    return false;
  }

  static obterUsuarioLogado() {
    const dados = sessionStorage.getItem(this.chaveSessao);
    if (!dados) return null;
    try {
      return Usuario.fromJSON(JSON.parse(dados));
    } catch {
      return null;
    }
  }

  // Compatibilidade com páginas que usam getUsuarioLogado()
  static getUsuarioLogado() {
    return this.obterUsuarioLogado();
  }

  static logout() {
    sessionStorage.removeItem(this.chaveSessao);
  }

  // Atualiza usuário no LocalStorage + sessão (mantém chaves corretas)
  static atualizar(usuarioAtualizado) {
    this.carregar();

    const usuario =
      usuarioAtualizado instanceof Usuario
        ? usuarioAtualizado
        : Usuario.fromJSON(usuarioAtualizado);

    if (!usuario) return;

    const index = this.usuarios.findIndex((u) => u.id === usuario.id);
    if (index !== -1) {
      this.usuarios[index] = usuario;
      localStorage.setItem(this.chaveStorage, JSON.stringify(this.usuarios));
      sessionStorage.setItem(this.chaveSessao, JSON.stringify(usuario.toJSON()));
    }
  }

  // Compatibilidade com páginas que usam atualizarUsuario()
  static atualizarUsuario(usuarioAtualizado) {
    this.atualizar(usuarioAtualizado);
  }
}
