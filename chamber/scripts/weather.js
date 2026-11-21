const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const humidity = document.querySelector('#humidity');
const forecastList = document.querySelector('#forecast');

const myKey = '798111e4284de61bc8232643b4154dfe';
const myLat = '5.60';
const myLon = '-0.19';
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;

async function apiFetch(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
  humidity.textContent = `${data.main.humidity}%`;
}

function displayForecast(data) {
  const days = {};
  data.list.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0];
    (days[date] = days[date] || []).push(entry.main.temp);
  });
  const dates = Object.keys(days).slice(1, 4); 
  forecastList.innerHTML = dates.map((date) => {
    const temps = days[date];
    const label = new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' });
    return `<li><span class="day">${label}</span> High ${Math.round(Math.max(...temps))}&deg;C / Low ${Math.round(Math.min(...temps))}&deg;C</li>`;
  }).join('');
}

async function loadWeather() {
  const current = await apiFetch(currentUrl);
  const forecast = await apiFetch(forecastUrl);
  if (current) displayResults(current);
  else captionDesc.textContent = 'Weather is unavailable right now.';
  if (forecast) displayForecast(forecast);
}

loadWeather();