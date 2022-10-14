require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('is a function?', async () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  })
  it('calls fetch function when fetchProducts("computador") is called?', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('calls fetch function with correct endpoint when fetchProducts("computador") is called?', async () => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  // O teste abaixo é meio fake pois através da simulação do fetch na função fetchProducts ele acessa e devolve o arquivo computadorSearch, logo estou comparando arquivos iguais.
  it('returns an object with the same "computadorSearch" structure?', async () => {
    expect(await fetchProducts('computador')).toStrictEqual(computadorSearch);
  })
  it('return an specific error: "You must provide an url", when fetchProduct is called without param', async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  })
});
