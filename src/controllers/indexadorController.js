'use strict';

const helpers = require("../helpers");
const indexadorService = require("../services/IndexadorService");
const ValidatorUtils = require('../utils/validatorUtils');

const { BadRequestException, UnprocessableEntityException } = require('../exceptions');

module.exports.getProduto = async (req, res) => {
    try {        
        if (ValidatorUtils.validaURL(req.body.url)){        
            throw new BadRequestException(`URL inválida`);    
        } if (ValidatorUtils.validaURLOrigem(req.body.url)) {
            throw new UnprocessableEntityException(`URL inválida: Somente são aceitas URL's provenientes da amazon.com.br, zattini.com.br ou saraiva.com.br`); 
        } else {
            const urlProduto = req.body.url;
            const result = await new indexadorService().getProduto(urlProduto);
            helpers.response.send(res, helpers.statusCode.OK, result);
        } 
    } catch (err) {
        helpers.response.error(res, err);
    }
}
