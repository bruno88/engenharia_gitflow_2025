import Usuario from "../../models/usuarios/Usuario.js";
import ArmazenamentoUsuario from "../../models/usuarios/ArmazenamentoUsuario.js";

// Carregar dados existentes ao abrir a página
ArmazenamentoUsuario.carregar();
 localStorage.removeItem('usuarioLogado');
        ArmazenamentoUsuario.logout();
// --- Lógica de Cadastro ---
const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipoContaInput = document.querySelector(
        'input[name="tipo-conta"]:checked'
    );

    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;

    try {
        if (!tipoContaInput) {
            throw new Error("Selecione um tipo de conta válido.");
        }

        const tipoConta = tipoContaInput.value; // adm ou cliente
        const novoUsuario = new Usuario(nome, email, senha, tipoConta);
        ArmazenamentoUsuario.cadastrarUsuario(novoUsuario);
        if (tipoConta === "adm") {
            alert("Cadastro de administrador realizado com sucesso! Faça login para continuar.");
        } else {
            alert("Cadastro de cliente realizado com sucesso! Faça login para continuar.");
        }
        formCadastro.reset();
        document.getElementById('login-email').focus();

    } catch (error) {
        alert("Erro ao cadastrar: " + error.message);
    }
});
const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    const sucesso = ArmazenamentoUsuario.login(email, senha);

    if (sucesso) {
        window.location.href = "/"; 
    } else {
        alert("Falha no login: " + "E-mail ou senha incorretos.")
        throw new Error("E-mail ou senha incorretos.");
    }
});