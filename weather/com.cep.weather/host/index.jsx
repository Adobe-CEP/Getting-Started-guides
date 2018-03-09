function applyWeatherToAsset(currentWeather, currentWeatherString) {
  var layer;
  var frame;

  if (app.name === "Adobe Photoshop") {
    layer = app.documents[0].artLayers[0];
  }
  else if (app.name === "Adobe InDesign") {
    frame = app.documents.item(0).pages.item(0).textFrames.add({geometricBounds: [72, 72, 110, 300]});
  }

  switch (currentWeather) {
    case "clear-day":
      if (app.name === "Adobe Photoshop") {
        layer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "clear-night":
      if (app.name === "Adobe Photoshop") {
        layer.adjustColorBalance([0,0,33], [-39,-14,100], [-10,0,17]);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "rain":
      if (app.name === "Adobe Photoshop") {
        layer.adjustColorBalance([0,0,-35], [-45,24,41], [-6,8,38]);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "snow":
      if (app.name === "Adobe Photoshop") {
        layer.adjustColorBalance([-100,0,2], [-100,0,60], [-58,0,15]);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "sleet":
      if (app.name === "Adobe Photoshop") {
        layer.adjustColorBalance([-100,0,2], [-100,0,60], [-58,0,15]);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "wind":
      if (app.name === "Adobe Photoshop") {
        layer.adjustColorBalance([0,0,0], [-10,0,0], [-50,0,0]);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "fog":
      if (app.name === "Adobe Photoshop") {
        psHueSatLight(0, -50, 50);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "cloudy":
      if (app.name === "Adobe Photoshop") {
        psHueSatLight(0, -69, -21);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "partly-cloudy-day":
      if (app.name === "Adobe Photoshop") {
        psHueSatLight(0, 0, -25);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    case "partly-cloudy-night":
      if (app.name === "Adobe Photoshop") {
        psHueSatLight(33, -75, -50);
      }
      else if (app.name === "Adobe InDesign") {
        frame.contents = currentWeatherString;
      }
      break;

    default:
      alert("default");
  }
}

function psHueSatLight(Hue,Sat,Light) {
    var desc9 = new ActionDescriptor();
    desc9.putBoolean( charIDToTypeID('Clrz'), false );
        var list2 = new ActionList();
            var desc10 = new ActionDescriptor();
            desc10.putInteger( charIDToTypeID('H   '), Hue );
            desc10.putInteger( charIDToTypeID('Strt'), Sat );
            desc10.putInteger( charIDToTypeID('Lght'), Light );
        list2.putObject( charIDToTypeID('Hst2'), desc10 );
    desc9.putList( charIDToTypeID('Adjs'), list2 );
    executeAction( charIDToTypeID('HStr'), desc9, DialogModes.NO );
};
