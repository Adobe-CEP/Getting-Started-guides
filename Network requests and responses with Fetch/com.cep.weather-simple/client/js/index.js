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
  Dark Sky API constants
*/
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
  "partly-cloudy-night": "a partly cloudy night"
}


/*
  Event listeners
*/
applyWeatherButton.addEventListener("click", applyWeatherToAsset);

/*
  Helper methods
*/
(function getWeather() {
  let cityObj = {name: "New York", lat: "40.40", lon: "-73.56"};
  let reqUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${cityObj.lat},${cityObj.lon}`;

  fetch(reqUrl)
    .then(function(res) {
      if (res.ok) return res.json();
    })
    .then(function(json) {
      const currentWeatherSlug = json.currently.icon;

      const currentWeatherString = `It looks like it\'s ${weatherTypes[currentWeatherSlug]} in ${cityObj.name}.`;
      weatherSummary.textContent = currentWeatherString;

      applyWeatherButton.dataset.currentWeatherSlug = currentWeatherSlug;
      applyWeatherButton.dataset.currentWeatherString = currentWeatherString;
    })
    .catch(function(err) {
      console.log(err);
      weatherSummary.textContent = `We had trouble getting the weather for ${cityObj.name}. Please try again.`;
    });
})();

function applyWeatherToAsset(e) {
  const dataset = e.target.dataset;

  csInterface.evalScript(`applyWeatherToAsset("${dataset.currentWeatherSlug}", "${dataset.currentWeatherString}")`);
}
