const axios = require('axios');

let token = null;
const baseUrl = 'http://localhost:3000';

const request = (url, method, data, options = {}) => {
    return axios({ url, method, data, validateStatus: false, headers: { 'Authorization': `Bearer ${token}` }, ...options });
};

describe('Testes /recuperarProduto', ()  => {
    beforeAll(async () => {
        const response = await request(`${baseUrl}/login`, 'post', { username: 'apiIndexador', password: '123' });  
        expect(response.status).toBe(200);      
        if (response.status === 200) {
            token = response.data.token;
        }
    })

    test('200', async () => {
        const response = await request(`${baseUrl}/recuperarProduto`, 'get', {url: 'https://www.amazon.com.br/Borracha-Faber-Castell-SM-187137-Branca/dp/B07FJ17DS6/ref=pd_vtp_9/140-9187492-8257563?pd_rd_w=Nzn0N&pf_rd_p=460b1bd2-2dd3-4463-8569-0282c9641107&pf_rd_r=2HP1SAD71M7TVS3SGYYK&pd_rd_r=158f856e-0679-4e2b-a26f-be5ffd2545e1&pd_rd_wg=7vIt1&pd_rd_i=B07FJ17DS6&psc=1'});
        expect(response.status).toBe(200);
        expect(response).toBeInstanceOf(Object);
    });
    
    test('400 - URL inválida', async () => {
        const response = await request(`${baseUrl}/recuperarProduto`, 'get', {});
        expect(response.status).toBe(400);
        expect(response.data?.text).toBe('URL inválida');
    });

    test('422 - Origem inválida ', async () => {
        const response = await request(`${baseUrl}/recuperarProduto`, 'get', {url: 'https://www.magazineluiza.com.br/iphone-11-apple-64gb-preto-61-12mp-ios/p/155610500/te/ip11/'});
        expect(response.status).toBe(422);
        expect(response.data?.text).toBe(`URL inválida: Somente são aceitas URL's provenientes da amazon.com.br, zattini.com.br ou saraiva.com.br`);
    });

    test('422 - Não foi possível recuperar os dados da página ', async () => {
        const response = await request(`${baseUrl}/recuperarProduto`, 'get', {url: 'https://www.amazon.com.br'});
        expect(response.status).toBe(422);
        expect(response.data?.text).toBe('Não foi possível recuperar os dados da página.');
    }, 30000);
});