import { fetchPrice, resetCart } from "./functions.js";


// Bootstrap: disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        localStorage.removeItem("cartArray");
        localStorage.removeItem("total");
        localStorage.removeItem("cartIcon");
        Swal.fire({
          title: '¡Pedido completado!',
          text: 'Te enviamos un correo con el detalle de tu compra',
          icon: 'success',
          iconColor: '#7f5539',
          color: '#9c6644',
          background: '#ede0d4',
          showConfirmButton: true,
          confirmButtonColor: '#b08968'
        }).then((result) => {
          if (result.isConfirmed) {
            location.assign("../../index.html");
          }
        })
      }

      form.classList.add('was-validated');
    }, false)
  })
})()


// Show total price details
let total = parseFloat(localStorage.getItem("total")) || 0;
let deliveryPrice = total + 2;
document.querySelector("#checkout-page-subtotal").innerText = `U$S ${total.toFixed(2).toString().replace(".", ",")}`;

if (total >= 10) {
  document.querySelector("#delivery-price").innerText = "U$S 0,00";
  deliveryPrice = 0;
  document.querySelector("#checkout-page-total").innerText = `U$S ${(total + deliveryPrice).toFixed(2).toString().replace(".", ",")}`;
} else {
  document.querySelector("#delivery-price").innerText = "U$S 2,00";
  deliveryPrice = 2;
  document.querySelector("#checkout-page-total").innerText = `U$S ${(total + deliveryPrice).toFixed(2).toString().replace(".", ",")}`;
}

fetchPrice(total, deliveryPrice);