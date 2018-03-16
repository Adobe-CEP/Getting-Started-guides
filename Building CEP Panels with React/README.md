<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

1. [Building CEP Panels with React](#building-cep-panels-with-react)
  1. [GitHub](#github)
  1. [Technology Used](#technology-used)
  1. [Prerequisites](#prerequisites)
  1. [Configuration](#configuration)
    1. [CSInterface.js](#csinterfacejs)
    1. [manifest.xml](#manifestxml)
    1. [.debug](#debug)
  1. [Scaffolding your project](#scaffolding-your-project)
  1. [Webpack all the things!](#webpack-all-the-things)
  1. [Creating our user interface](#creating-our-user-interface)
  1. [Interacting with the host application](#interacting-with-the-host-application)
  1. [Customization](#customization)
  1. [Best Practices](#best-practices)
  1. [Troubleshooting and Known Issues](#troubleshooting-and-known-issues)
  1. [Resources and References](#resources-and-references)
    1. [NOTES](#notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Building CEP Panels with React

When it comes to building CEP Panels with complex user interfaces or state management, modern JavaScript frameworks can make a huge impact in terms of developer productivity and future maintainability. By leveraging declarative user interface definitions, component-based view layers, state management libraries, one can create a complex panel that is both easy to build and maintain while also being performant.

Adobe CEP itself is _framework agnostic_ &mdash; that means Adobe CEP works with any JavaScript framework that also works in a browser environment. Furthermore, Adobe CEP doesn't require that you use any JavaScript framework &mdash; you can use `document.createElement` or other vanilla HTML, CSS, and JavaScript as much as you want.

In this guide, we'll be showing you _how_ you can use the React JavaScript framework to build CEP panels. It's important to remember that Adobe CEP doesn't care about which framework we use -- you can use Vue.js, AngulerJS, Angular 2+, Svelte, or any of the other frameworks that are out there. In fact, we'd love it if you would contribute guides on those subjects!

By the end of this guide, we will have an panel that:

1. Demonstrates how to set up your React CEP project
2. Renders a simple user interface using React
3. Interacts with a host application using ExtendScript

## GitHub

You can find a companion GitHub repo for this developer guide [on GitHub](<!LINK HERE>). The project doesn't ship with any installed dependencies, so you'll need to follow the "Configuration" steps below to properly install and configure the project.

## Technology Used
- Supported Host Applications: Photoshop
- Libraries/Frameworks/APIs: Node JS, NPM, [React](https://reactjs.org), Adobe CEP

## Prerequisites

This guide will assume that you have installed all software and completed all steps in the following guides:

- [How to create your first Adobe panel in 6 easy steps](https://medium.com/adobe-io/how-to-create-your-first-adobe-panel-in-6-easy-steps-f8bd4ed5778)
- [Debugging your Adobe panel](https://medium.com/adobe-io/debugging-your-adobe-panel-cf73f00f6961)

You should also have the latest LTS release of Node.js and npm installed on your development machine. Installation instructions are available on [Node.js's website](https://nodejs.org/).

## Configuration

### CSInterface.js

You'll need to download the most recent version of `CSInterface.js` that's compatible with your version of Creative Cloud and add it to the project by following these steps:

* Download the `CSInterface.js` version you need from https://github.com/Adobe-CEP/CEP-Resources/
    * Look under the `CEP_#.x` folder for the actual `CSInterface.js` file
    * **Note**: This project was built using CEP 8
* Copy `CSInterface.js` to `src/client/CSInterface.js`
    * This location is purely arbitrary; the build scripts we describe later on will expect it in this location, but you can always change it later.

### manifest.xml



### .debug



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

- [Photoshop CC JavaScript Reference](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref-2015.pdf)
- [<!CLASS>](<!LINK HERE>)
- [<!CLASS>](<!LINK HERE>)
- [<!CLASS>](<!LINK HERE>)
- [<!CLASS>](<!LINK HERE>)


### NOTES

```
ln -s -f /absolute/path/to/project/react-panel/dist /Users/user/Library/Application\ Support/Adobe/CEP/extensions/com.adobe.guides.react
```