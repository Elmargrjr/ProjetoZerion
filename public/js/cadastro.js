const telefone = document.getElementById('itelefone');
const usuario = document.getElementById('iusuario');
const form = document.getElementById('formCadastro'); 

const maskTelefone = IMask(telefone, {
    mask: '(00) 00000-0000',
});

const maskUsuario = IMask(usuario, {
    mask: '@********************',
    definitions: {
        '*': /[a-zA-Z0-9_]/,
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!maskTelefone.masked.isComplete) {
        telefone.style.borderColor = 'red';
        telefone.focus();
        return;
    } else {
      telefone.style.borderColor = 'green';
    }

    if (maskUsuario.unmaskedValue.length < 4) {
        usuario.style.borderColor = 'red';
        usuario.focus();
        return;
    } else {
      usuario.style.borderColor = 'green';
    }

    const nome = document.getElementById('inome').value;
    const email = document.getElementById('iemail').value;
    const genero = document.getElementById('igenero').value;
    const senha = document.getElementById('isenha').value;

    const resposta = await fetch('http://localhost:3000/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            nome, 
            telefone: maskTelefone.unmaskedValue,
            username: maskUsuario.value, 
            email, 
            genero, 
            senha 
        })
    });

    if (resposta.status === 200) {
        alert('Cadastro realizado! Faça login.');
        window.location.href = '/index.html';
    } else {
        alert('Erro ao cadastrar');
    }
});