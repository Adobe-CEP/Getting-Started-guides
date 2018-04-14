##### Installing Webpack

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

Please, don't run away just yet &mdash; Although Webpack can have a reputation for being difficult to understand and configure, but for our purposes, it really is pretty straightforward.

First, if you're not familiar with Webpack, it's a tool that can bundle all your project's dependencies such that they are all loaded in the correct order. You can do this _manually_ of course, but in complex projects, trying to figure out the right order of `<script>` tags can get really complex. Webpack takes care of that by analyzing your project's dependencies and ensuring things always get loaded before you need them.

Another useful feature of Webpack is the ability to remove dead code from the final bundle. Webpack can analyze any included dependencies that your code doesn't actually use and then remove those dependencies so that your final bundles are smaller.

Yet another useful feature is the ability to minify and obfuscate your code. This has the bonus of creating smaller bundles, but also makes it harder to casually reverse engineer. (Don't rely on this for securing trade secrets or private keys, etc. This is just obfuscation, not encryption.)

Here's the thing: Just like Babel, Webpack needs a lot of dependencies to be useful.

```bash
# The core webpack tools
npm install --save-dev webpack webpack-cli webpack-dev-server

# Some useful plugins for Babel
npm install --save-dev babel-plugin-transform-runtime babel-loader

# Some useful CSS plugins
npm install --save-dev autoprefixer precss postcss-loader postcss-import postcss-cssnext style-loader css-loader

# Some useful Webpack plugins
npm install --save-dev html-webpack-plugin html-webpack-include-assets-plugin copy-webpack-plugin uglifyjs-webpack-plugin
```

Ok, let's go over each one:

Category | Package                          | Description
---------|----------------------------------|--------------
Core     | `webpack`                        | This is the core webpack library. Important if we want to do anything with webpack!
Core     | `webpack-cli`                    | Provides a command-line interface so we can use it from the command prompt
Core     | `webpack-dev-server`             | Provides a development server, useful for rapid iteration during development
Babel    | `babel-plugin-transform-runtime` | When included, we can shave off a few bytes from the generated bundles (this keeps Babel from generating some duplicate code).
Babel    | `babel-loader`                   | Interface between Babel and Webpack
CSS      | `autoprefixer`                   | Automatically apply prefixes, based on your target environment
CSS      | `precss`                         | Lets us use SASS and other useful features in our CSS
CSS      | `postcss-loader`                 | Interface between PostCSS and Webpack. PostCSS has a similar purpose as Babel except that it translates more modern CSS to older CSS.
CSS      | `postcss-import`                 | Handle CSS imports
CSS      | `postcss-nextcss`                | Support the next version of CSS
CSS      | `style-loader`                   | Used to allow webpack to understand CSS imports in JavaScript
CSS      | `css-loader`                     | Used to allow webpack to understand CSS imports in JavaScript
Webpack  | `html-webpack-plugin`            | Creates an `index.html` file for us, based on dependencies in the project
Webpack  | `html-webpack-include-assets-plugin` | Allows us to include additional assets, like `CSInterface.js`.
Webpack  | `copy-webpack-plugin`            | Copies files during the webpack bundling process
Webpack  | `uglifyjs-webpack-plugin`        | Obfuscates and performs tree shaking on JavaScript code