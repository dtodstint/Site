// Get elements
const messageIcon = document.getElementById('message-icon');
const socialIcons = document.querySelector('.social-icons');
const closeIcon = document.querySelector('.close-icon');

// Variable to store the timeout
let hideMenuTimeout;

// Function to show the social media menu
function showSocialMenu() {
    // Hide the message icon
    messageIcon.style.display = 'none';

    // Show the social media menu
    socialIcons.classList.add('active');

    // Set a timeout to hide the menu after 5 seconds
    hideMenuTimeout = setTimeout(() => {
        hideSocialMenu();
    }, 5000);
}

// Function to hide the social media menu
function hideSocialMenu() {
    // Hide the social media menu
    socialIcons.classList.remove('active');

    // Show the message icon
    messageIcon.style.display = 'flex';
}

// Initial behavior: Show the menu on page load and hide it after 5 seconds
window.addEventListener('load', () => {
    // Show the social media menu
    socialIcons.classList.add('active');

    // Set a timeout to hide the menu after 5 seconds
    hideMenuTimeout = setTimeout(() => {
        hideSocialMenu();
    }, 5000);
});

// Event listener for the message icon
messageIcon.addEventListener('click', () => {
    // Clear any existing timeout
    clearTimeout(hideMenuTimeout);

    // Show the social media menu
    showSocialMenu();
});

// Event listener for the close icon
closeIcon.addEventListener('click', () => {
    // Clear the timeout to prevent auto-hiding
    clearTimeout(hideMenuTimeout);

    // Hide the social media menu immediately
    hideSocialMenu();
});








// // Get elements
// const messageIcon = document.getElementById('message-icon');
// const socialIcons = document.querySelector('.social-icons');
// const closeIcon = document.querySelector('.close-icon');

// // Show the social media menu on page load
// socialIcons.classList.add('active');

// // Timer to hide the social media menu after 5 seconds
// let hideMenuTimeout = setTimeout(() => {
//     socialIcons.classList.remove('active');
//     messageIcon.style.display = 'flex';
// }, 5000);

// // Reset the timer if the user interacts with the social media menu
// socialIcons.addEventListener('mouseover', () => {
//     clearTimeout(hideMenuTimeout);
// });

// // Toggle the sidebar when the message icon is clicked
// messageIcon.addEventListener('click', () => {
//     // Hide the message icon
//     messageIcon.style.display = 'none';

//     // Show the social media icons with a smooth slide-in effect
//     socialIcons.classList.add('active');
// });

// // Close the sidebar when the close icon is clicked
// closeIcon.addEventListener('click', () => {
//     // Hide the social media icons with a smooth slide-out effect
//     socialIcons.classList.remove('active');

//     // Show the message icon again
//     messageIcon.style.display = 'flex';
// });

