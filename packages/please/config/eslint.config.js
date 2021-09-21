const [ERROR, WARN, OFF] = ['error', 'warn', 'off'];

module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,

  extends: [
    `eslint:recommended`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
    `prettier`,
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'new-parens': ERROR, // https://eslint.org/docs/rules/new-parens
    'no-caller': ERROR, // https://eslint.org/docs/rules/no-caller
    'no-new-func': ERROR, // https://eslint.org/docs/rules/no-new-func
    'no-param-reassign': ERROR, // https://eslint.org/docs/rules/no-param-reassign
    'no-invalid-this': ERROR, // https://eslint.org/docs/rules/no-invalid-this
    'no-duplicate-case': ERROR, // https://eslint.org/docs/rules/no-duplicate-case
    'no-duplicate-imports': ERROR, // https://eslint.org/docs/rules/no-duplicate-imports
    'no-useless-constructor': OFF, // https://eslint.org/docs/rules/no-useless-constructor
    'no-undef-init': ERROR, // https://eslint.org/docs/rules/no-undef-init
    'prefer-template': ERROR, // https://eslint.org/docs/rules/prefer-template
    'no-new-wrappers': ERROR, // https://eslint.org/docs/rules/no-new-wrappers
    'no-return-await': ERROR, // https://eslint.org/docs/rules/no-return-await
    'no-throw-literal': ERROR, // https://eslint.org/docs/rules/no-throw-literal
    'no-var': ERROR,
    'no-extra-bind': ERROR, // https://eslint.org/docs/rules/no-extra-bind
    'prefer-const': ERROR,
    'prefer-rest-params': ERROR, // https://eslint.org/docs/rules/prefer-rest-params
    'prefer-spread': ERROR, // https://eslint.org/docs/rules/prefer-spread
    'no-shadow': OFF,
    eqeqeq: [ERROR, 'smart'], // https://eslint.org/docs/rules/eqeqeq
    'no-use-before-define': OFF,
    semi: OFF,
    'no-unused-expressions': [
      ERROR,
      {
        allowShortCircuit: true,
      },
    ],
    'default-case': [ERROR],
    curly: [ERROR, 'all'],
    'no-unsafe-finally': ERROR,
    'guard-for-in': ERROR,
    'no-else-return': ERROR,
    yoda: ERROR,
    'no-array-constructor': OFF,
    'default-param-last': WARN,
    '@typescript-eslint/no-shadow': ERROR,
    '@typescript-eslint/no-array-constructor': ERROR,
    '@typescript-eslint/no-use-before-define': [ERROR, 'nofunc'],
    '@typescript-eslint/no-misused-new': ERROR,
    '@typescript-eslint/no-useless-constructor': [ERROR],
    '@typescript-eslint/array-type': ERROR,
    '@typescript-eslint/consistent-type-definitions': OFF,
    '@typescript-eslint/no-inferrable-types': [
      ERROR,
      {
        ignoreParameters: true,
        ignoreProperties: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      ERROR,
      {
        accessibility: 'off',
      },
    ],
    '@typescript-eslint/semi': WARN,
    '@typescript-eslint/member-ordering': ERROR,
    '@typescript-eslint/no-parameter-properties': OFF,
    '@typescript-eslint/no-require-imports': ERROR,
    '@typescript-eslint/prefer-for-of': ERROR,
    '@typescript-eslint/prefer-function-type': ERROR,
    '@typescript-eslint/unified-signatures': ERROR,
    '@typescript-eslint/interface-name-prefix': OFF,
    '@typescript-eslint/ban-types': [
      ERROR,
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      ERROR,
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        format: ['camelCase'],
      },
      {
        selector: 'objectLiteralProperty',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
};
