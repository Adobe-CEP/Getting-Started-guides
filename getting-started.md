# CEP Panel Getting Started Guide

CEP panels are extensions to Adobe desktop applications like Photoshop, Illustrator, InDesign, After Effects, and many more. These panels let users customize their Creative Cloud experience for their unique workflows. This guide will help you get started building a CEP panel. 

![Example panel](/assets/panel.gif?raw=true)

In this guide, we will cover the basics for creating a simple panel in six easy steps.

By the end of this guide, we will have a CEP extension that:

1. Opens a new document from the user's local folder.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

1. [Technology Used](#technology-used)
1. [Prerequisites](#prerequisites)
1. [Folder Structure](#folder-structure)
1. [Download `CSInterface.js`](#download-csinterfacejs)
    1. [Instantiate `CSInterface`](#instantiate-csinterface)
    1. [Add a click handler to the button](#add-a-click-handler-to-the-button)
    1. [Communicate with the host app](#communicate-with-the-host-app)
1. [Best Practices](#best-practices)
1. [Troubleshooting and Known Issues](#troubleshooting-and-known-issues)
1. [Other Resources](#other-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Technology Used

- Supported Host Applications: Photoshop, Illustrator, InDesign
- Libraries/Frameworks/APIs:
    - Adobe-specific: [CEP](), ExtendScript


## Prerequisites

There is no specific prerequisite for this guide other than your interest in building a panel!


## Development Steps
### Decide the folder structure
You will need to decide where to save your panel code first. Basically, your panel can be saved either at the root level or at the user level, depending on who’s allowed to use the panel (refer to [CEP 8 HTML Extension Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-folders) for the actual paths).
Except for the required `CSXS` folder, which must contain `manifest.xml`, the folder structure is pretty flexible. That said, I would recommend structuring your directories like this:

![Panel structure](/assets/panel-structure.png?raw=true)

- `CSXS` -- contains the `manifest.xml` file, which stores the panel configuration data. As noted above, this is a requirement for your panel to show up in the host app.

- `Client` -- contains the front-end code, such as HTML, JavaScript, CSS, the required Adobe `CSInterface.js` library, and any third-party libraries you might want to include (for example, jQuery)

- `Host` -- contains the ExtendScript file (`index.jsx`), used to access and drive most features in the host app

This structure allows you to achieve a clear separation of concerns by devoting one folder to each.

### Configure Your Panel in `manifest.xml`
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

### Write Your Front-end Code
Now, it’s time for you to start using your web development skills to build your panel. You can build this out with HTML, CSS, and JavaScript to suit your goals, but let’s have a look at the basic files.


#### Download `CSInterface.js`
You need to download the latest version of [CSInterface.js](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/CSInterface.js), which is a library that enables you to control the panel and communicate with Adobe products like Photoshop, InDesign, Premiere Pro, and more. Place the downloaded file at the location of your choice. For this example, save the file under `/client`.

#### Instantiate `CSInterface`
After downloading `CSInterface.js`, you need to create an instance of it in your javascript code:

```javascript
const csInterface = new CSInterface();
```

We'll make use of this `csInterface` constant later on.


#### Add a click handler to the button

We'll add a click handler to `applyWeatherButton`:

```javascript
applyWeatherButton.addEventListener("click", applyWeatherToAsset);
```

We'll make the `applyWeatherToAsset()` helper method in detail in the next step.


#### Communicate with the host app

To communicate with the host app's scripting engine, we'll make use of the `csInterface.evalScript()` method. (If you need a refresher on the `.evalScript()` method, refer to the [Getting Started guide]().)

In this sample app, our `.evalScript()` call will be wrapped in a helper method called `applyWeatherToAsset()`, which we attached to our button's click handler in the step above. See comments **#1-3** in the code below:

```javascript
function applyWeatherToAsset(e) {
  /* 1) Get the dataset from the click event */
  const dataset = e.target.dataset;

  /* 2) Pass an ExtendScript function call to the host app with .evalScript() */
  csInterface.evalScript(`applyWeatherToAsset("${dataset.currentWeatherSlug}", "${dataset.currentWeatherString}")`);
}
```

We'll make the ExtendScript function in the next section.

### Write Your ExtendSCript Code

## Best Practices
_(optional)_


## Troubleshooting and Known Issues
Articles about common issues are [here](!LINK).

You can submit tickets for bugs and feature requests [here](!LINK).

## Other Resources
- [CEP Cookbook](<!LINK HERE>)
- [Other guide](<!LINK HERE>)
- [Other guide](<!LINK HERE>)