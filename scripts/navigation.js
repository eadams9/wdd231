// Store elements
const hamBtn = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

// Toggle the navigation menu
hamBtn.addEventListener('click', () => {
    const isOpen = navBar.classList.toggle('show');
    hamBtn.classList.toggle('show', isOpen);
    hamBtn.setAttribute('aria-expanded', isOpen);
});
