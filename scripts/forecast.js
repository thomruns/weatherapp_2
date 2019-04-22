// weather API interface
// create a class to encapsulate all functionality

class Forecast {
  constructor() {
    this.key = 'API_KEY_HERE';
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  }
  async updateCity(city) {
    // use the location API function in forecast.js
    const cityDets = await this.getCity(city);
    // use the weather API function in forecast.js
    const weather = await this.getWeather(cityDets.Key);
    return { cityDets, weather };
  }
  async getCity(city) {
    // complete the query string required to get location
    const query = `?apikey=${this.key}&q=${city}`;
    // use fetch w the constructed query string
    const response = await fetch(this.cityURI + query); // returns a promise
    // process response
    const data = await response.json();
    // this takes the first dataset from the returned array as the likeliest match
    return data[0];
  }
  async getWeather(id) {
    // location key
    const query = `${id}?apikey=${this.key}`;
    // use fetch w constructed query string
    const response = await fetch(this.weatherURI + query); // returns a promise
    const data = await response.json();
    // return the object instead of the array
    return data[0];
  }
}
