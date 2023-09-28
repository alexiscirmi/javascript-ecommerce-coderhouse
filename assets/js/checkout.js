import { fetchPrice } from "./functions.js";

// EmailJS: add cart details to hidden textarea. This will be sent to the customer.
// .textContent handles iterations better than .innerText

if (localStorage.getItem("cartArray") !== null) {
  JSON.parse(localStorage.getItem("cartArray")).forEach(product => {
    document.querySelector("#emailDetail").textContent += `* ${product.description} x ${product.amount} u = U$S ${(product.price * product.amount).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`
  });
} else {
  location.assign("../../index.html");
}

// Show total price details. Exchange rate and ARS price will be updated every 10 minutes.
let total = parseFloat(localStorage.getItem("total")) || location.assign("../../index.html");
let deliveryPrice = 0;
document.querySelector("#checkout-page-subtotal").innerText = `U$S ${total.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;

if (total >= 10) {
  document.querySelector("#delivery-price").innerText = "U$S 0,00";
  deliveryPrice = 0;
  document.querySelectorAll(".checkout-page-total").forEach(element => {
    element.innerText = `U$S ${(total + deliveryPrice).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;
  });
} else {
  document.querySelector("#delivery-price").innerText = "U$S 2,00";
  deliveryPrice = 2;
  document.querySelectorAll(".checkout-page-total").forEach(element => {
    element.innerText = `U$S ${(total + deliveryPrice).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;
  });
}

fetchPrice(total, deliveryPrice);

setInterval(() => {
  fetchPrice(total, deliveryPrice);
}, 600000);
