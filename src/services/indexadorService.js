const puppeteer = require('puppeteer');
const ValidatorUtils = require('../utils/validatorUtils');
const IndexadorRepository = require('../repositories/indexadorRepository')

const { UnprocessableEntityException } = require('../exceptions');

let browser
let page


module.exports = class IndexadorService {

    constructor() {
        this.indexadorRepository = new IndexadorRepository();
    }

    async getProduto(urlProduto) {      
        try{            
            const historicoProduto = await this.indexadorRepository.buscarPagina(urlProduto);
            
            if (historicoProduto.length > 0){
                const dataConsulta = new Date(historicoProduto[0].dataConsulta);
                const dataAtual = new Date()
                const tempoConsulta = dataAtual.getMinutes() - dataConsulta.getMinutes()             
                
                if ( tempoConsulta <= 60 ){
                    return {
                        titulo: historicoProduto[0].titulo,
                        imagem: historicoProduto[0].imagem,
                        preco: historicoProduto[0].preco,
                        descricao: historicoProduto[0].descricao,
                        url: historicoProduto[0].url
                    }
                } 
            }
            
            browser = await puppeteer.launch();
            page = await browser.newPage();
            await page.goto(urlProduto);  
            
            let pageContent

            // Recuperar dados do produto
            if (urlProduto.indexOf('amazon.com.br') > 0){                    
                pageContent = await this.recuperaPaginaAmazon();
            } else if (urlProduto.indexOf('zattini.com.br') > 0){      
                pageContent = await this.recuperaPaginaZatinni();
            } else if (urlProduto.indexOf('saraiva.com.br') > 0){      
                pageContent = await this.recuperaPaginaSaraiva();
            } else {
                throw new NotFoundException('URL de produto inválida'); 
            }           

            await browser.close();

            const dadosPagina = {
                titulo: ValidatorUtils.removeHmltFormat(pageContent.titulo),
                imagem: pageContent.imagem,
                preco: Number(ValidatorUtils.removeHmltFormat(pageContent.preco).replace(',','.')),
                descricao: ValidatorUtils.removeHmltFormat(pageContent.descricao),
                url: urlProduto
            }

            await this.indexadorRepository.inserirPagina(dadosPagina);                

            return dadosPagina            
        } catch (err) {
            throw new UnprocessableEntityException(err.message); 
        }
    }

    async recuperaPaginaAmazon(){
        try{     
            return await page.evaluate(() => {
                return{
                    titulo : document.getElementById('productTitle').innerHTML,
                    preco: document.querySelector('.a-color-price').innerHTML,
                    descricao: document.getElementById('productDescription').getElementsByTagName('p')[0].innerHTML,
                    imagem: document.getElementById('landingImage').getAttribute('src')
                }
            });
        } catch (err) {
            throw new UnprocessableEntityException('Não foi possível recuperar os dados da página.'); 
        }
    }

    async recuperaPaginaZatinni(){
        try{ 
            return await page.evaluate(() => {
                return{
                    titulo : document.querySelector('.short-description').getElementsByTagName('h1')[0].innerHTML,                        
                    preco: document.querySelector('.default-price').getElementsByTagName('strong')[0].innerHTML,
                    descricao: document.getElementById('features').getElementsByTagName('p')[0].innerHTML,
                    imagem: document.getElementById('preview').getAttribute('data-image-hover')
                }
            });
        } catch (err) {
            throw new UnprocessableEntityException('Não foi possível recuperar os dados da página.'); 
        }
    }

    async recuperaPaginaSaraiva(){
        try{ 
            return await page.evaluate(() => {
                return{
                    titulo : document.querySelector('.title').innerHTML,                        
                    preco: document.querySelector('.price-destaque').innerHTML,
                    descricao: document.getElementById('descricao').innerHTML,
                    imagem: document.getElementById('product-1-item').getElementsByTagName('img')[0].getAttribute('src'),
                }
            });
        } catch (err) {
            throw new UnprocessableEntityException('Não foi possível recuperar os dados da página.'); 
        }
    }
}