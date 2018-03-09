/*
  CSInterface
*/
const csInterface = new CSInterface();
const DEBUG_FLAG = false;

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
  "partly-cloudy-night": "a partly cloudy night"
}

const cities = {
  "none": {name: "--"},
  "new-york": {name: "New York", lat: "40.40", lon: "-73.56"},
  "los-angeles": {name: "Los Angeles", lat: "34.03", lon: "-118.15"},
  "tokyo": {name: "Tokyo", lat: "35.41", lon: "139.42"},
  "beijing": {name: "Beijing", lat: "39.55", lon: "116.23"},
  "london": {name: "London", lat: "51.30", lon: "-0.08"}
}

/*
  UI Elements
*/
const citySelector = document.querySelector("select[name='city-selector']");
const applyWeatherButton = document.querySelector("#apply-weather-button");
const weatherSummary = document.querySelector("#weather-summary");

/*
  Event listeners
*/
document.addEventListener("DOMContentLoaded", populateCitySelector);
applyWeatherButton.addEventListener("click", applyWeatherToAsset);

/*
  Helper methods
*/
function populateCitySelector() {
  let defaultCity = "new-york";

  for (city in cities) {
    if (city === defaultCity) citySelector.innerHTML += `<option value="${city}" selected>${cities[city].name}</option>`;
    else citySelector.innerHTML += `<option value="${city}">${cities[city].name}</option>`;
  }
  citySelector.addEventListener("change", setCity);

  getWeather(defaultCity);
}

function setCity(e) {
  console.log("setCity()");
  weatherSummary.textContent = "";

  if (e.target.value === "none") return;
  getWeather(e.target.value);
}

function getWeather(selectedCity) {
  console.log("getWeather()");
  let cityObj = cities[selectedCity];
  let reqUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${cityObj.lat},${cityObj.lon}?exclude=${darkSkyExcludes}`;

  fetch(reqUrl)
    .then(function(res) {
      console.log(res);
      if (res.ok) return res.json();
    })
    .then(function(json) {
      setWeather(json.currently.icon, cityObj.name);
    })
    .catch(function(err) {
      console.log(err);
      weatherSummary.textContent = `We had trouble getting the weather for ${cityObj.name}. Please try again.`;
    });
}

function setWeather(currentWeather, cityName) {
  applyWeatherButton.dataset.currentWeather = currentWeather;
  weatherSummary.textContent = `It looks like it's ${weatherTypes[currentWeather]} in ${cityName}.`;
}

function applyWeatherToAsset(e) {
  csInterface.evalScript(`applyWeatherToAsset('${e.target.dataset.currentWeather}')`);
}
