// ================================================
// MensagemService.js — src/js/service/
// ================================================
const MensagemRepository = require('../repository/MensagemRepository');

// Classe que gerencia mensagem service

class MensagemService {

    // Executa a ação de enviar

    async enviar(remetente_id, destinatario_id, conteudo) {
        return await MensagemRepository.enviar(remetente_id, destinatario_id, conteudo);
    }

    // Executa a ação de conversa

    async conversa(usuario1_id, usuario2_id) {
        const [msgs] = await MensagemRepository.buscarConversa(usuario1_id, usuario2_id);
        return msgs;
    }

    // Executa a ação de listar conversas

    async listarConversas(usuario_id) {
        const [conversas] = await MensagemRepository.listarConversas(usuario_id);
        return conversas;
    }
}

module.exports = new MensagemService();