// src/js/service/ComentarioService.js
const ComentarioRepository = require('../repository/ComentarioRepository');

// Classe que gerencia comentario service

class ComentarioService {

    // Executa a ação de comentar

    async comentar(post_id, usuario_id, conteudo) {
        return await ComentarioRepository.salvar(post_id, usuario_id, conteudo);
    }

    // Executa a ação de listar por usuario

    async listarPorUsuario(usuario_id, viewer_id) {
    const [posts] = await ComentarioRepository.buscarPostsComentadosPorUsuario(usuario_id, viewer_id);
    return posts;
}

    // Executa a ação de listar

    async listar(post_id) {
        const [comentarios] = await ComentarioRepository.buscarPorPost(post_id);
        return comentarios;
    }

    // Executa a ação de contar

    async contar(post_id) {
        const [[resultado]] = await ComentarioRepository.contar(post_id);
        return resultado.total;
    }
}

module.exports = new ComentarioService();
