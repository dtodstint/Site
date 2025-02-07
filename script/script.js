const menuToggle = document.getElementById("menuToggle");
const navbarLinks = document.getElementById("navbar-links");
const navLinks = document.querySelectorAll(".navbar a");
const navbar = document.getElementById("navbar");
const logo = document.querySelector(".navbar .logo");
const toggleButton = document.querySelector(".menu-toggle");

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

    // Hide navbar and elements when scrolling down for all screen sizes
    if (st > lastScrollTop) {
        navbar.style.transform = "translateY(-100%)";
        if (window.innerWidth <= 768) {
            logo.style.transform = "translate(-50%, -100%)";
        } else {
            logo.style.transform = "translateY(-100%)";
        }
    } else {
        // Show navbar and elements when scrolling up
        navbar.style.transform = "translateY(0)";
        if (window.innerWidth <= 768) {
            logo.style.transform = "translate(-50%, 0)";
        } else {
            logo.style.transform = "translateY(0)";
        }
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});
