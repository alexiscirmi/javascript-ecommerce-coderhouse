const todoSelected = () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'block');
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'block');
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'block');
};

const infusionesSelected = () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'block');
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'none');
};

const snacksSelected = () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'block');
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'none');
};

const pasteleriaSelected = () => {
  document.querySelectorAll(".infusiones").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".snacks").forEach(item => item.style.display = 'none');
  document.querySelectorAll(".pasteleria").forEach(item => item.style.display = 'block');
};

document.querySelector("#todo").addEventListener("click", todoSelected);
document.querySelector("#infusiones").addEventListener("click", infusionesSelected);
document.querySelector("#snacks").addEventListener("click", snacksSelected);
document.querySelector("#pasteleria").addEventListener("click", pasteleriaSelected);