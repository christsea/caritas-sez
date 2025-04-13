console.log("Charity website loaded.");

document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");

  // Debug: Check if elements exist
  if (!navToggle) {
    console.error("nav-toggle element not found");
  }
  if (!navMenu) {
    console.error("nav-menu element not found");
  }

  navToggle.addEventListener("click", function () {
    console.log("Hamburger clicked");
    navMenu.classList.toggle("active");
  });
});
