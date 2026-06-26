// ================================================
// ZERION — RepostController.js
// Controller para rotas de repost.
// ================================================

const RepostServiceInstance = require('../service/RepostService');
const NotificacaoServiceR   = require('../service/NotificacaoService');

// Classe que gerencia repost controller

class RepostController {

    // Executa a ação de repostar

    async repostar(req, res) {
        try {
            const { post_id, usuario_id } = req.body;
            await RepostServiceInstance.repostar(post_id, usuario_id);
            const total = await RepostServiceInstance.contar(post_id);

            // Notifica o dono do post
            const dono = await NotificacaoServiceR.buscarDonoDoPosto(post_id);
            if (dono) await NotificacaoServiceR.criar(dono, usuario_id, 'repost', post_id);

            res.json({ total, repostado: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao repostar' });
        }
    }

    // Executa a ação de desfazer

    async desfazer(req, res) {
        try {
            const { post_id, usuario_id } = req.body;
            await RepostServiceInstance.desfazer(post_id, usuario_id);
            const total = await RepostServiceInstance.contar(post_id);

            // Remove notificação de repost
            const dono = await NotificacaoServiceR.buscarDonoDoPosto(post_id);
            if (dono) await NotificacaoServiceR.deletar(dono, usuario_id, 'repost', post_id);

            res.json({ total, repostado: false });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao desfazer repost' });
        }
    }
}

module.exports = new RepostController();