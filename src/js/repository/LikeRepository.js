// src/js/repository/LikeRepository.js

const db = require('../../db/connection');

class LikeRepository {

    curtir(post_id, usuario_id) {
        const sql = 'INSERT IGNORE INTO likes (post_id, usuario_id) VALUES (?, ?)';
        return db.promise().query(sql, [post_id, usuario_id]);
    }

    descurtir(post_id, usuario_id) {
        const sql = 'DELETE FROM likes WHERE post_id = ? AND usuario_id = ?';
        return db.promise().query(sql, [post_id, usuario_id]);
    }

    contar(post_id) {
        const sql = 'SELECT COUNT(*) AS total FROM likes WHERE post_id = ?';
        return db.promise().query(sql, [post_id]);
    }

    jaLikeu(post_id, usuario_id) {
        const sql = 'SELECT id FROM likes WHERE post_id = ? AND usuario_id = ?';
        return db.promise().query(sql, [post_id, usuario_id]);
    }

    buscarPostsCurtidosPorUsuario(usuario_id, viewer_id) {
        const uid = viewer_id || 0;
        const sql = `
            SELECT
                posts.id,
                posts.usuario_id,
                posts.conteudo,
                posts.imagem,
                posts.criado_em,
                usuarios.username,
                usuarios.foto_perfil,
                usuarios.verificado,
                NULL AS repostado_por,
                NULL AS repostado_por_id,
                posts.criado_em AS ordem_tempo,
                (SELECT COUNT(*) FROM likes       WHERE likes.post_id       = posts.id) AS total_likes,
                (SELECT COUNT(*) FROM comentarios WHERE comentarios.post_id = posts.id) AS total_comentarios,
                (SELECT COUNT(*) FROM reposts     WHERE reposts.post_id     = posts.id) AS total_reposts,
                (SELECT COUNT(*) FROM likes       WHERE likes.post_id = posts.id AND likes.usuario_id = ?) AS ja_curtiu,
                (SELECT COUNT(*) FROM reposts     WHERE reposts.post_id = posts.id AND reposts.usuario_id = ?) AS ja_repostou
            FROM likes
            JOIN posts    ON likes.post_id    = posts.id
            JOIN usuarios ON posts.usuario_id = usuarios.id
            WHERE likes.usuario_id = ?
            ORDER BY likes.criado_em DESC
        `;
        return db.promise().query(sql, [uid, uid, usuario_id]);
    }
}

module.exports = new LikeRepository();