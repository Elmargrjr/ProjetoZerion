// ================================================
// NotificacaoController.js — src/js/controller/
// ================================================

const NotificacaoServiceInstance = require('../service/NotificacaoService');

// Classe que gerencia notificacao controller

class NotificacaoController {

    // Executa a ação de listar

    async listar(req, res) {
        try {
            const { usuario_id } = req.params;
            const notifs = await NotificacaoServiceInstance.listar(usuario_id);
            res.json(notifs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao listar notificações' });
        }
    }

    // Executa a ação de contar nao lidas

    async contarNaoLidas(req, res) {
        try {
            const { usuario_id } = req.params;
            const total = await NotificacaoServiceInstance.contarNaoLidas(usuario_id);
            res.json({ total });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao contar notificações' });
        }
    }

    // Executa a ação de marcar lidas

    async marcarLidas(req, res) {
        try {
            const { usuario_id } = req.params;
            await NotificacaoServiceInstance.marcarTodasLidas(usuario_id);
            res.json({ msg: 'Notificações marcadas como lidas' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao marcar notificações' });
        }
    }
}

module.exports = new NotificacaoController();
