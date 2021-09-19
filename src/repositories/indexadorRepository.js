const db = require('../../config/dbConnection');

const { BadRequestException } = require('../exceptions');

module.exports = class indexadorRepository {

    async inserirPagina(dadosPagina){       
        try {
            await db.client.connect();           
            const conn = db.client.db(db.dbName);                           
            const collection = conn.collection('historicoPagina');
            await collection.insertOne({
                titulo: dadosPagina.titulo,
                imagem: dadosPagina.imagem,
                preco: dadosPagina.preco,
                descricao: dadosPagina.descricao,
                url: dadosPagina.url,
                dataConsulta: Date.now()
            });
        } catch (err) {
            throw new BadRequestException('Erro ao salvar a página'); 
        } 
    }

    async buscarPagina(urlProduto){       
        try {
            await db.client.connect();
            const conn = db.client.db(db.dbName);                           
            const collection = conn.collection('historicoPagina');
            const result = await collection.find({ url: urlProduto }).toArray();
            return result;
        } catch (err) {
            throw new BadRequestException('Erro ao buscar dados da página'); 
        } 
    }
}