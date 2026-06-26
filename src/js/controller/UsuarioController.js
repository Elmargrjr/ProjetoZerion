// ================================================
// ZERION — UsuarioController.js
// Controller para rotas de usuario.
// ================================================

const UsuarioService = require('../service/UsuarioService');

// Classe que gerencia usuario controller

class UsuarioController {

    // Executa a ação de cadastrar

    async cadastrar(req, res) {
        try {
            const { nome, telefone, username, email, genero, senha } = req.body;
            await UsuarioService.cadastrar(nome, telefone, username, email, genero, senha);
            res.json({ msg: 'Cadastrado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao cadastrar' });
        }
    }

    // Executa a ação de login

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await UsuarioService.login(email, senha);
            if (!usuario) return res.status(401).json({ msg: 'Email ou senha inválidos' });
            res.json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro no servidor' });
        }
    }

    // Executa a ação de buscar

    async buscar(req, res) {
        try {
            const { termo } = req.query;
            const usuarios = await UsuarioService.buscar(termo || '');
            res.json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro na busca' });
        }
    }

    // Executa a ação de buscar por id

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await UsuarioService.buscarPorId(id);
            if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' });
            res.json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao buscar usuário' });
        }
    }

    // Executa a ação de atualizar foto

    async atualizarFoto(req, res) {
        try {
            const { id } = req.params;
            const { foto } = req.body;
            await UsuarioService.atualizarFoto(id, foto);
            res.json({ msg: 'Foto atualizada' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao atualizar foto' });
        }
    }
}

module.exports = new UsuarioController();
