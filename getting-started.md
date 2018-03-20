# CEP Panel Getting Started Guide

CEP panels are extensions to Adobe desktop applications like Photoshop, Illustrator, InDesign, After Effects, and many more. These panels let users customize their Creative Cloud experience for their unique workflows. This guide will help you get started building a CEP panel. 

![Example panel](/assets/panel.gif?raw=true)

In this guide, we will cover the basics for creating a simple panel in 6 easy steps.

By the end of this guide, we will have a CEP extension that opens a new document from the user's local folder.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

1. [Technology Used](#technology-used)
1. [Prerequisites](#prerequisites)
1. [Development Steps](#development-steps)
    1. [Decide the folder structure](#decide-the-folder-structure)
    1. [Configure Your Panel in `manifest.xml`](#configure-your-panel-in-manifestxml)
    1. [Download `CSInterface.js`](#download-csinterfacejs)
    1. [Write Your Front-end Code](#write-your-front-end-code)
        1. [Create HTML Markup](#create-html-markup)
        1. [Write Your JavaScript Code](#write-your-javascript-code)
    1. [Write Your ExtendSCript Code](#write-your-extendscript-code)
1. [Best Practices](#best-practices)
1. [Other Resources](#other-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Technology Used
- Supported Host Applications: Photoshop
- Libraries/Frameworks/APIs:
    - Adobe-specific: [CEP](https://github.com/Adobe-CEP/CEP-Resources), [Photoshop ExtendScript](https://www.adobe.com/devnet/photoshop/scripting.html)


## Prerequisites
Basic knowledge of HTML, CSS, and Javascript.


## Development Steps
### 1. Decide the folder structure
You will need to decide where to save your panel code first. Basically, your panel can be saved either at the root level or at the user level, depending on who’s allowed to use the panel (refer to [CEP 8 HTML Extension Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-folders) for the actual paths).
Except for the required `CSXS` folder, which must contain `manifest.xml`, the folder structure is pretty flexible. That said, I would recommend structuring your directories like this:

![Panel structure](/assets/panel-structure.png?raw=true)

- `CSXS` -- contains the `manifest.xml` file, which stores the panel configuration data. As noted above, this is a requirement for your panel to show up in the host app.

- `Client` -- contains the front-end code, such as HTML, JavaScript, CSS, the required Adobe `CSInterface.js` library, and any third-party libraries you might want to include (for example, jQuery)

- `Host` -- contains the ExtendScript file (`index.jsx`), used to access and drive most features in the host app

This structure allows you to achieve a clear separation of concerns by devoting one folder to each.

### 2. Configure Your Panel in `manifest.xml`
There are many configurations you can change or add in this file, but to keep things simple, let’s focus on the minimum requirements ([complete version of the manifest available at Adobe CEP Github](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/ExtensionManifest_v_7_0.xsd)).

- **ExtensionBundleId**: A unique bundle ID you assign to your panel like `com.my.test`
- **Extension Id**: A unique panel ID you assign to your panel. It usually follows this syntax: `ExtensionBundleID` + `.panel` = `com.my.test.panel`
- **Host Name & Version**: List of host application IDs and versions that your panel is built to support. To learn more, take a look at [Adobe CEP HTML Extension Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep)
- **MainPath**: Path to your `index.html`. Make sure the path to this file is from the top level directory of your code base
- **ScriptPath**: Path to your `index.jsx`. Make sure the path to this file is from the top level directory of your code base
- **Menu**: Your panel name that will appear in the dropdown menu
- **Size**: Default size of your panel

```xml
<?xml version='1.0' encoding='UTF-8'?>
<ExtensionManifest ExtensionBundleId="com.my.test" ExtensionBundleVersion="1.0.0" Version="8.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <ExtensionList>
    <Extension Id="com.my.test.panel" Version="1.0.0" />
  </ExtensionList>
  <ExecutionEnvironment>
    <HostList>
      <Host Name="PHSP" Version="19" />
      <Host Name="PHXS" Version="19" />
    </HostList>
    <LocaleList>
      <Locale Code="All" />
    </LocaleList>
    <RequiredRuntimeList>
      <RequiredRuntime Name="CSXS" Version="8.0" />
    </RequiredRuntimeList>
  </ExecutionEnvironment>
  <DispatchInfoList>
    <Extension Id="com.my.test.panel">
      <DispatchInfo>
        <Resources>
          <MainPath>./client/index.html</MainPath>
          <ScriptPath>./host/index.jsx</ScriptPath>
          <CEFCommandLine />
        </Resources>
        <Lifecycle>
          <AutoVisible>true</AutoVisible>
        </Lifecycle>
        <UI>
          <Type>Panel</Type>
          <Menu>My First Panel</Menu>
          <Geometry>
            <Size>
              <Height>500</Height>
              <Width>350</Width>
            </Size>
          </Geometry>
          <Icons />
        </UI>
      </DispatchInfo>
    </Extension>
  </DispatchInfoList>
</ExtensionManifest>
```

### 3. Download `CSInterface.js`
You need to download the latest version of [CSInterface.js](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/CSInterface.js), which is a library that enables you to control the panel and communicate with Adobe products like Photoshop, InDesign, Premiere Pro, and more. Place the downloaded file at the location of your choice. For this example, save the file under `/client`.

### 4. Write Your Front-end Code
Now, it’s time for you to start using your web development skills to build your panel. You can build this out with HTML, CSS, and JavaScript to suit your goals, but let’s have a look at the basic files.

#### Create HTML Markup
The user interface for CEP extensions is written in HTML. For this example, locate the HTML document at `/client/index.html` and write the following code (see comments **#1-3**):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your First Panel</title>
</head>
<body>
    /* 1) Simple HTML UI elements to get us started */
    <h1>Your first panel</h1>
    /* 2) A button */
    <button id="open-button">Open</button>
    /* 3) Add your script dependencies here, including CEP's CSInterface.js library */
    <script type="text/javascript" src="CSInterface.js"></script>
    <script type="text/javascript" src="index.js"></script>
</body>
</html>
```

#### Write Your JavaScript Code
Be as imaginative as you can, but make sure to create an instance of `CSInterface`. Once you do that, one of its methods, `evalScript()`, will let you communicate to your ExtendScript code (`host/index.jsx` - covered in the later section of the guide) (see comments **#1-3**): 

```javascript
/* 1) Create an instance of CSInterface. */
var csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
var openButton = document.querySelector("#open-button");
openButton.addEventListener("click", openDoc);

/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function openDoc() {
  csInterface.evalScript("openDocument()");
}
```

Feel free to refer to [the CEP Github repo](https://github.com/Adobe-CEP/CEP-Resources) if you are curious about what else you can do with `CSInterface`. 

### 5. Write Your ExtendSCript Code
ExtendScript code is different from your client-side JavaScript in that, via ExtendScript, you can access the host application’s functionalities, such as opening a document, editing it, exporting it, and almost anything the host application can do. In this example, we will create a function that opens one file inside the host application. Make sure to change the file name and the path to a file that actually exists in your filesystem.
```
function openDocument(){
  var fileRef = new File("~/Downloads/myFile.jpg");
  var docRef = app.open(fileRef);
}
```
Note `openDocument()` will be called when `csInterface.evalScript("openDocument()")` is invoked from your JavaScript file, `/client/index.js`.

### 6. Launch the Application
Open `Photoshop` > `Window` > `Extensions` > `YourPanelName`

## Best Practices
_(optional)_

## Other Resources
- [CEP Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md)
- [Adboe Photoshop Reference Doc](https://www.adobe.com/devnet/photoshop/scripting.html)
- [Adobe Illustrator Reference Doc](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/illustrator/pdf/Illustrator_JavaScript_Scripting_Reference_2017.pdf)
- [InDesign Reference Guide](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/indesign/sdk/cs6/scripting/InDesign_ScriptingGuide_JS_JP.pdf)