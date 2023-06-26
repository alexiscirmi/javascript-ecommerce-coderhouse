// Defining variables

let total = 0;
let id = 0;
let cart = document.querySelector('#cart');

// Defining array with empty shopping cart

let cartArray = [];

// Defining class & objects

class Product {
  constructor(id, amount, type, description, price) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.price = price;
  }
};

const cafe = new Product(0, 0, "Café", 1.50);
const latte = new Product(0, 0, "Latte", 1.25);
const capuccino = new Product(0, 0, "Capuccino", 1.75);
const medialuna = new Product(0, 0, "Medialuna", 1.00);
const tostado = new Product(0, 0, "Tostado de Jamón y Queso", 1.75);
const alfajor = new Product(0, 0, "Alfajor artesanal", 0.75);
const cheesecake = new Product(0, 0, "Porción de Cheesecake", 3.25);
const selvaNegra = new Product(0, 0, "Porción de Selva Negra", 3.25);
const lemonPie = new Product(0, 0, "Porción de Lemon Pie", 2.75);

// Definición de la función "agregar" que suma cantidades al objeto y lo agrega al cart en caso de que no haya sido previamente agregado

const agregar = (producto) => {
  producto.cantidad += 1;
  if (cart.includes(producto) == false) {
    producto.id = id += 1;
    cart.push(producto);
  }
};

// Definición de la función "updateCart" que quitará del cart los objetos de cantidad cero

const updateCart = () => {
  cart = cart.filter((producto) => producto.cantidad != 0);
};

// Definición de la función "quitarProductos"

const quitarProductos = () => {
  if (cart.length == 0) {
    // alert("El cart está vacío");
  }

  while (cart.length > 0 && opcionMenuQuitar !== 0) {

    updateCart();
    // opcionMenuQuitar = parseInt(prompt(`Inserte el código del producto que desea eliminar, o coloque \"0\" para volver atrás:\n\n${cartList}`));

    while (cart.findIndex(producto => producto.id == opcionMenuQuitar) != -1) {
      if (cart[cart.findIndex(producto => producto.id == opcionMenuQuitar)].cantidad > 0) {
        cart[cart.findIndex(producto => producto.id == opcionMenuQuitar)].cantidad -= 1;
        updateCart();
        opcionMenuQuitar = '';
      }
    }
  }

  if (cart.length == 0) {
    // alert("El cart está vacío");
  }
};

// Definición de la función "verCarrito"

const verCarrito = () => {
  updateCart();

  total = cart.reduce((previousValue, currentValue) => previousValue + currentValue.cantidad * currentValue.precio, 0);

  if (cart.length == 0) {
    // alert("El cart está vacío");
  } else {
    // alert(cartList);
    // alert(`El total a pagar es: $${total.toFixed(2)} `)
  }
};