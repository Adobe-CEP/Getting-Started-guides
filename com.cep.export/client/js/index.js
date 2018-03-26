
/*
  CSInterface
*/
var csInterface = new CSInterface();
/*
  UI Elements
*/
var buttonGroup = document.querySelector("#button-group");
var pdfButton = document.querySelector("#export-pdf");
var jpgButton = document.querySelector("#export-jpg");
var pngButton = document.querySelector("#export-png");
var originalButton = document.querySelector("#export-original");

/*
  Event listeners
*/
pdfButton.addEventListener('click', function(){exportWithType('pdf');}, false);
jpgButton.addEventListener('click', function(){exportWithType('jpg');}, false);
pngButton.addEventListener('click', function(){exportWithType('png');}, false);
originalButton.addEventListener('click', function(){exportWithType();}, false);

function exportWithType(type){
	csInterface.evalScript(`exportFile("${type}")`, function(path){
		alert("file saved at " + path)
	})
}