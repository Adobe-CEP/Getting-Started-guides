/*
  CSInterface
*/
const csInterface = new CSInterface();

/*
  UI Elements
*/
const applyWeatherButton = document.querySelector("#apply-weather-button");
const weatherSummary = document.querySelector("#weather-summary");

/*
  Event listeners
*/
applyWeatherButton.addEventListener("click", applyWeather);

/*
  Helper methods
*/
function applyWeather(e) {
  csInterface.evalScript(`adjustArtLayer('${e.target.dataset.currentWeather}')`);
}

const darkSkyExcludes = "minutely,hourly,daily,alerts,flags";

const weatherTypes = {
  "clear-day": "a clear day",
  "clear-night": "a clear night",
  "rain": "raining",
  "snow": "snowing",
  "sleet": "sleeting",
  "wind": "windy",
  "fog": "foggy",
  "cloudy": "cloudy",
  "partly-cloudy-day": "a partly cloudy day",
  "partly-cloudy-night": "partly cloudy night"
}

fetch(`https://api.darksky.net/forecast/${darkSkyKey}/37.8267,-122.4233?exclude=${darkSkyExcludes}`)
  .then(function(res) {
    if (res.ok) return res.json();

    // handle res failure
  })
  .then(function(json) {
    let currentWeather = json.currently.icon;
    applyWeatherButton.dataset.currentWeather = currentWeather;
    weatherSummary.textContent = `It looks like it's ${weatherTypes[currentWeather]}.`;
  });
