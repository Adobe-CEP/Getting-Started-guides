/*
  CSInterface
*/
var csInterface = new CSInterface();

/*
  UI Elements
*/
var greetingButton = document.querySelector("#greeting-button");

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

fetch(`https://api.darksky.net/forecast/${darkSkyKey}/37.8267,-122.4233?exclude=minutely,hourly,daily,alerts,flags`)
  .then(function(res) {
    if (res.ok) return res.json()
  })
  .then(function(json) {
    console.log(json);
  })
