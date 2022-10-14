const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage) return localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
