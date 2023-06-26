// Event listeners to make the appropiate elements to appear with their respetive animations, when clicking on a filter button

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