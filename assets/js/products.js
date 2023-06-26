// Defining product cards container & array

let container = document.querySelector('#cards-container');
let cardList = [];

// Defining class & objects

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

// Generating cards' HTML

cardList.forEach(product => {
  let div = document.createElement("div");
  div.className = `col ${product.type} fade-up`;
  div.innerHTML = `<div class="card mb-5 mx-auto" style="width: 18rem;">
                     <img src="../img/tienda/${product.name}.webp" class="card-img-top" alt="...">
                     <div class="card-body">
                      <h5 class="card-title">${product.description}</h5>
                      <p class="card-text">U$S ${product.price.toFixed(2).toString().replace(".", ",")}</p>
                      <div id="cafe-buttons">
                        <div class="btn btn-custom button-scale" id="${product.name}-agregar-button">Agregar</div>
                      </div>
                    </div>
                  </div>`;
  container.appendChild(div)
});