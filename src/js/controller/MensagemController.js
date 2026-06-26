// ================================================
// MensagemController.js — src/js/controller/
// ================================================
const MensagemServiceInstance = require('../service/MensagemService');

// Classe que gerencia mensagem controller

class MensagemController {

    // Executa a ação de enviar

    async enviar(req, res) {
        try {
            const { remetente_id, destinatario_id, conteudo } = req.body;
            await MensagemServiceInstance.enviar(remetente_id, destinatario_id, conteudo);
            res.json({ msg: 'Mensagem enviada' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao enviar mensagem' });
        }
    }

    // Executa a ação de listar conversas

    async listarConversas(req, res) {
        try {
            const { id } = req.params;
            const conversas = await MensagemService.listarConversas(id);
            res.json(conversas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao listar conversas' });
        }
    }

    // Executa a ação de conversa

    async conversa(req, res) {
        try {
            const { id } = req.params;           // id do outro usuário
            const { meu_id } = req.query;
            const mensagens = await MensagemServiceInstance.conversa(meu_id, id);
            res.json(mensagens);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao buscar conversa' });
        }
    }

    async listarConversas(req, res) {
        try {
            const { id } = req.params;
            const conversas = await MensagemServiceInstance.listarConversas(id);
            res.json(conversas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao listar conversas' });
        }
    }
}

module.exports = new MensagemController();
