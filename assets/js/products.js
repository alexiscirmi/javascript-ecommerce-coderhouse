// Defining product cards container & array

let container = document.querySelector('#cards-container');
let cardList = [];

// Defining class & objects. Pushing objects to "cardList".

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

const cafe = new Product(0, 0, "infusiones", "cafe", "Café", 1.50);
const latte = new Product(0, 0, "infusiones", "latte", "Latte", 1.25);
const capuccino = new Product(0, 0, "infusiones", "capuccino", "Capuccino", 1.75);
const medialuna = new Product(0, 0, "snacks", "medialuna", "Medialuna", 1.00);
const tostado = new Product(0, 0, "snacks", "tostado", "Tostado de Jamón y Queso", 1.75);
const alfajor = new Product(0, 0, "snacks", "alfajor", "Alfajor artesanal", 0.75);
const cheesecake = new Product(0, 0, "pasteleria", "cheesecake", "Porción de Cheesecake", 3.25);
const selvaNegra = new Product(0, 0, "pasteleria", "selvaNegra", "Porción de Selva Negra", 3.00);
const lemonPie = new Product(0, 0, "pasteleria", "lemonPie", "Porción de Lemon Pie", 2.75);

cardList.push(cafe, latte, capuccino, medialuna, tostado, alfajor, cheesecake, selvaNegra, lemonPie);

// Generating cards on HTML

cardList.forEach(product => {
  let div = document.createElement("div");
  div.className = `col ${product.type} fade-up`;
  div.innerHTML = `<div class="card mb-5 mx-auto" style="width: 18rem;">
                     <img src="../img/tienda/${product.name}.webp" class="card-img-top" alt="...">
                     <div class="card-body">
                      <h5 class="card-title">${product.description}</h5>
                      <p class="card-text">U$S ${product.price.toFixed(2).toString().replace(".", ",")}</p>
                      <div class="d-flex justify-content-around" id="${product.name}-buttons">
                        <div class="btn btn-custom button-scale" id="${product.name}-agregar-button">Agregar</div>
                      </div>
                    </div>
                  </div>`;
  container.appendChild(div);

  let agregarButton = document.querySelector(`#${product.name}-agregar-button`);
  agregarButton.addEventListener("click", () => {
    add(product);
    if (product.amount > 0) {
      // "Agregar" button disappears and "minus" and "plus" buttons appear alongside with the current product amount
      agregarButton.className = "d-none";
      let buttons = document.querySelector(`#${product.name}-buttons`);
      buttons.innerHTML = `
      <div class="btn btn-custom btn-minus-plus button-scale" id="id${product.id}-subtract-button">-</div>
      <div class="fs-5 align-self-center" id="amount-${product.id}">${product.amount}</div>
      <div class="btn btn-custom btn-minus-plus button-scale" id="id${product.id}-add-button">+</div>
      `
      // "Minus" button code
      // let subtractButton = document.querySelector(`${product.id}-subtract-button`);
      // subtractButton.addEventListener("click", () => {
      //   subtract(product);
      // })

      // "Plus" button code
      let addButton = document.querySelector(`#id${product.id}-add-button`);
      addButton.addEventListener("click", () => {
        add(product);
        document.querySelector(`#amount-${product.id}`).innerText = `${product.amount}`;
      });
    };
  });
});