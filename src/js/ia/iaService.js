// ================================================
// ZERION — iaService.js
// Código de IA para geração de conteúdo e seleção de personagens.
// ================================================

require('dotenv').config();
const Anthropic   = require('@anthropic-ai/sdk');
const personagens = require('./personagens');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_KEY });

const grupos = {
    tecnologia:    ['tony_stark', 'peter_parker', 'sheldon_cooper', 'howard_wolowitz', 'doc_brown', 'marty_mcfly'],
    caos:          ['deadpool', 'the_joker', 'captainjacksparrow', 'ace_ventura', 'bart_simpson', 'crowley_hell'],
    poder:         ['klausmikaelson', 'damon_salvatore', 'darth_vader', 'thomas_shelby', 'gus_fring', 'heisenberg', 'cersei_lannister', 'negan_twd'],
    sabedoria:     ['albus_dumbledore', 'mestre_yoda', 'obi_wan_kenobi', 'hermione_granger', 'tyrion_lannister', 'sherlock_holmes', 'elijah_mikaelson'],
    sobrevivencia: ['rick_grimes', 'daryl_dixon', 'carol_twd', 'geralt_of_rivia', 'dean_winchester', 'arya_stark'],
    drama:         ['stefan_salvatore', 'edward_cullen', 'katherine_pierce', 'cersei_lannister', 'loki_odinson', 'gomez_addams'],
    humor:         ['michael_scott', 'dwight_schrute', 'chandler_bing', 'joey_tribbiani', 'homer_simpson', 'phil_dunphy', 'jaskier_bard'],
    misterio:      ['sherlock_holmes', 'jim_moriarty', 'bruce_wayne', 'alfred_pennyworth', 'wednesday_addams', 'gus_fring'],
};
// Função para detectar grupo

function detectarGrupo(conteudo) {
    const texto = conteudo.toLowerCase();

    if (texto.match(/tecnolog|stark|armadura|ciência|físic|invenç|código|program|computador|engenharia/))
        return 'tecnologia';
    if (texto.match(/caos|destruiç|explodir|bagunça|loucura|rum|navio|plano/))
        return 'caos';
    if (texto.match(/poder|controle|império|negócio|domín|autoridade|família|dinheiro/))
        return 'poder';
    if (texto.match(/sabedor|livro|conhecimento|aprender|filosofia|força|destino|escolha/))
        return 'sabedoria';
    if (texto.match(/sobreviv|luta|batalha|perigo|arma|caçar|monstro|apocalipse/))
        return 'sobrevivencia';
    if (texto.match(/amor|coração|saudade|sentimento|solidão|imortal|anos|tempo/))
        return 'drama';
    if (texto.match(/engraçad|piada|chefe|trabalho|escritório|amigo|cerveja|donut/))
        return 'humor';
    if (texto.match(/mistério|segredo|escuridão|noite|plano|jogo|morte/))
        return 'misterio';

    return null;
}

// Classe que gerencia ia service

class IaService {

    // Executa a ação de gerar post

    async gerarPost(username) {
        const personagem = personagens[username];
        if (!personagem) return null;

        try {
            const resposta = await client.messages.create({
                model:      'claude-haiku-4-5-20251001',
                max_tokens: 120,
                system:     personagem.prompt,
                messages: [{
                    role:    'user',
                    content: 'Crie um post curto e espontâneo para uma rede social no seu estilo. Apenas o texto do post, sem aspas, sem explicações. Máximo 2 frases.'
                }]
            });

            return resposta.content[0].text;
        } catch (erro) {
            console.error(`Erro ao gerar post para ${username}:`, erro);
            return null;
        }
    }

    // Executa a ação de gerar comentario

    async gerarComentario(usernameComentador, conteudoPost, usernameAutorPost) {
        const personagem = personagens[usernameComentador];
        if (!personagem) return null;

        try {
            const resposta = await client.messages.create({
                model:      'claude-haiku-4-5-20251001',
                max_tokens: 80,
                system:     personagem.prompt,
                messages: [{
                    role:    'user',
                    content: `${usernameAutorPost} postou: "${conteudoPost}". Comente em 1 frase no seu estilo. Só o texto, sem aspas.`
                }]
            });

            return resposta.content[0].text;
        } catch (erro) {
            console.error(`Erro ao gerar comentário para ${usernameComentador}:`, erro);
            return null;
        }
    }

    // Executa a ação de gerar resposta thread

    async gerarRespostaThread(usernameComentador, conteudoPost, comentarioAnterior, usernameAutorComentario) {
        const personagem = personagens[usernameComentador];
        if (!personagem) return null;

        try {
            const resposta = await client.messages.create({
                model:      'claude-haiku-4-5-20251001',
                max_tokens: 80,
                system:     personagem.prompt,
                messages: [{
                    role:    'user',
                    content: `O post foi: "${conteudoPost}". ${usernameAutorComentario} comentou: "${comentarioAnterior}". Responda ao comentário em 1 frase no seu estilo. Só o texto, sem aspas.`
                }]
            });

            return resposta.content[0].text;
        } catch (erro) {
            console.error(`Erro ao gerar resposta de thread para ${usernameComentador}:`, erro);
            return null;
        }
    }

    getGrupoParaPost(conteudo, todosIds, autorId) {
        const grupoDetectado = detectarGrupo(conteudo);
        const usernames = grupoDetectado ? grupos[grupoDetectado] : null;

        if (!usernames) return null;
        return usernames;
    }

    detectarGrupo(conteudo) {
        return detectarGrupo(conteudo);
    }

    grupos() {
        return grupos;
    }

    listarPersonagens() {
        return Object.keys(personagens);
    }

    ehPersonagem(username) {
        const limpo = username.replace('@', '');
        return Object.keys(personagens).includes(limpo);
    }
}

module.exports = new IaService();