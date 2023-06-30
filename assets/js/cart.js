// Define variables

const cartIcon = document.querySelector('#cart-icon');

cartArray.forEach(product => {
  let li = document.createElement("li");
  li.className = "d-flex justify-content-between py-1";
  li.innerHTML = `
                <img class="ps-1" src="../img/tienda/${product.name}.webp" alt="${product.description}">
                <span class="cart-span-description align-self-center text-wrap">${product.description}</span>
                <div class="cart-span-amount align-self-center text-center d-flex justify-content-end">
                  <span class="id${product.id}-amount-display">${product.amount}</span>
                  <span class="px-1">u</span>
                </div>
                <span class="cart-span-money align-self-center text-center">U$S ${product.price.toFixed(2).toString().replace(".", ",")}</span>
                <div class="px-1 align-self-center">
                <input type="button" value="-" class="mx-1 btn btn-custom button-scale cart-button cart-subtract-button">
                <input type="button" value="+" class="mx-1 btn btn-custom button-scale cart-button cart-add-button">
                </div>
`
  cartIcon.appendChild(li)

  let cartSubtractButton = li.querySelector(".cart-subtract-button");
  let cartAddButton = li.querySelector(".cart-add-button");

  // "Minus" button
  cartSubtractButton.addEventListener("click", () => {
    subtract(product);
    document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
      element.innerText = `${product.amount}`;
    });
  });

  // "Plus" button
  cartAddButton.addEventListener("click", () => {
    add(product);
    document.querySelectorAll(`.id${product.id}-amount-display`).forEach(element => {
      element.innerText = `${product.amount}`;
    });
  });
});