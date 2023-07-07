import { cartArray, add, subtract, checkEmptyCartIcon, cartSubtractButtonHandler, cartAddButtonHandler } from "./functions.js";
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

const cafe = new Product(id += 1, 0, "infusiones", "cafe", "Café", 1.50);
const latte = new Product(id += 1, 0, "infusiones", "latte", "Latte", 1.25);
const capuccino = new Product(id += 1, 0, "infusiones", "capuccino", "Capuccino", 1.75);
const medialuna = new Product(id += 1, 0, "snacks", "medialuna", "Medialuna", 1.00);
const tostado = new Product(id += 1, 0, "snacks", "tostado", "Tostado Jamón y Queso", 1.75);
const alfajor = new Product(id += 1, 0, "snacks", "alfajor", "Alfajor artesanal", 0.75);
const cheesecake = new Product(id += 1, 0, "pasteleria", "cheesecake", "Porción Cheesecake", 3.25);
const selvaNegra = new Product(id += 1, 0, "pasteleria", "selvaNegra", "Porción Selva Negra", 3.00);
const lemonPie = new Product(id += 1, 0, "pasteleria", "lemonPie", "Porción Lemon Pie", 2.75);

const cardList = [];
cardList.push(cafe, latte, capuccino, medialuna, tostado, alfajor, cheesecake, selvaNegra, lemonPie);

// Define variables
const container = document.querySelector("#cards-container");

// Generate cards on HTML
cardList.forEach(product => {
  // The next line forces "product" to take the place of any other object with the same "id" in "cartArray". This is useful when reloading the page, as localStorage won't treat old objects generated with a class as it treats the new ones.
  product = cartArray.find(previousProduct => previousProduct.id === product.id) || product;

  let div = document.createElement("div");
  div.className = `col ${product.type} fadein-up`;
  if (cartArray.includes(product)) {
    div.innerHTML = `
    <div class="card mb-5 mx-auto" style="width: 18rem;">
    <img src="/coderhouse-javascript-project/assets/img/tienda/${product.name}.webp" class="card-img-top" alt="${product.description}">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">U$S ${product.price.toFixed(2).toString().replace(".", ",")}</p>
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
    <img src="/coderhouse-javascript-project/assets/img/tienda/${product.name}.webp" class="card-img-top" alt="${product.description}">
      <div class="card-body">
        <h5 class="card-title">${product.description}</h5>
        <p class="card-text">U$S ${product.price.toFixed(2).toString().replace(".", ",")}</p>
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
    let li = document.createElement("li");
    li.className = `d-flex justify-content-between py-1 id${product.id}-li`;
    li.innerHTML = `
                  <img class="ms-2 rounded" src="/coderhouse-javascript-project/assets/img/tienda/${product.name}.webp" alt="${product.description}">
                  <span class="cart-span-description align-self-center text-wrap">${product.description}</span>
                  <div class="cart-span-amount align-self-center text-center d-flex justify-content-center">
                    <span class="id${product.id}-amount-display">${product.amount}</span>
                    <span class="px-1">u</span>
                  </div>
                  <span class="id${product.id}-cart-span-money cart-span-money align-self-center text-center">U$S ${(product.amount * product.price).toFixed(2).toString().replace(".", ",")}</span>
                  <div class="cart-buttons px-1 align-self-center">
                    <input type="button" value="-" class="mx-1 btn btn-custom button-scale-100 cart-button id${product.id}-cart-subtract-button">
                    <input type="button" value="+" class="mx-1 btn btn-custom button-scale-100 cart-button id${product.id}-cart-add-button">
                  </div>`
    cartIcon.appendChild(li);
    checkEmptyCartIcon();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);

    cartSubtractButtonHandler(product);
    cartAddButtonHandler(product);
  });

  // "Minus" button
  subtractButton.addEventListener("click", () => {
    subtract(product);

    if (document.querySelector(`.id${product.id}-cart-span-money`)) {
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `U$S ${(product.amount * product.price).toFixed(2).toString().replace(".", ",")}`;
    }

    if (product.amount == 0) {
      subtractButton.classList.add("d-none");
      amountDisplay.classList.add("d-none");
      addButton.classList.add("d-none");
      agregarButton.classList.remove("d-none");
      document.querySelector(`.id${product.id}-li`) && document.querySelector(`.id${product.id}-li`).remove();
    };

    checkEmptyCartIcon();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);
  });

  // "Plus" button
  addButton.addEventListener("click", () => {
    add(product);

    if (document.querySelector(`.id${product.id}-cart-span-money`)) {
      document.querySelector(`.id${product.id}-cart-span-money`).innerText = `U$S ${(product.amount * product.price).toFixed(2).toString().replace(".", ",")}`;
    };

    checkEmptyCartIcon();
    localStorage.setItem("cartIcon", cartIcon.innerHTML);
  });
});