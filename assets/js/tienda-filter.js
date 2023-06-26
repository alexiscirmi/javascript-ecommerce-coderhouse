// Event listeners para que, al hacer clic en algún botón del filtro, aparezcan los elementos correspondientes con sus respectivas animaciones.

document.querySelector("#todo").addEventListener("click", () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'none');
  setTimeout(() => {
    document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'block');
  }, 1);
  setTimeout(() => {
    document.querySelectorAll(".snacks").forEach(item => item.style.display = 'block');
  }, 1);
  setTimeout(() => {
    document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'block');
  }, 1);
});

document.querySelector("#infusiones").addEventListener("click", () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'none');
  setTimeout(() => {
    document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'block');
  }, 1);
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'none');
});

document.querySelector("#snacks").addEventListener("click", () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'none');
  setTimeout(() => {
    document.querySelectorAll(".snacks").forEach(item => item.style.display = 'block');
  }, 1);
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'none');
});

document.querySelector("#pasteleria").addEventListener("click", () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'none');
  setTimeout(() => {
    document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'block');
  }, 1);
});