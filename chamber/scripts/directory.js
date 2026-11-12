const url = 'data/members.json';
const container = document.querySelector('#members');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p class="error">Members could not be loaded. Please try again later.</p>';
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach((m) => {
    const level = levels[m.membership] || 'Member';
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="head">
        <h2>${m.name}</h2>
        <p class="tagline">${m.tagline}</p>
        <span class="badge ${level.toLowerCase()}">${level}</span>
      </div>
      <img src="images/${m.image}" alt="${m.name} logo" width="120" height="120" loading="lazy">
      <p><strong>ADDRESS:</strong> ${m.address}</p>
      <p><strong>PHONE:</strong> ${m.phone}</p>
      <p><strong>EMAIL:</strong> <a href="mailto:${m.email}">${m.email}</a></p>
      <p><strong>URL:</strong> <a href="${m.website}" target="_blank" rel="noopener">${m.website.replace(/^https?:\/\//, '')}</a></p>`;
    container.appendChild(card);
  });
}

function setView(view) {
  container.classList.toggle('grid', view === 'grid');
  container.classList.toggle('list', view === 'list');
  gridButton.setAttribute('aria-pressed', view === 'grid');
  listButton.setAttribute('aria-pressed', view === 'list');
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

getMembers();
