<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Contents**

1.  [Building CEP Panels with React](#building-cep-panels-with-react)
    1.  [GitHub](#github)
    1.  [Technology Used](#technology-used)
    1.  [Prerequisites](#prerequisites)
    1.  [Configuration](#configuration)
        1.  [CSInterface.js](#csinterfacejs)
        1.  [manifest.xml](#manifestxml)
        1.  [.debug](#debug)
    1.  [Scaffolding your project](#scaffolding-your-project)
    1.  [Webpack all the things!](#webpack-all-the-things)
    1.  [Creating our user interface](#creating-our-user-interface)
    1.  [Interacting with the host application](#interacting-with-the-host-application)
    1.  [Customization](#customization)
    1.  [Best Practices](#best-practices)
    1.  [Troubleshooting and Known Issues](#troubleshooting-and-known-issues)
    1.  [Resources and References](#resources-and-references)
        1.  [NOTES](#notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Building CEP Panels with React

When you build Adobe CEP panels, you're using nearly the very same technologies you would on the web, including HTML, CSS, and JavaScript. In recent years, various JavaScript UI frameworks and libraries like React, Angular, and Vue.js have risen to prominence and introduced a sea change in how modern web applications are built. Because Adobe CEP relies on an embedded Chromium webview which supports modern web technologies, the question naturally arises: _Can you use a modern JavaScript UI framework or library with Adobe CEP_?

The answer is _yes_! You can indeed use any Javascript UI framework or library you want with Adobe CEP. The catch, of course, is always in the details. Because Adobe CEP is _framework agnostic_ (it doesn't care which framework you use), we'll focus on using one of the most popular UI libraries: React. However, it's important to remember that you aren't limited to using React. You can use similar techniques to get Angular or Vue.js panels running as well.

In this guide, then, we'll be showing you _how_ you can use the React JavaScript framework to build CEP panels. By the end of this guide, we will have an panel that:

1.  Demonstrates how to set up your React CEP project
2.  Renders a simple user interface using React
3.  Interacts with a host application using ExtendScript

## GitHub

You can find a companion GitHub repo for this developer guide [on GitHub](<!LINK HERE>). The project doesn't ship with any installed dependencies, so you'll need to follow the "Configuration" steps below to properly install and configure the project.

## Technology Used

*   Supported Host Applications: Photoshop
*   Libraries/Frameworks/APIs:
    *   Adobe-specific: [CEP](https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_8.x)
    *   Other: [Node.js](https://nodejs.org/en/), [NPM](http://npmjs.com/)
        *   Frameworks: [React](https://reactjs.org)
        *   Webpack:
            * [Webpack](https://webpack.js.org/)
            * [CopyWebpackPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
            * [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
            * [html-webpack-include-assets-plugin](https://www.npmjs.com/package/html-webpack-include-assets-plugin)
            * [postcss-loader](https://www.npmjs.com/package/postcss-loader)
            * [style-loader](https://www.npmjs.com/package/style-loader)
            * [css-loader](https://www.npmjs.com/package/css-loader)
        *   Misc: [Babel](https://babeljs.io/), [postcss-import](https://www.npmjs.com/package/postcss-import), [postcss-next](https://npmjs.com/package/postcss-next)

> **Note:**
>
> That might _look_ like a lot of technologies, but we'll explain each one along the way. Some of those are optional packages that you might not need, depending on your project.

## Prerequisites

This guide will assume that you have installed all software and completed all steps in the following guides:

*   [How to create your first Adobe panel in 6 easy steps](https://medium.com/adobe-io/how-to-create-your-first-adobe-panel-in-6-easy-steps-f8bd4ed5778)
*   [Debugging your Adobe panel](https://medium.com/adobe-io/debugging-your-adobe-panel-cf73f00f6961)

You should also have the latest LTS release of Node.js and npm installed on your development machine. Installation instructions are available on [Node.js's website](https://nodejs.org/).

## Configuration

### Installing package dependencies

The sample repository does not include the actual dependences you'll need to build the project. Once you have npm installed, though, you can install nearly all of the required dependencies easily:

```bash
cd /location/of/downloaded/repo
cd react-panel
npm install
```

### Adding `CSInterface.js`

The only dependency that you will need to install manually is `CSInterface.js`. You'll need to download the most recent version of `CSInterface.js` that's compatible with your version of Creative Cloud and add it to the project by following these steps:

*   Download the `CSInterface.js` version you need from https://github.com/Adobe-CEP/CEP-Resources/
    *   Look under the `CEP_#.x` folder for the actual `CSInterface.js` file
    *   **Note**: This project was built using CEP 8
*   Copy `CSInterface.js` to `react-panel/src/client/CSInterface.js`
    *   This location is purely arbitrary; the build scripts we describe later on will expect it in this location, but you can always change it later.

### configuring `manifest.xml`

As noted in the [Getting Started guide](), the `manifest.xml` file is where, among other things, you indicate which Creative Cloud host apps and version numbers your extension supports. In the sample, `manifest.xml` is located at `[react-panel/src/CSXS/manifest.xml](./react-panel/src/CSXS/manifest.xml)`.

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

### .debug

As noted in the [Debugging Guide](), if you want to debug your panel, you'll need to configure `.debug` (in `[react-panel/src/.debug](./react-panel/src/.debug)`)

## Scaffolding your project

React itself has no concept of a CEP project, or how any of it gets structured. Given that

## Webpack all the things!

## Creating our user interface

## Interacting with the host application

## Customization

_(optional)_

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
