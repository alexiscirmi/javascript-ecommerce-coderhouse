import { cartIcon } from "./cart.js";


// Define variables & read localStorage
let total = parseFloat(localStorage.getItem("total")) || 0;
export let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];


// Define "checkCart" function to trigger instructions according to cart status

export const checkCart = () => {

  // Handle cartIcon
  cartArray.forEach(product => {

    if (!document.querySelector(`.id${product.id}-li`)) {

      if (document.querySelector("#index")) {
        let li = document.createElement("li");
        li.className = `d-flex justify-content-between py-1 id${product.id}-li`;
        li.innerHTML = `
                    <img class="ms-2 rounded" src="./assets/img/tienda/${product.name}.webp" alt="${product.description}">
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
      } else {
        let li = document.createElement("li");
        li.className = `d-flex justify-content-between py-1 id${product.id}-li`;
        li.innerHTML = `
                    <img class="ms-2 rounded" src="../img/tienda/${product.name}.webp" alt="${product.description}">
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
        if (!document.querySelector("#checkout")) {
          cartIcon.appendChild(li);
        }
      }
    }
  });

  // Handle empty cart
  document.querySelector(".emptyCart") && document.querySelector(".emptyCart").remove();

  // "El carrito está vacío" message on cart dropdown
  if (!document.querySelector("#checkout") && cartIcon.childElementCount == 0) {
    localStorage.removeItem("cartIcon");
    let li = document.createElement("li");
    li.className = "d-flex justify-content-center py-1 emptyCart";
    li.innerText = "El carrito está vacío";
    cartIcon.appendChild(li);
    document.querySelector(".cart-icon-footer").style.display = "none";
    document.querySelector(".cart-icon-mobile-container") && (document.querySelector(".cart-icon-mobile-container").classList.add("d-none"));

    // Instructions for manually emptied cart (carrito.html)
    if (document.querySelector("#cart-page")) {
      document.querySelector('.carrito__body__main').style.height = "100vh";
      document.querySelector('#cart-page').remove();
      document.querySelector('#cart-page-bottom-buttons').remove();
      Swal.fire({
        title: '¡El carrito fue vaciado!',
        text: 'Redireccionando a Tienda...',
        icon: 'success',
        iconColor: '#7f5539',
        color: '#9c6644',
        background: '#ede0d4',
        showConfirmButton: false
      });

      setTimeout(() => {
        location.assign("./tienda.html");
      }, 2000);
    };
  } else {
    document.querySelector(".cart-icon-footer").style.display = "flex";
    document.querySelector("#cart-icon-total") && (document.querySelector("#cart-icon-total").innerText = `U$S ${total.toFixed(2).toString().replace(".", ",")}`);
    document.querySelector("#cart-page-total") && (document.querySelector("#cart-page-total").innerText = `U$S ${total.toFixed(2).toString().replace(".", ",")}`);
    if (document.querySelector(".cart-icon-mobile-container")) {
      document.querySelector(".cart-icon-mobile-container").classList.remove("d-none");
      document.querySelector(".cart-icon-mobile-container").classList.add("d-inline-block");
      document.querySelector(".cart-icon-mobile-amount").innerText = cartArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    }
  }

  // "Vaciar carrito" button code (carrito.html)
  if (document.querySelector("#vaciar-carrito-button")) {
    document.querySelector("#vaciar-carrito-button").addEventListener("click", () => {

      Swal.fire({
        title: '¿Estás seguro/a?',
        icon: 'warning',
        iconColor: '#7f5539',
        showCancelButton: true,
        confirmButtonColor: '#b08968',
        cancelButtonColor: '#7f5539',
        color: '#9c6644',
        background: '#ede0d4',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector('.carrito__body__main').style.height = "100vh";
          document.querySelector('#cart-page').remove();
          document.querySelector('#cart-page-bottom-buttons').remove();
          localStorage.removeItem("cartArray");
          localStorage.removeItem("total");
          localStorage.removeItem("cartIcon");

          Swal.fire({
            title: '¡El carrito fue vaciado!',
            text: 'Redireccionando a Tienda...',
            icon: 'success',
            iconColor: '#7f5539',
            color: '#9c6644',
            background: '#ede0d4',
            showConfirmButton: false
          });

          setTimeout(() => {
            location.assign("./tienda.html");
          }, 2000);
        }
      })
    })
  }
}


// Define "add" function. It checks whether an object inside "cartArray" has the same "id". In case it does, it will add 1 to amount. In case it doesn't, it will add 1 to amount and push the new object to "cartArray".
export const add = (product) => {
  let object = cartArray.find(object => object.id === product.id);
  object ? object.amount += 1 : (product.amount += 1, cartArray.push(product));
  total = cartArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount * currentValue.price, 0);
  document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
    element.innerText = `${product.amount}`;
  });

  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  localStorage.setItem("total", total.toFixed(2));
};


// Define "subtract" function
export const subtract = (product) => {

  if (product.amount > 0) {
    product.amount -= 1;
    cartArray = cartArray.filter((product) => product.amount > 0);
    total = cartArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount * currentValue.price, 0);
    document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
      element.innerText = `${product.amount}`;
    });
  };

  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  localStorage.setItem("total", total.toFixed(2));
};


// Define cart "Minus" button click handler function

export const cartSubtractButtonHandler = (product) => {

  if (document.querySelectorAll(`.id${product.id}-cart-subtract-button`)) {

    document.querySelectorAll(`.id${product.id}-cart-subtract-button`).forEach(element => {
      element.addEventListener("click", () => {

        subtract(product);
        document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
          element.innerText = `${product.amount}`;
        });
        document.querySelectorAll(`.id${product.id}-cart-span-money`).forEach(element => {
          element.innerText = `U$S ${(product.amount * product.price).toFixed(2).toString().replace(".", ",")}`;
        });

        if (product.amount == 0) {
          document.querySelector(`.id${product.id}-agregar-button`) && document.querySelector(`.id${product.id}-agregar-button`).classList.remove("d-none");
          document.querySelector(`.id${product.id}-subtract-button`) && document.querySelector(`.id${product.id}-subtract-button`).classList.add("d-none");

          if (document.querySelectorAll(`.id${product.id}-amount-display`)) {
            document.querySelectorAll(`.id${product.id}-amount-display`).forEach(display => {
              display.classList.add("d-none");
            });
          };

          document.querySelector(`.id${product.id}-add-button`) && document.querySelector(`.id${product.id}-add-button`).classList.add("d-none");
          document.querySelectorAll(`.id${product.id}-li`).forEach(element => {
            element.remove();
          });
        };

        checkCart();
      });
    });
  };
};


// Define cart "Plus" button click handler function

export const cartAddButtonHandler = (product) => {

  if (document.querySelectorAll(`.id${product.id}-cart-add-button`)) {

    document.querySelectorAll(`.id${product.id}-cart-add-button`).forEach(element => {
      element.addEventListener("click", () => {

        add(product);
        document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
          element.innerText = `${product.amount}`;
        });
        document.querySelectorAll(`.id${product.id}-cart-span-money`).forEach(element => {
          element.innerText = `U$S ${(product.amount * product.price).toFixed(2).toString().replace(".", ",")}`;
        });
        checkCart();
      });
    });
  };
};


// Define "fetchPrice" async function to get USDT/ARS price from Binance API

export const fetchPrice = async (total, deliveryPrice) => {
  try {
    const response = await fetch("https://api.binance.com/api/v3/depth?symbol=USDTARS");
    const data = await response.json();
    const price = (parseInt(data.asks[0][0]) + parseInt(data.bids[0][0])) / 2
    document.querySelector("#exchangeRate").innerText = `$${price}`;
    document.querySelector("#arsPrice").innerText = `$ ${((total + deliveryPrice) * price).toFixed(2).toString().replace(".", ",")}`;
  } catch (error) {
    console.error("Failed to fetch data from the API. Using manual exchange rate.", error);
    const price = 520;
    document.querySelector("#exchangeRate").innerText = `$${price}`;
    document.querySelector("#arsPrice").innerText = `$ ${((total + deliveryPrice) * price).toFixed(2).toString().replace(".", ",")}`;
  }
}


// Define "resetCart" function

export const resetCart = () => {
  cartArray = [];
};