// Scrolling animations using the Intersection Observer API. It observes whether an element should be visible and then adds the respective animation class. The class is removed again when the element is not visible.

const fadeInLeft = document.querySelectorAll('.fadein-js-left');
const fadeInRight = document.querySelectorAll('.fadein-js-right');
const fadeInUp = document.querySelectorAll('.fadein-js-up');


// Create an Intersection Observer instance
const observerLeft = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting || window.scrollY >= entry.target.offsetTop) {
      // Element is visible
      entry.target.style.visibility = 'visible';
      entry.target.classList.add('fadein-left');
    } else {
      // Element is not visible
      entry.target.style.visibility = 'hidden';
      entry.target.classList.remove('fadein-left');
    };
  });
});

const observerRight = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting || window.scrollY >= entry.target.offsetTop) {
      // Element is visible
      entry.target.style.visibility = 'visible';
      entry.target.classList.add('fadein-right');
    } else {
      // Element is not visible
      entry.target.style.visibility = 'hidden';
      entry.target.classList.remove('fadein-right');
    };
  });
});

const observerUp = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting || window.scrollY >= entry.target.offsetTop) {
      // Element is visible
      entry.target.style.visibility = 'visible';
      entry.target.classList.add('fadein-up');
    } else {
      // Element is not visible
      entry.target.style.visibility = 'hidden';
      entry.target.classList.remove('fadein-up');
    };
  });
});


// Start observing the target elements
fadeInLeft.forEach(element => {
  observerLeft.observe(element);
});

fadeInRight.forEach(element => {
  observerRight.observe(element);
});

fadeInUp.forEach(element => {
  observerUp.observe(element);
});