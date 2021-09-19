const IndexadorRepository = require('../../repositories/indexadorRepository');
const indexadorRepository = new IndexadorRepository();

const { BadRequestException } = require('../../exceptions');

describe('Testes IndexadorRepository', ()  => {
    test('buscarPagina - Sucesso', async () => {       
        const results = await indexadorRepository.buscarPagina('https://www.amazon.com.br/Borracha-Faber-Castell-SM-187137-Branca/dp/B07FJ17DS6/ref=pd_vtp_9/140-9187492-8257563?pd_rd_w=Nzn0N&pf_rd_p=460b1bd2-2dd3-4463-8569-0282c9641107&pf_rd_r=2HP1SAD71M7TVS3SGYYK&pd_rd_r=158f856e-0679-4e2b-a26f-be5ffd2545e1&pd_rd_wg=7vIt1&pd_rd_i=B07FJ17DS6&psc=1');
        expect(results).toBeInstanceOf(Object);
    });

    test('buscarPagina - Erro', async () => {       
        try {
            await indexadorRepository.buscarPagina({});
        } catch (err) {
            expect(err?.message).toBe('Erro ao buscar dados da página');
        }
    });

    test('inserirPagina - Sucesso: Retorno Valido', async () => {       
        const results = await indexadorRepository.inserirPagina({            
                titulo: "Teste",
                imagem: "https://m.media-amazon.com/images/I/51SpPPpy1fL._AC_SY355_.jpg",
                preco: 10.50,
                descricao: "Teste descrição",
                url: ""
        });
        expect(results).not.toBeInstanceOf(BadRequestException);
    });

    test('inserirPagina - Erro', async () => {       
        try {
            await indexadorRepository.inserirPagina({});
        } catch (err) {
            expect(err?.message).toBe('Erro ao salvar a página');
        }
    });
});