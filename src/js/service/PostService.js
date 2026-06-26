// ================================================
// ZERION — PostService.js
// Service com lógica de negócio para post.
// ================================================

const PostRepository = require('../repository/PostRepository');
const Post           = require('../model/Post');
 
// Classe que gerencia post service
 
class PostService {
 
    // Executa a ação de criar
 
    async criar(usuario_id, conteudo, imagem) {
        const post = new Post(null, usuario_id, conteudo, imagem);
        return await PostRepository.salvar(post);
    }
 
    // Executa a ação de deletar
 
    async deletar(post_id, usuario_id) {
        return await PostRepository.deletar(post_id, usuario_id);
    }
 
    // Executa a ação de listar todos
 
    async listarTodos(usuario_id) {
        const [posts] = await PostRepository.buscarTodos(usuario_id);
        return posts;
    }
 
    // Executa a ação de listar por usuario
 
    async listarPorUsuario(usuario_id, viewer_id) {
        const [posts] = await PostRepository.buscarPorUsuario(usuario_id, viewer_id);
        return posts;
    }
    
    // Executa a ação de listar curtidos por usuario
    
    async listarCurtidosPorUsuario(usuario_id, viewer_id) {
        const [posts] = await PostRepository.buscarCurtidosPorUsuario(usuario_id, viewer_id);
        return posts;
    }
 
    // Executa a ação de listar comentados por usuario
 
    async listarComentadosPorUsuario(usuario_id, viewer_id) {
        const [posts] = await PostRepository.buscarComentadosPorUsuario(usuario_id, viewer_id);
        return posts;
    }
}
 
module.exports = new PostService();