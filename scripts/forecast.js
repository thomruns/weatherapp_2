// weather API interface

// AccuWeather API Key here:
const key = 'API_KEY_HERE';

// get weather information, returns a promise
// id is the location key passed by getCity()
const getWeather = async (id) => {

  // base URL of API conditions endpoint
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';

  // location key
  const query = `${id}?apikey=${key}`;

  // use fetch w constructed query string
  const response = await fetch(base + query); // returns a promise
  const data = await response.json();

  // return the object instead of the array
  return data[0];
}


// get city information, returns a promise
const getCity = async (city) => {
  
  // base URL of API location endpoint
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  // complete the query string required to get location
  const query = `?apikey=${key}&q=${city}`;

  // use fetch w the constructed query string
  const response = await fetch(base + query); // returns a promise
  
  // process response
  const data = await response.json();

  // this takes the first dataset from the returned array as the likeliest match
  return data[0];
}

