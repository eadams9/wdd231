const spotlightUrl = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlights');
const spotlightLevels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

async function getSpotlights() {
    try {
        const response = await fetch(spotlightUrl);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = await response.json();
        const eligible = data.members.filter((m) => m.membership >= 2); 
        const shuffled = eligible.sort(() => Math.random() - 0.5);       
        displaySpotlights(shuffled.slice(0, 3));                         
    } catch (error) {
        console.error(error);
        spotlightContainer.innerHTML = '<p class="error">Spotlights could not be loaded.</p>';
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = '';
    spotlightContainer.className = 'spotlight-grid';
    members.forEach((m) => {
        const level = spotlightLevels[m.membership];
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
      <h3>${m.name}</h3>
      <p class="tagline">${m.tagline}</p>
      <img src="images/${m.image}" alt="${m.name} logo" width="120" height="120" loading="lazy">
      <p><strong>PHONE:</strong> ${m.phone}</p>
      <p><strong>ADDRESS:</strong> ${m.address}</p>
      <p><strong>URL:</strong> <a href="${m.website}" target="_blank">${m.website}</a></p>
      <span class="badge ${level.toLowerCase()}">${level}</span>`;
        spotlightContainer.appendChild(card);
    });
}

getSpotlights();