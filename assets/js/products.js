// Defining class & objects. Pushing objects to "cardList" array

let id = 0;

class Product {
  constructor(id, amount, type, name, description, price) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.name = name;
    this.description = description;
    this.price = price;
  };
};

const cafe = new Product(id += 1, 0, "infusiones", "cafe", "Café", 1.50);
const latte = new Product(id += 1, 0, "infusiones", "latte", "Latte", 1.25);
const capuccino = new Product(id += 1, 0, "infusiones", "capuccino", "Capuccino", 1.75);
const medialuna = new Product(id += 1, 0, "snacks", "medialuna", "Medialuna", 1.00);
const tostado = new Product(id += 1, 0, "snacks", "tostado", "Tostado de Jamón y Queso", 1.75);
const alfajor = new Product(id += 1, 0, "snacks", "alfajor", "Alfajor artesanal", 0.75);
const cheesecake = new Product(id += 1, 0, "pasteleria", "cheesecake", "Porción de Cheesecake", 3.25);
const selvaNegra = new Product(id += 1, 0, "pasteleria", "selvaNegra", "Porción de Selva Negra", 3.00);
const lemonPie = new Product(id += 1, 0, "pasteleria", "lemonPie", "Porción de Lemon Pie", 2.75);

let cardList = [];
cardList.push(cafe, latte, capuccino, medialuna, tostado, alfajor, cheesecake, selvaNegra, lemonPie);

// Defining total variable & array with shopping cart

let total = parseInt(localStorage.getItem("total")) || 0;
let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

// Defining "cartFiler" function to delete objects with .amount == 0

const cartFilter = () => {
  cartArray = cartArray.filter((product) => product.amount > 0);
};

// Defining "checkout" function with total

const checkout = () => {
  total = cartArray.reduce((previousValue, currentValue) => previousValue + currentValue.amount * currentValue.price, 0);
};

// Defining "add" function. It checks whether an object inside "cartArray" has the same "id". In case it does, it will add 1 to amount. In case it doesn't, it will add 1 to amount and push the new object to "cartArray".

const add = (product) => {
  let object = cartArray.find(object => object.id === product.id);
  if (object) {
    object.amount += 1;
  } else {
    product.amount += 1;
    cartArray.push(product);
  }
  checkout();
  localStorage.setItem("cart", JSON.stringify(cartArray));
  localStorage.setItem("total", total);
};

// Defining "subtract" function

const subtract = (product) => {
  if (product.amount > 0) {
    product.amount -= 1;
    cartFilter();
    checkout();
  };
  localStorage.setItem("cart", JSON.stringify(cartArray));
  localStorage.setItem("total", total);
};

// Generating cards on HTML
let container = document.querySelector('#cards-container');
cardList.forEach(product => {

  // The next line will force "product" to take the place of any other object with the same "id" in "cartArray". This is useful when reloading the page, as localStorage won't treat old objects generated with a class as it treats the new ones.
  product = cartArray.find(object => object.id === product.id) || product;

  let div = document.createElement("div");
  div.className = `col ${product.type} fade-up`;
  if (cartArray.includes(product)) {
    div.innerHTML = `
    <div class="card mb-5 mx-auto" style="width: 18rem;">
    <img src="../img/tienda/${product.name}.webp" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">U$S ${product.price.toFixed(2).toString().replace(".", ",")}</p>
        <div class="d-flex justify-content-around">
          <div class="d-none btn btn-custom button-scale agregar-button">Agregar</div>
          <div class="btn btn-custom btn-minus-plus button-scale subtract-button">-</div>
          <div class="fs-5 align-self-center amount-display">${product.amount}</div>
          <div class="btn btn-custom btn-minus-plus button-scale add-button">+</div>
        </div>
      </div>
    </div>
    `;
  } else {
    div.innerHTML = `
    <div class="card mb-5 mx-auto" style="width: 18rem;">
    <img src="../img/tienda/${product.name}.webp" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">U$S ${product.price.toFixed(2).toString().replace(".", ",")}</p>
        <div class="d-flex justify-content-around">
          <div class="btn btn-custom button-scale agregar-button">Agregar</div>
          <div class="d-none btn btn-custom btn-minus-plus button-scale subtract-button">-</div>
          <div class="d-none fs-5 align-self-center amount-display">${product.amount}</div>
          <div class="d-none btn btn-custom btn-minus-plus button-scale add-button">+</div>
        </div>
      </div>
    </div>
    `;
  }
  container.appendChild(div);

  let agregarButton = div.querySelector(".agregar-button");
  let subtractButton = div.querySelector(".subtract-button");
  let amountDisplay = div.querySelector(".amount-display");
  let addButton = div.querySelector(".add-button");

  // "Agregar" button
  agregarButton.addEventListener("click", () => {
    agregarButton.classList.add("d-none");
    subtractButton.classList.remove("d-none");
    amountDisplay.classList.remove("d-none");
    addButton.classList.remove("d-none");
    add(product);
    amountDisplay.innerText = `${product.amount}`;
  });

  // "Plus" button
  addButton.addEventListener("click", () => {
    add(product);
    amountDisplay.innerText = `${product.amount}`;
  });

  // "Minus" button
  subtractButton.addEventListener("click", () => {
    subtract(product);
    amountDisplay.innerText = `${product.amount}`;
    if (product.amount == 0) {
      subtractButton.classList.add("d-none");
      amountDisplay.classList.add("d-none");
      addButton.classList.add("d-none");
      agregarButton.classList.remove("d-none");
    };
  });
});