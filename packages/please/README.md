# `@ionutmilica/please`

## Description
This tool comes with preconfigured build steps like: run, build, test, lint and format.

## Usage

```sh
npm install @ionutmilica/please --save-dev
```

Then you need to add the following scripts into your project package.json:
```json
{
  "scripts": {
    "start": "please run ./src/app.ts",
    "build": "please build",
    "format": "please format",
    "test": "please test",
    "lint": "please lint"
  }
}
```

In order to also support the editors your root project should contain:

#### tsconfig.json
```json
{
  "extends": "@ionutmilica/please/config/tsconfig.base.json",
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
module.exports = require('@ionutmilica/please/config/jest.config.js');
```
#### prettier.config.js
```js
module.exports = require('@ionutmilica/please/config/prettier.config.js');
```
#### .eslintrc
```js
module.exports = require('@ionutmilica/please/config/eslint.config.js');
```
