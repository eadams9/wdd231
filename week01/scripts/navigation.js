// store elements

const navbuttom = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

// Toggle the navigation menu
navbuttom.addEventListener('click', () => {
  navbuttom.classList.toggle('show');
  navlinks.classList.toggle('show');
});


navButton.addEventListener('click', () => {
  const isOpen = navButton.classList.toggle('show');
  navButton.setAttribute('aria-expanded', isOpen);
  navBar.classList.toggle('show');
});