// src/js/repository/MensagemRepository.js

const db     = require('../../db/connection');
const crypto = require('crypto');

// ================================================
// CRIPTOGRAFIA AES-256-CBC
// Chave de 32 bytes lida do .env
// Adicione no .env: MSG_SECRET=zerion_mensagens_chave_secreta_32b
// ================================================

const ALGORITMO = 'aes-256-cbc';
const CHAVE     = crypto.scryptSync(
    process.env.MSG_SECRET || 'zerion_chave_padrao_32_bytes_aqui',
    'zerion_salt',
    32
);

function criptografar(texto) {
    const iv         = crypto.randomBytes(16);
    const cipher     = crypto.createCipheriv(ALGORITMO, CHAVE, iv);
    const criptograf = Buffer.concat([cipher.update(texto, 'utf8'), cipher.final()]);
    // Salva iv + conteúdo em base64 separados por ":"
    return iv.toString('hex') + ':' + criptograf.toString('hex');
}

function descriptografar(textoEncriptado) {
    try {
        const [ivHex, conteudoHex] = textoEncriptado.split(':');
        const iv       = Buffer.from(ivHex, 'hex');
        const conteudo = Buffer.from(conteudoHex, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITMO, CHAVE, iv);
        return Buffer.concat([decipher.update(conteudo), decipher.final()]).toString('utf8');
    } catch {
        // Se falhar na descriptografia retorna o texto original
        // (compatibilidade com mensagens antigas não criptografadas)
        return textoEncriptado;
    }
}

class MensagemRepository {

    enviar(remetente_id, destinatario_id, conteudo) {
        const conteudoCriptografado = criptografar(conteudo);
        const sql = 'INSERT INTO mensagens (remetente_id, destinatario_id, conteudo) VALUES (?, ?, ?)';
        return db.promise().query(sql, [remetente_id, destinatario_id, conteudoCriptografado]);
    }

    async buscarConversa(usuario1_id, usuario2_id) {
        const sql = `
            SELECT mensagens.*, usuarios.username AS remetente_username
            FROM mensagens
            JOIN usuarios ON mensagens.remetente_id = usuarios.id
            WHERE (remetente_id = ? AND destinatario_id = ?)
               OR (remetente_id = ? AND destinatario_id = ?)
            ORDER BY criado_em ASC
        `;
        const [msgs] = await db.promise().query(sql, [usuario1_id, usuario2_id, usuario2_id, usuario1_id]);

        // Descriptografa cada mensagem antes de retornar
        return [msgs.map(m => ({
            ...m,
            conteudo: descriptografar(m.conteudo)
        }))];
    }

    async listarConversas(usuario_id) {
        const sql = `
            SELECT
                u.id,
                u.username,
                u.foto_perfil,
                m.conteudo AS ultima_mensagem,
                m.criado_em
            FROM mensagens m
            JOIN usuarios u ON u.id = IF(m.remetente_id = ?, m.destinatario_id, m.remetente_id)
            WHERE m.id IN (
                SELECT MAX(m2.id)
                FROM mensagens m2
                WHERE m2.remetente_id = ? OR m2.destinatario_id = ?
                GROUP BY
                    LEAST(m2.remetente_id, m2.destinatario_id),
                    GREATEST(m2.remetente_id, m2.destinatario_id)
            )
            AND (m.remetente_id = ? OR m.destinatario_id = ?)
            ORDER BY m.criado_em DESC
        `;
        const [conversas] = await db.promise().query(sql, [usuario_id, usuario_id, usuario_id, usuario_id, usuario_id]);

        // Descriptografa a última mensagem de cada conversa
        return [conversas.map(c => ({
            ...c,
            ultima_mensagem: descriptografar(c.ultima_mensagem)
        }))];
    }
}

module.exports = new MensagemRepository();