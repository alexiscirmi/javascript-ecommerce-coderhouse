import { cartArray, checkCart, cartSubtractButtonHandler, cartAddButtonHandler } from "./functions.js";


// Define variables & read localStorage
export const cartIcon = document.querySelector("#cart-icon");
checkCart();
document.querySelector("#cart-page") && (document.querySelector("#cart-page").innerHTML = cartIcon.innerHTML);


// Avoid "cartIcon" dropdown menu to close on click inside
document.querySelector(".dropdown-menu").addEventListener("click", (event) => { event.stopPropagation() });


// Manipulate "cartIcon" stored elements
cartArray.forEach(product => {
  cartSubtractButtonHandler(product);
  cartAddButtonHandler(product);
});


if (document.querySelector("#checkout")) {
  let total = parseFloat(localStorage.getItem("total")) || 0;
  document.querySelector("#checkout-page-subtotal").innerText = `U$S ${total.toFixed(2).toString().replace(".", ",")}`;

  if (total >= 10) {
    document.querySelector("#delivery-price").innerText = "U$S 0,00";
    document.querySelector("#checkout-page-total").innerText = `U$S ${total.toFixed(2).toString().replace(".", ",")}`;
  } else {
    document.querySelector("#delivery-price").innerText = "U$S 1,50";
    document.querySelector("#checkout-page-total").innerText = `U$S ${(total + 1.5).toFixed(2).toString().replace(".", ",")}`;
  }
}