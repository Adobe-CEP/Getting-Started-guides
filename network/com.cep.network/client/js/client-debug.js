const debugDiv = document.querySelector("#debug");

// make the options
let options = [];
for (weatherType in weatherTypes) {
  options.push(`<option value="${weatherType}">${weatherTypes[weatherType]}</option>`);
}

// make the select
let select = `<hr><select name="weather-type-selector">${options.join("")}</select>`;

// add select to debug div
debugDiv.innerHTML = select;

// handle weather changes
const weatherTypeSelector = document.querySelector("select[name='weather-type-selector']");
weatherTypeSelector.addEventListener("change", handleChange);

function handleChange(e) {
  setWeather(e.target.value);
}
