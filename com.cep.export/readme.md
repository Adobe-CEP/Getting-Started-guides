# panel-export-example-app

This sample panel is built to show developers how they can export a saved asset in a different format.

By the end of this guide, we will have an Adobe Photoshop panel that:

1. Exports the active document as one of the following formats:
	- PDF
	- JPG
	- PNG
	- Original

<!-- $ doctoc ./readme.md --title "**Contents**" --entryprefix 1. --gitlab -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

1. [Technology Used](#technology-used)
1. [Prerequisites](#prerequisites)
1. [Configuration](#configuration)
    1. [Set up the sample extension](#set-up-the-sample-extension)
    1. [Configure `mainfest.xml`](#configure-mainfestxml)
1. [Client-side: HTML Markup](#client-side-html-markup)
1. [Client-side: Creative Cloud host app interaction](#client-side-creative-cloud-host-app-interaction)
    1. [Create references to the UI elements](#create-references-to-the-ui-elements)
    1. [Add a click handler to the button](#add-a-click-handler-to-the-button)
    1. [Instantiate `CSInterface`](#instantiate-csinterface)
    1. [Communicate with the host app](#communicate-with-the-host-app)
1. [Host app: Automation with ExtendScript](#host-app-automation-with-extendscript)
    1. [Create an ExtendScript function](#create-an-extendscript-function)
    1. [Keep the common elements at the top](#keep-the-common-elements-at-the-top)
    1. [Handle logic separately between different host apps](#handle-logic-separately-between-different-host-apps)
    1. [Write ExtendScript code](#write-extendscript-code)
1. [Best Practices](#best-practices)
1. [Troubleshooting and Known Issues](#troubleshooting-and-known-issues)
1. [Other Resources](#other-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Technology Used
- Supported Host Applications: Photoshop, Illustrator, InDesign
- Libraries/Frameworks/APIs:
    - Adobe-specific: [CEP](https://github.com/Adobe-CEP/CEP-Resources/), ExtendScript for Photoshop, Illustrator, and InDesign

## Prerequisites
This guide will assume that you have read and completed the following resources.

- [How to create your first Adobe panel in 6 easy steps](https://medium.com/adobe-io/how-to-create-your-first-adobe-panel-in-6-easy-steps-f8bd4ed5778)
- [Debugging your Adobe panel](https://medium.com/adobe-io/debugging-your-adobe-panel-cf73f00f6961)

## Configuration
### Set up the sample extension
The following steps will help you get the sample extension for this guide up and running:
1. Install the `./com.cep.export/` directory in your `extensions` folder. ([See the Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-folders) if you are unsure where your `extensions` folder is.)

1. Download `CSInterface.js` from [Adobe CEP Repository](https://github.com/Adobe-CEP/CEP-Resources/) and move it to `./com.cep.export/client/js/lib/CSInterface.js`

### Configure `mainfest.xml`
As noted in the [Getting Started guide](), the `manifest.xml` file is where, among other things, you indicate which Creative Cloud host apps and version numbers your extension supports.

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

Note that the versions indicted in the example code above only target a single version of each host app, for the sake of demo simplicity. Most extension developers will want to target a range of host app versions. To learn how to support multiple host app versions, [see the Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-manifest).

## Client-side: HTML Markup
The user interface for CEP extensions is written in HTML. For this sample, the HTML document is located at `./com.cep.weather-simple/client/index.html` and contains the following code (see comments **#1-2**):
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Export Example App</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<h1>Export Example App</h1>
	<div id="button-group">
	  <!-- 1) buttons for different export types -->
		<button id="export-original" class="btn btn-primary btn-block">Original</button>
		<button id="export-pdf" class="btn btn-primary btn-block">PDF</button>
		<button id="export-jpg" class="btn btn-primary btn-block">JPG</button>
		<button id="export-png" class="btn btn-primary btn-block">PNG</button>
	</div>
	  <!-- 2) Your scripts, including CEP's CSInterface.js library -->
	<script type="text/javascript" src="js/lib/CSInterface.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
</body>
</html>

```

Note that, while this guide will not cover styling an extension with CSS, the CSS stylesheet for this sample panel can be found at `./com.cep.weather-simple/client/styles/style.css`.

## Client-side: Creative Cloud host app interaction
### Create references to the UI elements
```javascript
var buttonGroup = document.querySelector("#button-group");
var pdfButton = document.querySelector("#export-pdf");
var jpgButton = document.querySelector("#export-jpg");
var pngButton = document.querySelector("#export-png");
var originalButton = document.querySelector("#export-original");
```
We'll work with these UI elements in the next step.

### Add a click handler to the button
We'll add a click handler to buttons:

```javascript
pdfButton.addEventListener('click', function(){exportWithType('pdf');}, false);
jpgButton.addEventListener('click', function(){exportWithType('jpg');}, false);
pngButton.addEventListener('click', function(){exportWithType('png');}, false);
originalButton.addEventListener('click', function(){exportWithType();}, false);
```

### Instantiate `CSInterface`
For any CEP panel, you'll need an instance of `CSInterface`, which, among other things, gives you a way to communicate with the host app's scripting engine:

```javascript
var csInterface = new CSInterface();
```

### Communicate with the host app
To communicate with the host app's scripting engine, we'll make use of the `csInterface.evalScript()` method. (If you need a refresher on the `.evalScript()` method, refer to the [Getting Started guide]().) In this sample, users can export the current file in four different file types to the current directory.`exportWithType(type)` uses `evalScript()` to communicate with the host application.
```javascript
function exportWithType(type){
	csInterface.evalScript(`exportFile("${type}")`, function(path){
		alert("file saved at " + path)
	})
}
```

## Host app: Automation with ExtendScript
Many CC host apps like Photoshop, Illustrator, and InDesign (and many more) can be automated with ExtendScript, which provides many deep features to automate work in CC host apps; you can explore more ExtendScript features in our Scripting Guides. The ExtendScript file for this extension is located at `./com.cep.export/host/index.jsx`.

### Create an ExtendScript function
In the extension's `index.jsx` file, there is only one function written (`exportFile(type)`). 

### Keep the common elements at the top
Note that available DOM properties and methods vary for each host app. However, there are some common elements that apply in all three host applications that this extension is built for. You can keep the common code at the top of the function like this (see comments **#1-4**): 
```javascript
function exportFile(type) {
	/* 1) get the full file path */
	var filePath = app.activeDocument.fullName

	/* 2) split the path to get the extension of the file */
	var originalExtension = filePath.toString().split('.')[1]

	/* 3) split the path to get the folder path */	
	var folderPath = filePath.toString().split('/').slice(0,-1).join('/') + '/'

	/* 4) sanitize the full path */
	var sanitizedFilePath = File(filePath).fsName;
	...
}
```

### Handle logic separately between different host apps
Since the host-side script syntax is different from app to app, you will need to handle it case by case like below:
```javascript
if (app.name == "Adobe Illustrator") {
	...
} else if (app.name == "Adobe Photoshop"){
	...
} else if (app.name == "Adobe InDesign"){
	...
}
	...
```

### Write ExtendScript code
Under each `if` block of the host apps, you will handle each export type separately in multiple `if` blocks like below Photoshop example (see comments **#1-6**):
```javascript
if (type == "pdf"){

	/* 1) set PDF save options */
	pdfSaveOptions = new PDFSaveOptions()
	pdfSaveOptions.optimization = true

	/* 2) Use saveAs to export the PDF document (note you cannot exportFile a PDF) */
	app.activeDocument.saveAs(File(sanitizedFilePath), pdfSaveOptions);

} else if (type == "jpg"){

	/* 3) set JPEG save options */
	var exportOptions = new ExportOptionsJPEG();
	exportOptions.blurAmount = 2;
	exportOptions.matte = true;
	exportOptions.qualitySetting = 100;

	/* 4) Use exportFile to export the JPEG document */
	app.activeDocument.exportFile(File(sanitizedFilePath), ExportType.JPEG, exportOptions);

} else if (type == "png"){
	/* 5) set PNG save options */
	var exportOptions = new ExportOptionsPNG8();
	exportOptions.matte = true;

	/* 6) Use exportFile to export the PNG document */
	app.activeDocument.exportFile(File(sanitizedFilePath), ExportType.PNG8, exportOptions);
} 
```
Note that above example is written for Photoshop. Other application's ExtendScripts will follow the same logic flow but syntax might be different for each app.

## Best Practices
_(optional)_


## Troubleshooting and Known Issues
Articles about common issues are [here](!LINK).

You can submit tickets for bugs and feature requests [here](!LINK).

## Other Resources
If you want to explore further with the ExtendScript, refer to the following reference docs:
- [Adboe Photoshop Reference Doc](https://www.adobe.com/devnet/photoshop/scripting.html)
- [Adobe Illustrator Reference Doc](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/illustrator/pdf/Illustrator_JavaScript_Scripting_Reference_2017.pdf)
- [InDesign Reference Guide](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/indesign/sdk/cs6/scripting/InDesign_ScriptingGuide_JS_JP.pdf)

