const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
  },
  settings: {
    'import/resolver': {
      alias: [
        ['Utils', path.resolve(__dirname, 'src/utils/')],
        ['Models', path.resolve(__dirname, 'src/models/')],
      ],
    },
  },
};
