// weather API interface

// AccuWeather API Key here:
const key = 'API_KEY_HERE';

const getCity = async (city) => {
  
  // base URL of API location endpoint
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  // complete the query string required to get location
  const query = `?apikey=${key}&q=${city}`;

  // use fetch w the constructed query string
  const response = await fetch(base + query); // returns a promise
  
  // process response
  const data = await response.json();

  // 
  return data[0];
}

getCity('Oceanside')
  .then(data => console.log(data))
  .catch(err => console.log(err));
