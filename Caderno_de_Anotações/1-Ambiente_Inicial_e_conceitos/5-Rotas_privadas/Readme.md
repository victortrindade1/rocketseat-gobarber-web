# Rotas Privadas

Para criar rotas privadas, onde há controle de acesso, vou criar minha própria
`Route`, em vez de importar do `react-router-dom`, e esta Route vai substituir
a Route da lib, com o acréscimo da propriedade `isPrivate`, criada por mim.

## src/routes/Route.js

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component, // Deve estar em letra maiúscula para a sintax entender JSX
  isPrivate,
  ...rest
}) {
  const signed = true; // temporario. esta const será automatizada

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
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

## src/routes/index.js

```diff
import React from 'react';
-import { Switch, Route } from 'react-router-dom';
+import { Switch } from 'react-router-dom';
+import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />

+      {/* URL inexistente */}
+      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
```

> Colocar a linha de redirecionar pro 404 foi apenas uma curiosidade, q não tem a ver com criar rota privada
