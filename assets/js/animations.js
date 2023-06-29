// Scrolling animations

const fadeInLeft = document.querySelectorAll('.fadein-js-left');
const fadeInRight = document.querySelectorAll('.fadein-js-right');

// Create an intersection observer instance
const observerLeft = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is visible
      entry.target.classList.add('fadein-left');
    } else {
      // Element is not visible
      entry.target.classList.remove('fadein-left');
    }
  });
});

const observerRight = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is visible
      entry.target.classList.add('fadein-right');
    } else {
      // Element is not visible
      entry.target.classList.remove('fadein-right');
    }
  });
});

// Start observing the target element
fadeInLeft.forEach(element => {
  observerLeft.observe(element);
})

fadeInRight.forEach(element => {
  observerRight.observe(element);
})