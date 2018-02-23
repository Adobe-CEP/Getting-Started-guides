/*
  CSInterface
*/
const csInterface = new CSInterface();

/*
  UI Elements
*/
const greetingButton = document.querySelector("#greeting-button");
const weatherSummary = document.querySelector("#weather-summary");

/*
  Event listeners
*/
greetingButton.addEventListener("click", alertGreeting);

/*
  Helper methods
*/
function alertGreeting() {
  csInterface.evalScript("sayHello()");
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

let currentWeather;

fetch(`https://api.darksky.net/forecast/${darkSkyKey}/37.8267,-122.4233?exclude=${darkSkyExcludes}`)
  .then(function(res) {
    if (res.ok) return res.json();

    // handle res failure
  })
  .then(function(json) {
    currentWeather = weatherTypes[json.currently.icon];
    weatherSummary.textContent = `It looks like it's ${currentWeather}.`;
  });
