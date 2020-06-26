# Root Import

Antes do root import:

`import Foobar from '../../../foobar'`

Depois do root import:

`import Foobar from '~/foobar'`

Onde `~` representa o root (determinado em `config-overrides.js`), q geralmente
é a pasta `src`.

`yarn add customize-cra react-app-rewired babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D`

- customize-cra e react-app-rewired: dão acesso a editar o babel (p/ CRA)
- babel-plugin-root-import: a lib q faz a mágica
- eslint-import-resolver-babel-plugin-root-import: p/ o eslint

## config-overrides.js

Este arquivo não é React, é Node. Aqui q vc vai dizer qual a pasta root dos
códigos q vc edita, q são no caso, a pasta `src`.

```javascript
const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ])
);
```

## package.json

```diff
  "scripts": {
-    "start": "react-scripts start",
-    "build": "react-scripts build",
-    "test": "react-scripts test",
+    "start": "react-app-rewired start",
+    "build": "react-app-rewired build",
+    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

## .eslintrc.js

```diff
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'react/state-in-constructor': ['off', 'always'],
    'no-console': ['error', { allow: ['tron'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
+   'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
+  settings: {
+    'import/resolver': {
+      'babel-plugin-root-import': {
+        rootPathSuffix: 'src',
+      },
+    },
+  },
};
```

## jsconfig.json

Este arquivo é necessário criar pra poder navegar pelo import com root `~`.
Use `Ctrl + Alt` ou `Shift + Alt` p/ navegar para o arquivo.

```javascript
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```
