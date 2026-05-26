class Comentario {
    constructor(id, post_id, usuario_id, conteudo) {
        this.id = id;
        this.post_id = post_id
        this.usuario_id = usuario_id;
        this.conteudo = conteudo;

    }
}

module.exports = Comentario;