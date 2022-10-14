require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('is a function?', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  })
  it('calls fetch function when is called with this param "MLB1615760527"', async () => {
    const url = `https://api.mercadolibre.com/items/MLB1615760527`;
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('calls fetch function with correct endpoint when is called with this param "MLB1615760527"?', async () => {
    const url = `https://api.mercadolibre.com/items/MLB1615760527`;
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('returns an object with the same "item" structure?', async () => {
    expect(await fetchItem('MLB1615760527')).toStrictEqual(item);
  })
  it('return an specific error: "You must provide an url", when fetchItem is called without param', async () => {
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  })
});
