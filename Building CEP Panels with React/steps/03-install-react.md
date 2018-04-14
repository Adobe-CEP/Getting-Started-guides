# Installing React


> **NOTE:**
>
> If you have downloaded the sample repository instead of following step-by-step, note that the sample does not include the actual dependences you'll need to build the project. Instead, you need to install the dependencies like so:
>
> ```bash
> cd /location/of/downloaded/repo
> cd react-panel
> npm install
> ```

React itself is pretty small and easily installed:

```bash
npm install --save react react-dom
```

> **NOTE:**
>
> The `--save` flag adds the two packages to your `package.json` file. That means that next time you can just run `npm install` in this project folder to install everything at once.