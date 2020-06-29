# Configurando o Store com Redux

Adicione as libs:

- redux
- redux-saga
- react-redux
- reactotron-redux
- reactotron-redux-saga
- immer

`yarn add redux redux-saga react-redux reactotron-redux reactotron-redux-saga immer`

## src/store/index.js

```javascript
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export default store;
```

## src/store/createStore.js

> Aqui ficam todas as criações de Store. Ficou em um arquivo separado pq vai
> ficar mt grande, e aí o index do store ia ficar mt grande.

```javascript
import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
```

## src/store/modules/auth/reducer.js

```javascript
const INITIAL_STATE = {};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

## src/store/modules/auth/sagas.js

```javascript
import { all } from 'redux-saga/effects';

export default all([]);
```

## src/store/modules/auth/actions.js

Foi apenas criado o arquivo. Está em branco por enquanto.

## src/store/modules/rootSaga.js

```javascript
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([auth]);
}
```

## src/store/modules/rootReducer.js

```javascript
import { combineReducers } from 'redux';

import auth from './auth/reducer';

export default combineReducers({ auth });
```

## src/config/ReactotronConfig.js

```diff
import Reactotron from 'reactotron-react-js';
+import { reactotronRedux } from 'reactotron-redux';
+import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
-  const tron = Reactotron.configure().connect();
+  const tron = Reactotron.configure()
+    .use(reactotronRedux())
+    .use(reactotronSaga())
+    .connect();

  tron.clear();

  console.tron = tron;
}
```

## src/App.js

> Fique atento! O `import store` precisa ficar depois do
> `import './config/ReactotronConfig'`

```diff
import React from 'react';
+import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

+import store from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
+   <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyle />
      </Router>
+   </Provider>
  );
}

export default App;
```

## Para testar se está funcionando

Abra o Reactotron e crie o state `auth`. Coloque um valor qqr para o
INITIAL_STATE do reducer de auth e veja se mudou no state do Reactotron.

### src/store/modules/auth/reducer.js

```diff
const INITIAL_STATE = {
+  token: '123',
};
```
