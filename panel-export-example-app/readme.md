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
In this sample, users can export the current file in four different file types to the current directory.`exportWithType(type)` uses `evalScript()` to communicate with the host application.
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
If you want to explore further with the Extend Script, refer to the following reference docs:
- [Adboe Photoshop Reference Doc](https://www.adobe.com/devnet/photoshop/scripting.html)
- [Adobe Illustrator Reference Doc](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/illustrator/pdf/Illustrator_JavaScript_Scripting_Reference_2017.pdf)
- [InDesign Reference Guide](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/indesign/sdk/cs6/scripting/InDesign_ScriptingGuide_JS_JP.pdf)

