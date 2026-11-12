// Shared by every page: menu, dark mode, footer dates
const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.innerHTML = isOpen ? '&#10005;' : '&#9776;';
});

const themeButton = document.querySelector('#theme-toggle');
try {
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
} catch (e) { /* storage unavailable */ }

themeButton.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) { }
});

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;
