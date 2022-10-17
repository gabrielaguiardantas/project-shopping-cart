// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,

// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/** 
 * Função responsável por pegar as informações da lista de produtos gerada pela API
*/
const getData = async () => {
  const { results } = await fetchProducts('computador');
  return results;
};

/**
 * Função responsável por pegar as informações do item de acordo com o seu ID, gerada pela API
 */
const getDataItem = async (itemID) => {
  const item = await fetchItem(itemID);
  return item;
};
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
    const section = document.createElement('section');
    section.className = 'item';
    section.appendChild(createCustomElement('span', 'item_id', id));
    section.appendChild(createCustomElement('span', 'item__title', title));
    section.appendChild(createProductImageElement(thumbnail));
    section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
    return section;
};

// função para renderizar os produtos no DOM
const renderProduct = async () => {
  const productListItems = document.querySelector('.items');
  const productList = await getData();
  for (let i = 0; i < productList.length; i += 1) {
    productListItems.appendChild(createProductItemElement(productList[i]));
  }
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

let storage = [];
let sumOfValues = 0;
const value = document.querySelector('.total-price');
// função para salvar o carrinho

const saveCartList = (param) => {
  storage.push(param);
  saveCartItems(JSON.stringify(storage));
};

const removeCartItem = (param) => {
  storage = storage.filter((object) => 
    object.id !== param);
  console.log(param, storage);
  saveCartItems(JSON.stringify(storage));
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => {
    li.remove();
    sumOfValues -= price;
    value.innerText = `Total de $${sumOfValues}`;
    console.log(sumOfValues);
    removeCartItem(id);
  });
  return li;
};

/**
 * Função para criar o valor total do carrinho
 */
 const totalPrice = (price) => {
  console.log(price);
  // const cartListObjects = JSON.parse(getSavedCartItems());
  // sumOfValues = 0;
  // cartListObjects.forEach((object) => {
  //   const { price } = object;
    // sumOfValues += Number(price);
  // });
  sumOfValues += price;
  value.innerText = `Total de $${sumOfValues}`;
};

// função para renderizar os produtos no carrinho(no DOM)
const renderProductCart = async (itemID) => {
  const productCartItem = document.querySelector('.cart__items');
  const productCart = await getDataItem(itemID);
  productCartItem.appendChild(createCartItemElement(productCart));
  saveCartList(productCart);
  totalPrice(productCart.price);
};

// testando 
const renderProductCart2 = (object) => {
  const productCartItem = document.querySelector('.cart__items');
  productCartItem.appendChild(createCartItemElement(object));
  totalPrice();
};
/**
 * Função para criar o escutador no botão adicionar ao carrinho
 */
 const eventListenerOnProductButton = () => {
  const button = document.getElementsByClassName('item__add');
  for (let i = 0; i < button.length; i += 1) {
  button[i].addEventListener('click', () => {
    const item = button[i].parentElement;
    renderProductCart(getIdFromProductItem(item));
  });
}
};

window.onload = async () => {
  await renderProduct();
  eventListenerOnProductButton();
  if (localStorage.length === 1) {
  const cartListObjects = JSON.parse(getSavedCartItems());
  cartListObjects.forEach((object) => {
    renderProductCart2(object);
  });
  }
 };
