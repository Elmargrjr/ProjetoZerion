// ================================================
// NotificacaoService.js — src/js/service/
// ================================================

const NotificacaoRepository = require('../repository/NotificacaoRepository');

// Classe que gerencia notificacao service

class NotificacaoService {

    // Executa a ação de criar

    async criar(usuario_id, ator_id, tipo, post_id = null) {
        return await NotificacaoRepository.criar(usuario_id, ator_id, tipo, post_id);
    }

    // Executa a ação de deletar

    async deletar(usuario_id, ator_id, tipo, post_id = null) {
        return await NotificacaoRepository.deletar(usuario_id, ator_id, tipo, post_id);
    }

    // Executa a ação de listar

    async listar(usuario_id) {
        const [notifs] = await NotificacaoRepository.listarPorUsuario(usuario_id);
        return notifs;
    }

    // Executa a ação de contar nao lidas

    async contarNaoLidas(usuario_id) {
        const [[resultado]] = await NotificacaoRepository.contarNaoLidas(usuario_id);
        return resultado.total;
    }

    // Executa a ação de marcar todas lidas

    async marcarTodasLidas(usuario_id) {
        return await NotificacaoRepository.marcarTodasLidas(usuario_id);
    }

    // Executa a ação de buscar dono do posto

    async buscarDonoDoPosto(post_id) {
        const [[post]] = await NotificacaoRepository.buscarDonoDoPosto(post_id);
        return post ? post.usuario_id : null;
    }
}

module.exports = new NotificacaoService();