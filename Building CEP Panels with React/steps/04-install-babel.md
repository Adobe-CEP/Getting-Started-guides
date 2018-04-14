#### Installing Babel

> **NOTE:**
>
> If you have downloaded the sample repository instead of following step-by-step, note that the sample does not include the actual dependences you'll need to build the project. Instead, you need to install the dependencies like so:
>
> ```bash
> cd /location/of/downloaded/repo
> cd react-panel
> npm install
> ```
>
> You only need to do this _once_, so if you've already run `npm install`, you can skip this.

By using React (and many other frameworks), we introduce the need to have a **build process**. This is equivalent to the need for a compilation step with languages like C and C++.

We won't be compiling JavaScript to machine language or anything like that. Instead we'll be **transpiling** modern JavaScript and JSX to a previous version of JavaScript. Transpilation is much like compilation, except the output is usually a high-level language.

When writing React, we'll be using a lot of modern JavaScript features, including classes, arrow functions, rest/spread, destructuring and more. While modern browsers understand these features out-of-the-box, older browsers don't. CEP version 8 will understand most of these features too, but older versions of CEP won't either. Babel is a tool that converts modern JavaScript code into older JavaScript code (ECMAScript 5) that older browsers and CEP &lt; 8 can use.

React also uses a **domain-specific language** (DSL) called JSX. JSX looks a lot like HTML, but is ultimately compiled to JavaScript code. With the help of a few plugins, Babel can do this job for us as well.

> **NOTE:**
>
> _Don't_ confuse React JSX with ExtendScript. The two are very different! In the remainder of this document we'll use JSX to mean React JSX and ExtendScript to refer to, well, ExtendScript.

As an added bonus, there just happens to be a Babel plugin that converts modern JavaScript to ExtendScript... we'll use that later on!

Ok &mdash; let's add all the dependences we'll need:

```bash
$ npm install --save-dev babel-cli babel-preset-env babel-preset-extendscript babel-preset-react babel-preset-stage-2
$ npm install --save babel-core babel-polyfill babel-runtime
```

What does each of those do?

Side   | Package     | Description
-------| ------------|-------------------------
Host   | `babel-cli` | This lets us interact with `babel` from the command prompt. This will prove useful for converting modern JavaScript to ExtendScript.
Host   | `babel-preset-extendscript` | This enables Babel to compile modern JavaScript to ExtendScript... which is based on ES3. Yikes! See [the package docs](https://www.npmjs.com/package/babel-preset-extendscript) for more.
Client | `babel-preset-env` | Adds presets for the latest versions of JavaScript. What's cool is that if you decide you only need to target specific browser versions, you can. See [Babel's documentation](https://babeljs.io/docs/plugins/preset-env/) for more.
Client | `babel-preset-react` | Adds some presets specific to React, including how to handle JSX.
Client | `babel-preset-stage-2` | Enables JavaScript features that are in "stage 2". These are features that haven't been completely standardized, but are useful when working with React. At some point (hopefully in 2019) these features will be included with `babel-preset-env` when they become standard.
Client | `babel-core` | Core babel features
Client | `babel-polyfill` | Polyfills used to support Babel in older browsers
Client | `babel-runtime` | Runtime environment used to support Babel