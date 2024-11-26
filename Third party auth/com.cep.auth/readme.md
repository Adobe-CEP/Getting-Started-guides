# panel-thirdparty-auth-example-app

Many Creative Cloud app extensions require the ability to talk to API services on the web. With both Chromium Embedded Framework (CEF) and Node.js at its core, CEP gives you the flexibility to make network calls from within your extension in the way that makes sense for your workflow

This sample panel is built to show developers how they can create a Node JS and Express JS based panel to allow users to authenticate using a third party auth (Dropbox in this example) and make basic API calls.

By the end of this guide, we will have a panel that:

1. lets users authenticate using their Dropbox credentials
1. makes simple Dropbox API calls like retrieving basic user info using the token retrieved from step #1

<!-- doctoc command config: -->
<!-- $ doctoc ./readme.md --title "**Contents**" --entryprefix 1. --gitlab --maxlevel 3 -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

1. [Technology Used](#technology-used)
1. [Prerequisites](#prerequisites)
1. [Configuration Setup](#configuration-setup)
    1. [Set up to sample extension](#set-up-to-sample-extension)
    1. [Configure `mainfest.xml`](#configure-mainfestxml)
1. [Client-side: HTML Markup](#client-side-html-markup)
    1. [`index.html`](#indexhtml)
    1. [`localServer.html`](#localserverhtml)
1. [Client-side: Service API interaction](#client-side-service-api-interaction)
    1. [Instantiate `CSInterface`](#instantiate-csinterface)
    1. [Load the second extension for running an Express server](#load-the-second-extension-for-running-an-express-server)
    1. [Create references to the UI elements](#create-references-to-the-ui-elements)
    1. [Add a click handler to the button](#add-a-click-handler-to-the-button)
    1. [Communicating with the server](#communicating-with-the-server)
1. [Server-side Setup](#server-side-setup)
    1. [Install node modules](#install-node-modules)
    1. [Write server logic in `main.js`](#write-server-logic-in-mainjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Technology Used
- Supported Host Applications: Photoshop, Illustrator, Indesing, Premier Pro
- Libraries/Frameworks/APIs:
    - Adobe-specific: [CEP](https://github.com/Adobe-CEP/CEP-Resources)
    - Other: [jQuery](https://jquery.com/), [Dropbox Auth API](https://www.dropbox.com/developers/reference/oauth-guide)

## Prerequisites
This guide will assume that you have installed all software and completed all steps in the following guides:

- [Getting Started](<!LINK HERE>)
- [Debugging](<!LINK HERE>)

## Configuration Setup
### Set up to sample extension
The following steps will help you get the sample extension for this guide up and running:

1. Install the `./com.cep.auth/` directory in your `extensions` folder. ([See the Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-folders) if you are unsure where your `extensions` folder is.)
1. [Download CEP's `CSInterface.js` library](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/CSInterface.js) and move it to `./com.cep.auth/client/js/lib/CSInterface.js`.
1. [Register your app for Dropbox](https://www.dropbox.com/developers/apps/create)
	1. Add the redirect URI configured for this app - `http://localhost:3000/gcallback`
	1. Get the API Key and Secret
1. Find `config.js` at this path: `./com.cep.auth/client/js/config.js`.
1. In `config.js` file, substitute the default strings with your credentials:

```javascript
const CLIENT_ID = "YOUR_DROPBOX_CLIENT_ID";
const CLIENT_SECRET = "YOUR_DROPBOX_SECRET";
```

After following these steps, you'll be able to run the sample extension within the host apps indicated in the [Technology Used](#technology-used) section of this guide.

### Configure `mainfest.xml`
As noted in the [Getting Started guide](), the `manifest.xml` file is where, among other things, you indicate which Creative Cloud host apps and version numbers your extension supports. For this guide, we'll make an extension that supports Photoshop, Illustrator, InDesign, and Premier Pro. So in the `manifest.xml`, make sure you list the supported host apps within the `<HostList>` element:

```xml
<!-- ...  -->
<ExecutionEnvironment>
  <HostList>
    <Host Name="PHXS" Version="16.0" />
    <Host Name="ILST" Version="16.0" />
    <Host Name="PHSP" Version="16.0" />
    <Host Name="IDSN" Version="13.0" />
    <Host Name="PPRO" Version="11.0" />
  </HostList>

  <!-- // ... -->
</ExecutionEnvironment>

<!-- // ... -->

```

Note that the versions indicted in the example code above only target a single version of each host app, for the sake of demo simplicity. Most extension developers will want to target a range of host app versions. To learn how to support multiple host app versions, [see the Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-manifest).

There are more configurations to write in `manifest.xml` since this sample has two separate extensions inside the panel. However, this does not mean that users will have to load two separate panels. The second extension will be loaded automatically in the background when the main extension loads.

As you can see, `<ExtensionList>` has two different `<Extension Id>`s listed. `com.cep.auth.panel` is the main panel that includes the front-end code and the host application code, `index.jsx` (this sample does not use the host application code). `com.cep.auth.localserver` contains the Node/Express server logic.

```xml
<ExtensionList>
    <Extension Id="com.cep.auth.panel" Version="1.0.0" />
    <Extension Id="com.cep.auth.localserver" Version="1.0.0" />
</ExtensionList>
```

Note that since `com.cep.auth.localserver` will be using Node, two parameters below need to be added to `<CEFCommandLine>`.

```xml
<CEFCommandLine>
        <Parameter>--enable-nodejs</Parameter>
        <Parameter>--mixed-context</Parameter>
</CEFCommandLine>
```

Also note that while the type of the main extension, `com.cep.auth.panel`, is `Panel`, the type of the server extension, `com.cep.auth.localserver`, is `Custom`.

```xml
<!-- // ... -->
<Extension Id="com.cep.auth.panel">
	<!-- // ... -->
	<Type>Panel</Type>
    <!-- // ... -->
</Extension>
<Extension Id="com.cep.auth.localserver">
	<!-- // ... -->
	<Type>Custom</Type>
	<!-- // ... -->
</Extension>
<!-- // ... -->
```
This setting makes the main extension visible to the user and hides the server extension.

## Client-side: HTML Markup
The user interface for CEP extensions is written in HTML. For this sample, there are two HTML documents. As configured in `manifest.xml`, the main HTML, located at `./com.cep.auth/client/index.html`, is visible to the user while the other, located at `./com.cep.auth/client/localServer.html`, is not.

### `index.html`
see comments **#1-3**:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Dropbox Example App</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<h1>Dropbox Example App</h1>
  <!-- 1) buttons -->
	<div id="button-group">
		<button id="login-button">Log in with Dropbox</button>
		<button id="user-button">Get user info</button>
	</div>
  <!-- 2) An empty div -->
	<div id="canvas">
	</div>
  <!-- 3) Your scripts, including JQuery library and CEP's CSInterface.js library  -->
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="js/lib/CSInterface.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
</body>
</html>
```

### `localServer.html`
see comments **#1**:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<script>
	  <!-- 1) This script uses cep_node to start the Express server locaged at '/server/main.js' -->
	    var localServer = cep_node.require(__dirname + '/server/main.js')();
	</script>
	<title>Dropbox Example App</title>
</head>
<body>
</body>
</html>
```

Note that, while this guide will not cover styling an extension with CSS, the CSS stylesheet for this sample panel can be found at `./com.cep.auth/client/styles/style.css`

## Client-side: Service API interaction
As we saw in the previous section's `index.html` code, the client-side JavaScript for this extension is located at `./com.cep.auth/client/js/index.js`. We will look at this `index.js` file in this section.

### Instantiate `CSInterface`

For any CEP panel, you'll need an instance of `CSInterface`, which, among other things, gives you a way to communicate with the host app's scripting engine:

```javascript
var csInterface = new CSInterface();
```

We'll make use of this `csInterface` constant later on.

### Load the second extension for running an Express server
`csInterface` has a method called `requestOpenExtension`, which opens another extension given an extension ID:

```javascript
csInterface.requestOpenExtension("com.cep.auth.localserver", "");
```

Once the second extension is loaded, the Express located at `/server/main.js` will start as noted in the script in `/client/localServer.html`.

### Create references to the UI elements
In `index.js`, we'll first reference the elements in our `index.html`:

```javascript
var loginButton = document.querySelector("#login-button");
var userButton = document.querySelector("#user-button");
var canvas = document.querySelector("#canvas");
```

We'll work with these UI elements in the next step.

### Add a click handler to the button
We'll add a click handler to the buttons:

```javascript
loginButton.addEventListener("click", login);
userButton.addEventListener("click", getUserInfo);
```

We'll make the `login()` and `getUserInfo()` helper methods in the next step.

### Communicating with the server
In this sample, `jQuery` is used to communicate with the server. (see comments **#1-3**:)
```javascript
function login() {
	$.ajax({
		type: "GET",
	  	/* 1) Make sure to target the correct port, `3000` in this case, 
	  	and do include the entire url, `http://localhost...` */
		url: "http://localhost:3000/glogin",
		success: response => {
	  	/* 2) Server will respond with the auth url, which is used to redirect the user to */
			window.location.href = response;
		},
		error: (jqXHR, textStatus, errorThrown) => { 
			console.log("error");
			alert(JSON.parse(jqXHR.responseText).error);
		}
	})
}

function getUserInfo() {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/user",
		success: response => {
	  	/* 3) Server will respond with the user's profile data, which will be displayed in the UI*/ 
			canvas.innerHTML = JSON.stringify(response.data);
		},
		error: (jqXHR, textStatus, errorThrown) => { 
			console.log("error");
			alert(JSON.parse(jqXHR.responseText).error);
		}
	})

}
```

## Server-side Setup
### Install node modules
Make sure to install all node dependencies required by this panel.
```
npm install
```

### Write server logic in `main.js`
This sample panel uses `express` and `http` to set up a server. Make sure to use the same port, in this case, `3000`. All of the following endpoints use `axios` library to make API calls.
- `/glogin` endpoint simple constructs the url to hit Dropbox auth endpoint and sends it to the client-side which will redirect to the url.
- `/gcallback` endpoint is designed to receive callback from Dropbox after user successfully gives consent to the app and to retrive `access_token` which is required for making further API calls to Dropbox.
- `/user` endpoint uses the token received from `/gcallback` and sends an API call to Dropbox to retrive user's information.

