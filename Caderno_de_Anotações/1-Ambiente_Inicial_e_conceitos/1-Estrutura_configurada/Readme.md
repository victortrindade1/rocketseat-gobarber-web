# Estrutura configurada

Foi criado um projeto com `create react-app <nome>`.

Após, configurado Eslint, EditorConfig e Prettier. O processo foi idêntico ao
descrito em `primeiro-projeto-reactjs`. A diferença foi q o eslintrc ficou um
pouco diferente, mas coloquei embaixo.

## .editorconfig

```js
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## .eslintrc.js

```js
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
  },
};
```

## .prettierrc

```js
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

> O prettier começou a dar um bug junto com o .editorconfig. As aspas simples se tornam aspas duplas e o eslint reclama. Pra resolver isto, vai nas Settings do VSCode -> Prettier -> Single Quotes in JSX
