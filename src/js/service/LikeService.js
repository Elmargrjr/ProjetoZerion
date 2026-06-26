// ================================================
// LikeService.js — src/js/service/
// ================================================
const LikeRepository = require('../repository/LikeRepository');

// Classe que gerencia like service

class LikeService {

    // Executa a ação de curtir

    async curtir(post_id, usuario_id) {
        return await LikeRepository.curtir(post_id, usuario_id);
    }

    // Executa a ação de listar por usuario

    async listarPorUsuario(usuario_id, viewer_id) {
    const [posts] = await LikeRepository.buscarPostsCurtidosPorUsuario(usuario_id, viewer_id);
    return posts;
}

    // Executa a ação de descurtir

    async descurtir(post_id, usuario_id) {
        return await LikeRepository.descurtir(post_id, usuario_id);
    }

    // Executa a ação de contar

    async contar(post_id) {
        const [[resultado]] = await LikeRepository.contar(post_id);
        return resultado.total;
    }

    // Executa a ação de ja likeu

    async jaLikeu(post_id, usuario_id) {
        const [rows] = await LikeRepository.jaLikeu(post_id, usuario_id);
        return rows.length > 0;
    }
}

module.exports = new LikeService();