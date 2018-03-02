
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
csInterface.addEventListener("documentAfterSave", exportDoc);

var extDir = csInterface.getSystemPath("extension");

function exportDoc() {
	console.log("saved")
	csInterface.resizeContent(100,400)
    buttonGroup.style.display = "block" 
}

function exportWithType(type){
	buttonGroup.style.display = "none" 	
	csInterface.evalScript(`exportFile("${type}")`, function(path){
		var splitted = path.split("/")
		alert("file saved at " + path)
	})
}