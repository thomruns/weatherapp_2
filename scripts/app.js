// script for DOM manipulation

const cityForm = document.querySelector('form');

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
    .then(data => console.log(data))
    .catch(err => console.log(err));
});