// Defining variables

let total = 0;
let id = 0;

// Defining array with empty shopping cart

const cartArray = [];

// Defining "add" function que suma cantidades al objeto y lo agrega al cart en caso de que no haya sido previamente agregado

const add = (product) => {
  product.amount += 1;
  if (cartArray.includes(product) == false) {
    product.id = id += 1;
    cartArray.push(product);
  }
};

// Definición de la función "updateCart" que quitará del carrito los objetos de cantidad cero

const updateCart = () => {
  cart = cartArray.filter((product) => product.amount != 0);
};

// Definición de la función "subtract"

const subtract = () => {
  if (cartArray.length == 0) {
    // alert("El cart está vacío");
  }

  while (cartArray.length > 0 && opcionMenuQuitar !== 0) {

    updateCart();

  }

  if (cartArray.length == 0) {
    // alert("El cart está vacío");
  }
};

// Definición de la función "checkout"

const checkout = () => {
  updateCart();

  total = cartArray.reduce((previousValue, currentValue) => previousValue + currentValue.cantidad * currentValue.precio, 0);

  if (cartArray.length == 0) {
    // alert("El cart está vacío");
  } else {
    // alert(cartList);
    // alert(`El total a pagar es: $${total.toFixed(2)} `)
  }
};
