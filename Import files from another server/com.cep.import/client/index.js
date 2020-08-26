/*
  CSInterface
*/
var csInterface = new CSInterface();

/*
  UI Elements
*/
var importButton = document.querySelector("#import-button");
var documentsButton = document.querySelector("#documents-button");
var extensionButton = document.querySelector("#extension-button");
var downloadOptions = document.querySelector("#download-options");

/*
  Event listeners
*/
importButton.addEventListener("click", importToggle);
documentsButton.addEventListener("click", function(){importTo('documents');}, false);
extensionButton.addEventListener("click", function(){importTo('extension');}, false);

/*
  User folder paths
*/
var extensionDirectory = csInterface.getSystemPath("extension");
var documentsDirectory = csInterface.getSystemPath("myDocuments");

/*
  Starting Node JS
*/
csInterface.requestOpenExtension("com.cep.import.localserver", "");

/*
  Helper methods
*/
function importToggle() {
    if (downloadOptions.style.display === "none") {
        downloadOptions.style.display = "block";
        importButton.innerText = "Cacel";
    } else {
        downloadOptions.style.display = "none";
        importButton.innerText = "Import from external server";
    }
}

function importTo(location) {
	var directory = location == "documents" ? documentsDirectory : extensionDirectory;
	var url = "http://localhost:3200/import";
	
	$.ajax({
		type: "GET",
		url: url,
		headers: {
			"directory": directory
		},
		success: response => {
			downloadOptions.style.display = "none";
			importButton.innerText = "Import from external server";
			alert(`File imported. Location: ${response}`);
			csInterface.evalScript(`displayFile("${response}")`);
		},
		error: (jqXHR, textStatus, errorThrown) => { 
			console.log("error");
			alert(errorThrown, jqXHR.responseJSON);
		}
	})

}


