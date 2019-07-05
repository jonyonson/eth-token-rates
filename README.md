This project was bundled with [Parcel](https://parceljs.org).

## Available Scripts

In the project directory, you can run:

## `yarn start`

Runs `parcel src/index.html`

Runs the app in the development mode.<br>
Open [http://localhost:1234](http://localhost:1234) to view it in the browser.

## `yarn build`

Runs `parcel build src/index.html`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## `yarn clear-build-cache`

Runs `rm -rf .cache/ dist/`

Removes the `.cache` and `dist` folders.

## Adding SCSS

SCSS compilation needs sass (JS version of `dart-sass`) module. To install it with yarn, run:

```sh
yarn add -D sass
```

Once you have `sass` installed you can import SCSS files from JavaScript files.

```javascript
import './custom.scss';
```

You can also directly include the SCSS file in a HTML file.

```html
<link rel="stylesheet" href="./style.scss" />
```
