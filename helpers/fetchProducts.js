const fetchProducts = async (computador) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;

  try {
    if (computador === undefined) {
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
    fetchProducts,
  };  
}