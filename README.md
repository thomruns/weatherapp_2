# WeatherApp 2

A simple weather app using the AccuWeather API

The AccuWeather API in use here requires an API key. Two API GET requests are required: first to the locations API to get the key code of the requested city, then, using that key code, a second request to get the current conditions for that location.

The app functionality is structured into two files, app.js and forecast.js. The former is the UI functionality, and the latter handles the calls to the weather API. 