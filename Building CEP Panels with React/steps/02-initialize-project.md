# Initialize the project

At this point, we know we'll need to install a lot of packages, including React. To do this, we'll use `npm`, but we need to have initialized the folder with a `package.json` file first before we can use `npm` to manage dependencies.

Initializing the project, though, is easy:

```bash
npm init
```

`npm` will then ask a few questions about your project. Here's a transcript of our session &mdash; note that our responses are **bolded**, and "**[ENTER]**" signifies where we've taken the default option.

> This utility will walk you through creating a package.json file. It only covers the most common items, and tries to guess sensible defaults.
>
> See `npm help json` for definitive documentation on these fields and exactly what they do.
>
> Use `npm install <pkg>` afterwards to install a package and save it as a dependency in the package.json file.
>
> Press ^C at any time to quit.
>
> package name: (react-panel) **[ENTER]**
>
> version: (1.0.0) **0.0.1**
>
> description: **React Panel example for Adobe CEP**
>
> entry point: (index.js) **[ENTER]**
>
> test command: **[ENTER]**
>
> git repository: **[ENTER]**
>
> keywords: **React, CEP, Panel, Extension**
>
> author: **Adobe**
>
> license: (ISC) **Apache-2.0**
>
> About to write to react-panel/package.json:
>
> ```
> {
>   "name": "react-panel",
>   "version": "0.0.1",
>   "description": "React Panel example for Adobe CEP",
>   "main": "index.js",
>   "scripts": {
>     "test": "echo \"Error: no test specified\" && exit 1"
>   },
>   "keywords": [
>     "React",
>     "CEP",
>     "Panel",
>     "Extension"
>   ],
>   "author": "Adobe",
>   "license": "Apache-2.0"
> }
> ```
>
> Is this ok? (yes) **yes**
>

When done, you'll have a `package.json` file that [looks a lot like ours](./react-panel/src/package.json), only a lot emptier.

Next, let's install one of the dependencies we'll be needing for this panel.

> **NOTE:**
>
> If you have downloaded the sample repository instead of following step-by-step, note that the sample does not include the actual dependences you'll need to build the project. Instead, you need to install the dependencies like so:
>
> ```bash
> cd /location/of/downloaded/repo
> cd react-panel
> npm install
> ```

So, I don't know about you, but I don't particularly want to type in a large amount of "lorem ipsum" text. Thankfully, there's a package out there that takes care of that for us!

```bash
$ npm install --save lorem-ipsum
```
[Previous Part](./01-project-scaffold.md) | [Next Part](./03-install-react.md)