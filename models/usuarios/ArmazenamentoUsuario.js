import Usuario from "./Usuario.js";

export default class ArmazenamentoUsuario {
    static usuarios = [];
    static chaveStorage = 'usuarios_cadastrados';
    static chaveSessao = 'usuario_logado';

    // Carrega usuários do LocalStorage
    static carregar() {
        const dados = localStorage.getItem(this.chaveStorage);
        if (dados) {
            const lista = JSON.parse(dados);
            this.usuarios = lista.map(u => Usuario.fromJSON(u));
        }
    }

    static cadastrarUsuario(usuario) {
        this.carregar(); 
        const existe = this.usuarios.some(u => u.email === usuario.email);
        if (existe) {
            throw new Error("E-mail já cadastrado.");
        }

        this.usuarios.push(usuario);
        localStorage.setItem(this.chaveStorage, JSON.stringify(this.usuarios));

        console.log("Usuário salvo no LocalStorage:", usuario);
        console.log("Lista atual de usuários:", this.usuarios);
    }

    // Valida credenciais e cria sessão (Login)
    static login(email, senha) {
        this.carregar();
        const usuarioEncontrado = this.usuarios.find(u => u.email === email && u.senha === senha);
        if (usuarioEncontrado) {
            sessionStorage.setItem(this.chaveSessao, JSON.stringify(usuarioEncontrado));
            return true;
        }
        return false;
    }

    static obterUsuarioLogado() {
        const dados = sessionStorage.getItem(this.chaveSessao);
        return dados ? JSON.parse(dados) : null;
    }

    static logout() {
        sessionStorage.removeItem(this.chaveSessao);
    }
}