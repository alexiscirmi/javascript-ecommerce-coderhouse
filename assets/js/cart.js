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