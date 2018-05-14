# Building CEP Panels with React

When you build Adobe CEP panels, you're using mostly the same technologies you would on the web, including HTML, CSS, and JavaScript. In recent years, various JavaScript UI frameworks and libraries like React, Angular, and Vue.js have risen to prominence and introduced a sea change in how modern web applications are built. Because Adobe CEP relies on an embedded Chromium web view that supports modern web technologies, the question naturally arises: _Can you use a modern JavaScript UI framework or library with Adobe CEP_?

The answer is _yes_! You can use any Javascript UI framework or library you want with Adobe CEP. In this example we'll be focused on React, but there is no technical reason why you can't use Angular or Vue.js (or any other framework) in CEP.

In this guide, then, we'll be showing you _how_ you can use the React library to build CEP panels. By the end of this guide, we will have an panel that:

1.  Demonstrates how to set up your React CEP project
2.  Renders a simple user interface using React
3.  Interacts with a host application using ExtendScript

Before we go any further, it might be useful to show you what our panel will actually look like.

![The panel and its output](./assets/it-works.png)

You can see the panel on the far right side of the image. This panel itself is not complicated, but it is being generated using React and some basic CSS.

As you might be able to tell, the panel generates some "lorem ipsum" content and adds it to the open Photoshop document. The user can choose whether they want "paragraphs", "sentences", or "words", and they can then choose how much content they want. Clicking **Generate** will create a preview of that in the bottom of the panel &mdash; and the user can click that as many times as they want to get different output.

When the user clicks the **Insert** button, the panel communicates with Photoshop via ExtendScript and calls some ExtendScript code with the desired text. The ExtendScript code creates a new text layer and adds the content into the active document.

**Contents**

* [GitHub](#github)
* [Technology Used](#technology-used)
* [Important Concepts](./steps/00-important-concepts.md)
* Steps
    * [Project Scaffolding](./steps/01-project-scaffold.md)
    * [Initializing the Project](./steps/02-initialize-project.md)
    * [Install React](./steps/03-install-react.md)
    * [Install Babel](./steps/04-install-babel.md)
    * [Install Webpack](./steps/05-install-webpack.md)
    * [Configure CEP](./steps/06-configure-cep.md)
    * [Configure Webpack](./steps/07-configure-webpack.md)
    * [Creating Build Scripts](./steps/08-creating-build-scripts.md)
    * [Creating the Panel](./steps/09-creating-the-panel.md)
    * [Communicating with the Host App](./steps/10-host-app-communication.md)
    * [Tips and Tricks](./steps/11-tips-and-tricks.md)
* [Customization](#customization)
* [Best Practices](#best-practices)
* [Troubleshooting and Known Issues](#troubleshooting-and-known-issues)
* [Resources and References](#resources-and-references)

## GitHub

You can find a companion GitHub repo for this developer guide [on GitHub](https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Building%20CEP%20Panels%20with%20React/readme.md). The project doesn't ship with any installed dependencies, so you'll need to follow the "Configuration" steps below to properly install and configure the project.

## Technology Used

* Supported Host Applications: Photoshop
* Libraries/Frameworks/APIs:
    * Adobe-specific: [CEP](https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_8.x)
    * Node
        * [Node.js](https://nodejs.org/en/)
        * [NPM](http://npmjs.com/)
        * [npx](https://www.npmjs.com/package/npx)
    * Libraries:
        * [React](https://reactjs.org)
        * [lorem-ipsum](https://www.npmjs.com/package/lorem-ipsum)
    * Tooling:
        * [create-react-app](https://github.com/facebook/create-react-app)
        * [shx](https://www.npmjs.com/package/shx)
        * [npm-run-all](https://www.npmjs.com/package/npm-run-all)

> **Note:**
>
> Building React web apps often requires a lot of dependencies. Thankfully the client only sees the end result of the process, not everything that you've installed to generate the final result.

## Prerequisites

This guide will assume that you have installed all software and completed all steps in the following guides:

* [Getting Started with CEP Extensions](https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/readme.md)
* [Debugging your Adobe panel](https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Debugging/Debugging.md)

You should also have the latest LTS release of Node.js and npm installed on your development machine. Installation instructions are available on [Node.js's website](https://nodejs.org/).

You should also be a little familiar with the following concepts and why we would use each. Useful learning resources are provided in case you want to learn more about each item.

* Modern JavaScript
    * [Learn ES2015 (Babel)](https://babeljs.io/learn-es2015/)
    * [ES2018 by 2ality](http://2ality.com/2017/02/ecmascript-2018.html) (Has lots of links to ES2015+ content)
* React and JSX
    * [React](https://reactjs.org/)
    * [JSX](https://facebook.github.io/jsx/)
* Transpilers and Babel (which `create-react-app` utilizes)
    * [Babel](https://babeljs.io/)
* ExtendScript
    * [Scripting Developer Center](https://www.adobe.com/devnet/scripting.html)

## Setting things up

> **Note:**
>
> If you clone the this repository, the scaffold is already built for you in the [`com.adobe.guides.react`](./com.adobe.guides.react) folder.

First, let's create the project folder using `create-react-app`. This tool is a useful way to quickly set up a fully configured React app without needing to delve deeply into the various underlying build tools and their configuration settings. Other libraries and frameworks typically have something similar and should be able to be adapted in similar ways.

With npm version 5.2.0 and above, we can use `create-react-app` without even installing it. npm comes with a tool called `npx`, which allows you to execute npm packages without installing them. This is perfect for utility tools like `create-react-app`:

```bash
$ npx create-react-app com.adobe.guides.react
$ cd com.adobe.guides.react
$ npm install
```

When done, we should have the following structure:

```text
com.adobe.guides.react/
    public/
        favicon.ico
        index.html
        manifest.json
    src/
        index.css
        index.js
        ...
    .gitignore
    package-lock.json
    package.json
    README.md
    yarn.lock
```

Let's take a moment to get acquainted with the structure that's been created. There are several Javascript files in the `src` directory, which we'll be replacing with our own. In `public` there is an `index.html` file -- this file is used to load any libraries we need -- which we'll need to modify in order to work with CEP. We'll address that in a moment.

Now that we've created the project, we need to add some additional dependencies. The first is so that we don't have to type in a lot of "lorem ipsum" text:

```bash
$ npm install --save lorem-ipsum
```

We also need to install some additional modules to make it easy to package up our panel into a form that Adobe host apps can use:

```bash
$ npm install --save-dev shx npm-run-all
```

* `shx`: A cross-platform tool that provides *nix-like shell commands. Useful for working on Windows platforms, for example.
* `npm-run-all`: A simple tool that allows us to run multiple `npm` scripts in sequence. We'll cover this in more detail later.

Next, let's add some directories we'll need for CEP. The first two _should_ be mostly familiar to you if you've read the [Getting Started guide](https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/readme.md#1-decide-the-folder-structure). The last entry (`dist`) is where we'll store the final version of our extension, suitable for adding to Photoshop and other host apps.

```bash
mkdir CSXS
mkdir host
mkdir dist
```

## Configuration

Before we get into writing any React code, we need to make some changes to the project that `create-react-app` built for us so that it will work with CEP.

First, [get a copy of `CSInterface.js`]() and store it in [`public/CSInterface.js`](./com.adobe.guides.react/public/CSInterface.js). Next, we need to modify [`public/index.html`](./com.adobe.guides.react/public/index.html) so that we can load this file when the panel loads. All we need to do is add the following `<script>` immediately after the opening `<body>` tag:

```html
<script src="%PUBLIC_URL%/CSInterface.js"></script>
```

We also need to add an entry to `package.json` so that the project is properly configured to load from a local path (rather than a web server):

```js
"homepage": ".",
```

### Configure CEP `manifest.xml`

As noted in the [Getting Started guide](), the `manifest.xml` file is where, among other things, you indicate which Creative Cloud host apps and version numbers your extension supports. In the sample, `manifest.xml` is located at [`CSXS/manifest.xml`](./com.adobe.guides.react/CSXS/manifest.xml).

For this guide, we'll make an extension that supports Photoshop. So in the `manifest.xml`, make sure you list the supported host apps within the `<HostList>` element:

```xml
<!-- ...  -->
<ExecutionEnvironment>
  <HostList>
    <Host Name="PHSP" Version="19" /> <!-- Photoshop -->
    <Host Name="PHXS" Version="19" /> <!-- Photoshop -->
  </HostList>

  <!-- // ... -->
</ExecutionEnvironment>

<!-- // ... -->
```

Note that the versions indicted in the example code above only target a single version of each host app, for the sake of demo simplicity. Most extension developers will want to target a range of host app versions. To learn how to support ranges of host app versions, see the [CEP cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md).

Next, we also need to tell CEP how to load our panel's `index.html` file. Although the template is in `public/index.html`, we'll eventually be putting it in the `dist/build/index.html`. So, we need to `<Resources>` section so that it looks like the following:

```xml
  <DispatchInfoList>
    <Extension Id="com.adobe.guides.react.panel">
      <DispatchInfo>
        <Resources>
          <MainPath>./build/index.html</MainPath>
          <ScriptPath>./host/index.jsx</ScriptPath>
          <CEFCommandLine />
        </Resources>
```

### Configure CEP .debug

As noted in the [Debugging Guide](), if you want to debug your panel, you'll need to configure `.debug` (in [`react-panel/src/.debug`](./react-panel/src/.debug)):

```xml
<?xml version='1.0' encoding='UTF-8'?>
<ExtensionList>
  <Extension Id="com.adobe.guides.react.panel">
    <HostList>
      <Host Name="PHXS" Port="8088" />
      <!-- // other hosts as needed -->
    </HostList>
  </Extension>
</ExtensionList>
```

## Creating ExtendScript to add text to layers

Most of our panel's work will be handled in the client code in `src`. But we will need a bit of code that adds arbitrary text to the current document. Add the following in [`host/index.jsx`](./com.adobe.guides.react/host/index.js):

```js
function addTextLayer(text) {
    var layers = app.activeDocument.artLayers;
    var layer = layers.add();
    layer.kind = LayerKind.TEXT;

    var textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = 24;
    textItem.position = [10, 10];
    textItem.contents = text;
    textItem.width = new UnitValue('500 pixels');
    textItem.height = new UnitValue('500 pixels');
}
```

## Write React Code

- clear out existing code
- write some starter code
- start server
- finish code

## Building the production version

`create-react-app` provides a pre-configured command that builds a version ready for production. All we have to do is type the following:

```bash
npm run build
```

After a few moments, the production version of our panel will be in the `build` directory. If you take a look inside, you'll notice that it's quite different from the `public` and `src` directories:

```text
build/
    static/
        css/
            main.84305f0f.css
            main.84305f0f.css.map
        js/
            main.96378bc4.js
            main.96378bc4.js.map
    asset-manifest.json
    CSInterface.js
    favicon.ico
    index.html
    manifest.json
    service-worker.js
```

So, it's obvious where _some_ of the above files came from -- for example, `CSInterface.js` came from `public/CSInterface.js`, as did `index.html`. But the files in `static` don't look anything like our `src` files. Instead, `create-react-app` has created _minified_ bundles of our code and put all the CSS in a single file and all the Javascript in a single file. The `*.map` files can be used by debuggers to map the minified version to the original version so that we can still debug our code if we need.

## Create Packaging Scripts

Now that we've written our code and tested the look and feel in a browser, we will want to test it in Photoshop. To do that we need to create a distribution bundle that we could deploy to a host app. To do that, we'll make some npm build scripts to make our lives easier.

Open up [`package.json`](./com.adobe.guides.react/package.json) and add the following to the `scripts` section:

```json
"package:clean": "shx rm -rf dist/**/*",
"package:copy-host": "shx cp -r host dist/",
"package:copy-csxs": "shx cp -r CSXS dist/",
"package:copy-build": "shx cp -r build dist/",
"package": "npm-run-all build package:*",
"package-debug:copy-debug": "shx cp -r .debug dist/.debug",
"package-debug": "npm-run-all build package:* package-debug:*"
```

These scripts are pretty short and simple, but let's go over each one:

* `package:clean`: removes all the files in `dist` so that we can start clean with each package
* `package:copy-host`: copies the `host` directory into `dist`
* `package:copy-csxs`: copies the `CSXS` directory into `dist`
* `package:copy-build`: copies the `build` directory into `dist`
* `package`: calls the pre-existing `build` process and then calls all the `package:*` scripts to execute all the above steps.
* `package-debug:copy-debug`: copies the `.debug` file into `dist` so that we can debug our panel if needed
* `package-debug`: starts the build, executes all the `package:*` scripts, and then executes the above `package-debug:*` script.

Then to create a package suitable for installation into a host app, all we have to do is execute this command:

```bash
npm run package
```

Then we can copy the `dist` folder to the CEP extension folder, or we can link it there as well. Alternatively, we could package it up into a file suitable for deployment to the Exchange.

## Best Practices

_(optional)_

## Troubleshooting and Known Issues

Articles about common issues are [here](!LINK).

You can submit tickets for bugs and feature requests [here](!LINK).

## Resources and References

*   [Photoshop CC JavaScript Reference](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref-2015.pdf)
*   [<!CLASS>](<!LINK HERE>)
*   [<!CLASS>](<!LINK HERE>)
*   [<!CLASS>](<!LINK HERE>)
*   [<!CLASS>](<!LINK HERE>)

### NOTES

```
ln -s -f /absolute/path/to/project/react-panel/dist /Users/user/Library/Application\ Support/Adobe/CEP/extensions/com.adobe.guides.react
```
