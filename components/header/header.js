import ArmazenamentoUsuario from "../../models/usuarios/ArmazenamentoUsuario.js";
document.addEventListener('header:loaded', () => {
    const menu = document.getElementById('menu-dinamico');
    if (!menu) return;

    const usuarioLogado = ArmazenamentoUsuario.obterUsuarioLogado();
    

    const linksBase = `
        <li><a href="/">Home</a></li>
        <li><a href="/pages/about-us/about-us.html">Sobre</a></li>
        <li><a href="/pages/servicos/servicos.html">Serviços</a></li>
        <li><a href="/pages/contato/contato.html">Contato</a></li>
        <li><a href="/pages/tecnologias/tecnologias.html">Tecnologia</a></li>
    `;

    // DESLOGADO
    if (!usuarioLogado) {
        menu.innerHTML = `
            ${linksBase}
            <li><a href="/pages/login/login.html">Login</a></li>
        `;
        return;
    }

    // ADMIN
    if (usuarioLogado.role === 'adm') {
        menu.innerHTML = `
            ${linksBase}
            <li><a href="/pages/form-cadastro-veiculo/formulario-cadastro-veiculo.html">Cadastrar Veículo</a></li>
            <li><a href="/pages/admin/dashboard.html">Admin</a></li>
            <li><a href="#" id="logout">Sair</a></li>
        `;
    }
    // USUÁRIO
    else {
        menu.innerHTML = `
            ${linksBase}
            <li><a href="/pages/form-cadastro-veiculo/formulario-cadastro-veiculo.html">Cadastrar Veículo</a></li>
            <li><a href="/pages/perfil/perfil.html">Perfil</a></li>
            <li><a href="#" id="logout">Sair</a></li>
        `;
    }

    // Logout
    document.getElementById('logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        ArmazenamentoUsuario.logout();
        window.location.href = "/pages/login/login.html";
    });

});

document.addEventListener('header:loaded', () => {
    const menu = document.getElementById('menu-dinamico');
    if (!menu) return;

    let usuarioLogado = ArmazenamentoUsuario.obterUsuarioLogado();

    const linksBase = `
        <li><a href="/">Home</a></li>
        <li><a href="/pages/about-us/about-us.html">Sobre</a></li>
        <li><a href="/pages/servicos/servicos.html">Serviços</a></li>
        <li><a href="/pages/contato/contato.html">Contato</a></li>
        <li><a href="/pages/tecnologias/tecnologias.html">Tecnologia</a></li>
    `;

    if (!usuarioLogado) {
        menu.innerHTML = `
            ${linksBase}
            <li><a href="/pages/login/login.html">Login</a></li>
        `;
        return;
    }

    if (usuarioLogado.role === 'adm') {
        menu.innerHTML = `
            ${linksBase}
            <li><a href="/pages/form-cadastro-veiculo/formulario-cadastro-veiculo.html">Cadastrar Veículo</a></li>
            <li><a href="/pages/pagina-perfil/pagina-perfil.html">Perfil</a></li>
            <li><a href="#" id="logout">Sair</a></li>
        `;
    } else if(usuarioLogado.role === 'cliente') {
        menu.innerHTML = `
            ${linksBase}
            <li><a href="/pages/pagina-perfil/pagina-perfil.html">Perfil</a></li>
            <li><a href="#" id="logout">Sair</a></li>
        `;
    }

    ativarLogout();
});

function ativarLogout() {
    const btnLogout = document.getElementById('logout');
    if (!btnLogout) return;

    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();

        ArmazenamentoUsuario.logout();
        window.location.href = "/pages/login/login.html";
    });
}