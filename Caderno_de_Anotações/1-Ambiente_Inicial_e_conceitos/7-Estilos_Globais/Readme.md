# Estilos Globais

## src/styles/global.js

Este CSS inicial se adequa a 100% dos projetos. Mt bom.

```javascript
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
```

## src/App.js

```diff
import React from 'react';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

+import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
+     <GlobalStyle />
    </Router>
  );
}

export default App;
```
