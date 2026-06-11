// src/js/controller/MensagemController.js

const MensagemService = require('../service/MensagemService');

class MensagemController {

    async enviar(req, res) {
        try {
            const { remetente_id, destinatario_id, conteudo } = req.body;
            await MensagemService.enviar(remetente_id, destinatario_id, conteudo);
            res.json({ msg: 'Mensagem enviada' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao enviar mensagem' });
        }
    }

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

    async conversa(req, res) {
        try {
            const { id } = req.params;
            const { meu_id } = req.query;
            const mensagens = await MensagemService.conversa(meu_id, id);
            res.json(mensagens);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao buscar conversa' });
        }
    }
}

module.exports = new MensagemController();