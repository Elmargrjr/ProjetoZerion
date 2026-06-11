// src/js/repository/ComentarioRepository.js

const db = require('../../db/connection');

class ComentarioRepository {

    salvar(post_id, usuario_id, conteudo) {
        const sql = 'INSERT INTO comentarios (post_id, usuario_id, conteudo) VALUES (?, ?, ?)';
        return db.promise().query(sql, [post_id, usuario_id, conteudo]);
    }

    buscarPorPost(post_id) {
        const sql = `
            SELECT
                comentarios.id,
                comentarios.conteudo,
                comentarios.criado_em,
                comentarios.usuario_id,
                usuarios.username,
                usuarios.foto_perfil
            FROM comentarios
            JOIN usuarios ON comentarios.usuario_id = usuarios.id
            WHERE comentarios.post_id = ?
            ORDER BY comentarios.criado_em ASC
        `;
        return db.promise().query(sql, [post_id]);
    }

    contar(post_id) {
        const sql = 'SELECT COUNT(*) AS total FROM comentarios WHERE post_id = ?';
        return db.promise().query(sql, [post_id]);
    }

    buscarPostsComentadosPorUsuario(usuario_id, viewer_id) {
        const uid = viewer_id || 0;
        const sql = `
            SELECT DISTINCT
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
            FROM comentarios
            JOIN posts    ON comentarios.post_id  = posts.id
            JOIN usuarios ON posts.usuario_id     = usuarios.id
            WHERE comentarios.usuario_id = ?
            ORDER BY posts.criado_em DESC
        `;
        return db.promise().query(sql, [uid, uid, usuario_id]);
    }
}

module.exports = new ComentarioRepository();