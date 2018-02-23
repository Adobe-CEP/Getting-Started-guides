

function adjustArtLayer(currentWeather) {
  var artLayer = app.documents[0].artLayers[0];

  switch (currentWeather) {
    case "clear-day":
      artLayer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      break;
    case "clear-night":
      artLayer.adjustColorBalance([0,0,33], [-39,-14,100], [-10,0,17]);
      break;
    case "rain":
      artLayer.adjustColorBalance([0,0,-35], [-45,24,41], [-6,8,38]);
      break;
    case "snow":
      artLayer.adjustColorBalance([-100,0,2], [-100,0,60], [-58,0,15]);
      break;
    case "sleet":
      artLayer.adjustColorBalance([-100,0,2], [-100,0,60], [-58,0,15]);
      break;
    case "wind":
      //artLayer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      break;
    case "fog":
      //artLayer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      break;
    case "cloudy":
      //artLayer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      break;
    case "partly-cloudy-day":
      //artLayer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      break;
    case "partly-cloudy-night":
      //artLayer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      break;

    default:
      alert("default");
  }

  // alert(currentWeather);
  // var artLayer = app.documents[0].artLayers[0];
  // artLayer.adjustColorBalance([0, 100, 100]);
}

/*
  clear-day: [0,0,0], [-10,0,0], [-50,0,0]
  clear-night: [0,0,33], [-39,-14,100], [-10,0,17]
  rain: [0,0,-35], [-45,24,41], [-6,8,38]
  snow: [-100,0,2], [-100,0,60], [-58,0,15]
  sleet: ""
  wind:
  fog: hue/saturation: saturation -50, lightness +50
  cloudy: hue/saturation: saturation -69, lightness -21
  partly cloudy day: lightness -25
  partly cloudy night: hue 33, sat -75, lightness -50
*/
