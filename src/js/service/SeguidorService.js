// ================================================
// ZERION — SeguidorService.js
// Service com lógica de negócio para seguidor.
// ================================================

const SeguidorRepository = require('../repository/SeguidorRepository');

// Classe que gerencia seguidor service

class SeguidorService {

    // Executa a ação de seguir

    async seguir(seguidor_id, seguindo_id) {
        return await SeguidorRepository.seguir(seguidor_id, seguindo_id);
    }

    // Executa a ação de desseguir

    async desseguir(seguidor_id, seguindo_id) {
        return await SeguidorRepository.desseguir(seguidor_id, seguindo_id);
    }

    // Executa a ação de listar seguidores

    async listarSeguidores(usuario_id) {
    const [usuarios] = await SeguidorRepository.listarSeguidores(usuario_id);
    return usuarios;
}
 
// Executa a ação de listar seguindo
 
async listarSeguindo(usuario_id) {
    const [usuarios] = await SeguidorRepository.listarSeguindo(usuario_id);
    return usuarios;
}

    // Executa a ação de contar

    async contar(usuario_id) {
        const [rows] = await SeguidorRepository.contar(usuario_id);
        return rows[0]; // retorna { seguidores: X, seguindo: Y }
    }

    // Executa a ação de checar

    async checar(seguidor_id, seguindo_id) {
        const [rows] = await SeguidorRepository.checar(seguidor_id, seguindo_id);
        return rows.length > 0;
    }
}

module.exports = new SeguidorService();