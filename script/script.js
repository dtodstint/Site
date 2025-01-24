const menuToggle = document.getElementById("menuToggle");
const navbarLinks = document.getElementById("navbar-links");
const navLinks = document.querySelectorAll(".navbar a");
const navbar = document.getElementById("navbar");
const logo = document.querySelector(".navbar .logo"); // Select the logo
const toggleButton = document.querySelector(".menu-toggle"); // Select the toggle button

// Toggle menu on button click
menuToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("show");
});

// Close the toggle when a nav link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbarLinks.classList.remove("show");
    });
});

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    // Hide navbar, logo, and toggle button when scrolling down
    if (st > lastScrollTop) {
        navbar.style.transform = "translateY(-100%)"; // Hide navbar
        logo.style.transform = "translateY(-100%)"; // Hide logo
        toggleButton.style.transform = "translateY(-100%)"; // Hide toggle button
    } else {
        navbar.style.transform = "translateY(0)"; // Show navbar
        logo.style.transform = "translateY(0)"; // Show logo
        toggleButton.style.transform = "translateY(0)"; // Show toggle button
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});
