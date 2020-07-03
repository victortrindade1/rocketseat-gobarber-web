# Persistindo autenticação

Se atualizar o app, o usuário tem q continuar logado.

<!-- TOC -->

- [Persistindo autenticação](#persistindo-autenticação)
  - [Lib redux-persist](#lib-redux-persist)
  - [src/store/persistReducers.js](#srcstorepersistreducersjs)
  - [src/store/index.js](#srcstoreindexjs)
  - [src/App.js](#srcappjs)
  - [src/routes/Route.js](#srcroutesroutejs)

<!-- /TOC -->

## Lib redux-persist

`yarn add redux-persist`

Esta lib tem integração com vários bancos locais, como o localstorage do React o
ou o async storage do RN.

## src/store/persistReducers.js

```javascript
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
```

## src/store/index.js

```diff
+import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
+import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

-const store = createStore(rootReducer, middlewares);
+const store = createStore(persistReducers(rootReducer), middlewares);
+const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

-export default store;
+export { store, persistor };
```

## src/App.js

Como não estou mais exportando store default, coloca chaves.

```diff
import React from 'react';
+import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

-import store from './store';
+import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
+     <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
+     </PersistGate>
    </Provider>
  );
}

export default App;
```

## src/routes/Route.js

```diff
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

-import store from '~/store';
+import { store } from '~/store';

export default function RouteWrapper({
  component: Component, // Deve estar em letra maiúscula para a sintax entender JSX
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      rest={rest}
      render={(props) => (
        <Layout>
          <Component props={props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
```
