// script for DOM manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateCity = async (city) => {
  // use the location API function in forecast.js
  const cityDets = await getCity(city);
  // use the weather API function in forecast.js
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets: cityDets,
    weather: weather
  }
}

// Update the UI
const updateUI = (data) => {

  // REFERENCE ONLY; DESTRUCTURED DATA OBJECT BELOW  
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // DESTRUCTURING THE DATA OBJECT PROPERTIES INSTEAD
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${ cityDets.EnglishName }</h5>
      <div class="my-3">${ weather.WeatherText }</div>
      <div class="display-4 my-4">
        <span>${ weather.Temperature.Imperial.Value }</span>
        <span>&deg;F</span>
      </div>
    `;

    // update the night/day icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // check to see if it is day or night
    let timeSrc = (weather.IsDayTime ? 'img/day.svg' : 'img/night.svg');

    time.setAttribute('src', timeSrc);

    // remove d-none class if present
    if(card.classList.contains('d-none')) {
      card.classList.remove('d-none');
    }
}

// event listener on UI form input field
cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();
  // get form user input value, trim any possible whitespace
  const city = cityForm.city.value.trim();
  // reset the form after submission
  cityForm.reset();
  // update UI w new city, async calls to API
  // returns a promise
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
