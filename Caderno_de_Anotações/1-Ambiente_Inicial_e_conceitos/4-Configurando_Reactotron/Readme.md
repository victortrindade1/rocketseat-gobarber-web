# Configurando Reactotron

`yarn add reactotron-react-js`

## src/config/ReactotronConfig.js

```javascript
import Reactotron from 'reactotron-react-js';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure().connect();

  tron.clear();

  console.tron = tron;
}
```

## src/App.js

```diff
import React from 'react';
import { Router } from 'react-router-dom';

+ import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

function App() {
  return (
    <Router history={history}>
      <Routes />;
    </Router>
  );
}

export default App;
```
