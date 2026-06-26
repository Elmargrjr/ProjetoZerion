// ================================================
// RepostService.js — src/js/service/
// ================================================
const RepostRepository = require('../repository/RepostRepository');

// Classe que gerencia repost service

class RepostService {

    // Executa a ação de repostar

    async repostar(post_id, usuario_id) {
        return await RepostRepository.repostar(post_id, usuario_id);
    }

    // Executa a ação de desfazer

    async desfazer(post_id, usuario_id) {
        return await RepostRepository.desfazerRepost(post_id, usuario_id);
    }

    // Executa a ação de checar

    async checar(post_id, usuario_id) {
        const [rows] = await RepostRepository.checar(post_id, usuario_id);
        return rows.length > 0;
    }

    // Executa a ação de contar

    async contar(post_id) {
        const [[res]] = await RepostRepository.contar(post_id);
        return res.total;
    }
}

module.exports = new RepostService();