// Defining variables

let total = 0;
let id = 0;

// Defining array with empty shopping cart

let cartArray = [];

// Defining "cartFiler" function to delete objects with .amount == 0

const cartFilter = () => {
  cartArray = cartArray.filter((product) => product.amount > 0);
};

// Defining "checkout" function with total

const checkout = () => {
  total = cartArray.reduce((previousValue, currentValue) => previousValue + currentValue.amount * currentValue.price, 0);
};

// Defining "add" function que suma cantidades al objeto y lo agrega al cart en caso de que no haya sido previamente agregado

const add = (product) => {
  product.amount += 1;
  checkout()
  if (!cartArray.includes(product)) {
    product.id = id += 1;
    cartArray.push(product);
  }
};

// Defining "subtract" function

const subtract = (product) => {
  if (cartArray.includes(product) && product.amount > 0) {
    product.amount -= 1;
    cartFilter();
    checkout();
  }
};
