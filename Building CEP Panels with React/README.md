# Building CEP Panels with React

When you build Adobe CEP panels, you're using mostly the same technologies you would on the web, including HTML, CSS, and JavaScript. In recent years, various JavaScript UI frameworks and libraries like React, Angular, and Vue.js have risen to prominence and introduced a sea change in how modern web applications are built. Because Adobe CEP relies on an embedded Chromium webview that supports modern web technologies, the question naturally arises: _Can you use a modern JavaScript UI framework or library with Adobe CEP_?

The answer is _yes_! You can use any Javascript UI framework or library you want with Adobe CEP. In this example we'll be focused on React, but there is no technical reason why you can't use Angular or Vue.js (or any other framework) in CEP.

In this guide, then, we'll be showing you _how_ you can use the React JavaScript framework to build CEP panels. By the end of this guide, we will have an panel that:

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

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## GitHub

You can find a companion GitHub repo for this developer guide [on GitHub](https://github.com/Adobe-CEP/Getting-Started-guides/blob/master/Building%20CEP%20Panels%20with%20React/readme.md). The project doesn't ship with any installed dependencies, so you'll need to follow the "Configuration" steps below to properly install and configure the project.

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
> Building React web apps often requires a lot of dependencies. Thankfully the client only sees the end result of the process, not everything that you've installed to generate the final result.


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
