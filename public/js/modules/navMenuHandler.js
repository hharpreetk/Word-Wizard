// navbar.js

/**
 * Toggles the navigation menu and hamburger icon.
 */
function toggleNav() {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("show-nav");
  hamburger.classList.toggle("change");
}

/**
 * Hides the navigation dropdown list and hamburger icon when the window is resized and its width is larger or equal to 1056 pixels
 */

// Event listener for hamburger click
const hamburger = document.getElementById("hamburger");

function resetNavOnResize() {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.querySelector(".hamburger");
  if (window.innerWidth >= 1000) {
    navLinks.classList.remove("show-nav");
    hamburger.classList.remove("change");
  }
}

// Event listener for window resize
window.addEventListener("resize", resetNavOnResize);

hamburger.addEventListener("click", toggleNav);

export { toggleNav, resetNavOnResize };
