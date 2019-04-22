// script for DOM manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


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
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // store the city in local storage
  localStorage.setItem('city', city);
});

// retrieve most recent search from local storage if there is one
if(localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))  // returns a promise
  .then(data => updateUI(data))
  .catch(err => console.log(err));
}

