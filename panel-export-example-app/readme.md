# panel-export-example-app

This sample panel is built to show developers how they can export a saved asset in a different format to a different location.

By the end of this guide, we will have an Adobe Photoshop panel that:

1. When user saves the asset, user will be able to choose other file types to save the asset as
	- PDF
	- JPG
	- PNG
	- Original
1. Save the asset in a new location

## Prerequisites
This guide will assume that you have read and completed the following resources.

- [How to create your first Adobe panel in 6 easy steps](https://medium.com/adobe-io/how-to-create-your-first-adobe-panel-in-6-easy-steps-f8bd4ed5778)
- [Debugging your Adobe panel](https://medium.com/adobe-io/debugging-your-adobe-panel-cf73f00f6961)

## Configuration
### Download `CSInterface.js`
Access [Adobe CEP Repository](https://github.com/Adobe-CEP/CEP-Resources/) and copy and paste the newest version of `CSInterface.js` that's compatible with your version of Creative Cloud

### mainfest.xml
This sample is designed to be compatible with three different Adobe applications:
	- Photoshop
	- Illustrator
	- Indesign
Make sure to include these in `<HostList>`.
```
<HostList>
      <Host Name="PHXS" Version="16.0" />
      <Host Name="PHSP" Version="16.0" />
      <Host Name="ILST" Version="16.0" />
      <Host Name="IDSN" Version="13.0" />
</HostList>
```

## Client-side Setup
### index.js
In this sample, `index.js` listens to user's `save` action. `exportDoc` simply reveals four different file types to save as and resizes the panel.
```
csInterface.addEventListener("documentAfterSave", exportDoc);

function exportDoc() {
	csInterface.resizeContent(100,400)
    buttonGroup.style.display = "block" 
}
```
Once the options are shown on the screen, `exportWithType(type)` uses `evalScript()` to communicate with the host application.
```
function exportWithType(type){
	buttonGroup.style.display = "none" 	
	csInterface.evalScript(`exportFile("${type}")`, function(path){
		alert("file saved at " + path)
	})
}
```

## Host-side Setup
### index.jsx
`index.jsx` is the Ecmascript 3 JavaScript file used to access the APIs that expose the existing Photoshop functionalities. In this example, there is only one function written (`exportFile(type)`). Note that you can keep the common code at the top of the function like this: 
```
unction exportFile(type) {
	var filePath = app.activeDocument.fullName
	var splitted = filePath.toString().split('.')
	var originalExtension = splitted[splitted.length-1] 
    var sanitizedFilePath = File(filePath).fsName;
	...
```
However, since the host-side script syntax is different from app to app, you will need to handle it case by case like below:
```
if (app.name == "Adobe Illustrator") {
		...
	} else if (app.name == "Adobe Photoshop"){
		...
	} else if (app.name == "Adobe InDesign"){
		...
	}
	...
```
If you want to explore further with the Extend Script, refer to [Adboe Photoshop Scripting](https://www.adobe.com/devnet/photoshop/scripting.html). 

