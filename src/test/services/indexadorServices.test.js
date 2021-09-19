const IndexadorService = require('../../services/indexadorService');
const indexadorService = new IndexadorService();

describe('Testes IndexadorService', ()  => {
    test('getProduto - Sucesso', async () => {       
        const results = await indexadorService.getProduto('https://www.amazon.com.br/Borracha-Faber-Castell-SM-187137-Branca/dp/B07FJ17DS6/ref=pd_vtp_9/140-9187492-8257563?pd_rd_w=Nzn0N&pf_rd_p=460b1bd2-2dd3-4463-8569-0282c9641107&pf_rd_r=2HP1SAD71M7TVS3SGYYK&pd_rd_r=158f856e-0679-4e2b-a26f-be5ffd2545e1&pd_rd_wg=7vIt1&pd_rd_i=B07FJ17DS6&psc=1');
        expect(results).toBeInstanceOf(Object);
    });

    test('getProduto - Erro', async () => {       
        try {
            await indexadorService.getProduto('https://www.amazon.com.br');
        } catch (err) {
            expect(err?.message).toBe('Não foi possível recuperar os dados da página.');
        }
    }, 30000);
});