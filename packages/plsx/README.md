# `plsx`

## Description
This tool comes with preconfigured build steps like: run, build, test, lint and format.

## Usage

```sh
npm install plsx --save-dev
```

Then you need to add the following scripts into your project package.json:
```json
{
  "scripts": {
    "start": "plsx run ./src/app.ts",
    "build": "plsx build",
    "format": "plsx format",
    "test": "plsx test",
    "lint": "plsx lint"
  }
}
```

In order to also support the editors your root project should contain:

#### tsconfig.json
```json
{
  "extends": "plsx/config/tsconfig.base.json",
  "include": ["src"],
  "exclude": [
    "node_modules",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```
#### jest.config.js
```js
module.exports = require('plsx/config/jest.config.js');
```
#### prettier.config.js
```js
module.exports = require('plsx/config/prettier.config.js');
```
#### .eslintrc
```js
module.exports = require('plsx/config/eslint.config.js');
```

### Overwriting config
Config files are loaded by priority (config from working dir, config bundled in package). This means that for example if
we have a **prettier.config.js** in the project root we can overwrite the default configs bundled in the package.
```js
const baseConfig = require('plsx/config/prettier.config.js');
module.exports = {
  ...baseConfig,
  tabWidth: 4,
};
```
