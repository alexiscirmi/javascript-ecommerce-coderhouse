import { cartArray, add, subtract, checkCart, cartSubtractButtonHandler, cartAddButtonHandler } from "./functions.js";
import { cartIcon } from "./cart.js";

// Define class & objects. Push objects to "cardList" array
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

const cafe = new Product(id += 1, 0, "infusiones", "cafe", "Café", 1.75);
const latte = new Product(id += 1, 0, "infusiones", "latte", "Latte", 1.50);
const capuccino = new Product(id += 1, 0, "infusiones", "capuccino", "Capuccino", 2.00);
const medialuna = new Product(id += 1, 0, "snacks", "medialuna", "Medialuna", 1.25);
const tostado = new Product(id += 1, 0, "snacks", "tostado", "Tostado Jamón y Queso", 2.00);
const alfajor = new Product(id += 1, 0, "snacks", "alfajor", "Alfajor artesanal", 1.00);
const cheesecake = new Product(id += 1, 0, "pasteleria", "cheesecake", "Porción Cheesecake", 3.50);
const selvaNegra = new Product(id += 1, 0, "pasteleria", "selvaNegra", "Porción Selva Negra", 3.25);
const lemonPie = new Product(id += 1, 0, "pasteleria", "lemonPie", "Porción Lemon Pie", 3.00);

const cardList = [];
cardList.push(cafe, latte, capuccino, medialuna, tostado, alfajor, cheesecake, selvaNegra, lemonPie);

// Define variables
const container = document.querySelector("#cards-container");

// Tienda ToastifyJS messages
if (document.querySelector(".tienda__body-bg")) {
  Toastify({
    text: "¡Envíos gratis desde U$S 10!",
    gravity: "bottom",
    stopOnFocus: false,
    offset: {
      y: 80 // vertical axis - can be a number or a string indicating unity. eg: "2em"
    },
    style: {
      color: "#7f5539",
      background: "#ede0d4",
    },
    duration: 3000
  }).showToast();
}

// Generate cards on HTML
cardList.forEach(product => {
  // The next line forces "product" to take the place of any other object with the same "id" in "cartArray". This is useful when reloading the page, as localStorage won't treat old objects generated with a class as it treats the new ones.
  product = cartArray.find(previousProduct => previousProduct.id === product.id) || product;

  let div = document.createElement("div");
  div.className = `col ${product.type} fadein-up`;

  if (cartArray.includes(product)) {
    div.innerHTML = `
    <div class="card mb-5 mx-auto" style="width: 18rem;">
    <img src="../img/tienda/${product.name}.webp" class="card-img-top" alt="${product.description}">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">U$S ${product.price.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div class="d-flex justify-content-around">
          <div class="d-none btn btn-custom button-scale-100 id${product.id}-agregar-button">Agregar</div>
          <input type="button" value="-" class="btn btn-custom btn-minus-plus button-scale-100 id${product.id}-subtract-button">
          <div class="fs-5 align-self-center id${product.id}-amount-display">${product.amount}</div>
          <input type="button" value="+" class="btn btn-custom btn-minus-plus button-scale-100 id${product.id}-add-button">
        </div>
      </div>
    </div>`;
  } else {
    div.innerHTML = `
    <div class="card mb-5 mx-auto" style="width: 18rem;">
    <img src="../img/tienda/${product.name}.webp" class="card-img-top" alt="${product.description}">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">U$S ${product.price.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div class="d-flex justify-content-around">
          <div class="btn btn-custom button-scale-100 id${product.id}-agregar-button">Agregar</div>
          <input type="button" value="-" class="d-none btn btn-custom btn-minus-plus button-scale-100 id${product.id}-subtract-button">
          <div class="d-none fs-5 align-self-center id${product.id}-amount-display">${product.amount}</div>
          <input type="button" value="+" class="d-none btn btn-custom btn-minus-plus button-scale-100 id${product.id}-add-button">
        </div>
      </div>
    </div>`;
  }

  container && container.appendChild(div);

  let agregarButton = div.querySelector(`.id${product.id}-agregar-button`);
  let subtractButton = div.querySelector(`.id${product.id}-subtract-button`);
  let amountDisplay = div.querySelector(`.id${product.id}-amount-display`);
  let addButton = div.querySelector(`.id${product.id}-add-button`);

  // "Agregar" button
  agregarButton.addEventListener("click", () => {
    agregarButton.classList.add("d-none");
    subtractButton.classList.remove("d-none");
    amountDisplay.classList.remove("d-none");
    addButton.classList.remove("d-none");
    add(product);

    // Create list item on "cartIcon"

    checkCart();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);

    cartSubtractButtonHandler(product);
    cartAddButtonHandler(product);
  });

  // "Minus" button
  subtractButton.addEventListener("click", () => {
    subtract(product);

    if (document.querySelector(`.id${product.id}-cart-span-money`)) {
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `U$S ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    if (product.amount == 0) {
      subtractButton.classList.add("d-none");
      amountDisplay.classList.add("d-none");
      addButton.classList.add("d-none");
      agregarButton.classList.remove("d-none");
      document.querySelector(`.id${product.id}-li`) && document.querySelector(`.id${product.id}-li`).remove();
    };

    checkCart();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);
  });

  // "Plus" button
  addButton.addEventListener("click", () => {
    add(product);

    if (document.querySelector(`.id${product.id}-cart-span-money`)) {
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `U$S ${(product.amount * product.price).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    checkCart();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);
  });
});