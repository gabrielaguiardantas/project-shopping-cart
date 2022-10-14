const fetchItem = async (itemID) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${itemID}`;

  try {
    if (itemID === undefined) {
      throw (new Error('You must provide an url'));
    }
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
