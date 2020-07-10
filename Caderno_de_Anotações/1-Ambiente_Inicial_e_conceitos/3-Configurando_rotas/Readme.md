# Configurando rotas

`yarn add react-router-dom`

Desta vez, as rotas vão para uma pasta routes, e não um arquivo, pois haverão
mais configurações das rotas nesta pasta.

Coloque a lib history, q vai auxiliar a navegar entre telas, inclusive com
redux.

`yarn add history@^4.10.1`

> Eu coloquei a versão aí pq em versão superior está dando erro.
> Erro: quando redireciona, a página não renderiza.

## src/services/history.js

```javascript
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;
```

## src/App.js

```diff
import React from "react";
+ import { Router } from 'react-router-dom';

+ import Routes from './routes';
+ import history from './services/history';

function App() {
  return (
-    <div className='App'>
-      <h1>Hello World</h1>
-    </div>
+    <Router history={history}>
+      <Routes />;
+    </Router>
  );
}

export default App;
```

## src/routes/index.js

```javascript
import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
    </Switch>
  );
}
```

## src/pages/SignIn/index.js

> Snippet no VSCode: "rfc"

```javascript
import React from 'react';

// import { Container } from './styles';

function SignIn() {
  return <div />;
}

export default SignIn;
```

## src/pages/SignUp/index.js

```javascript
import React from 'react';

// import { Container } from './styles';

function SignUp() {
  return <div />;
}

export default SignUp;
```

## src/pages/Dashboard/index.js

```javascript
import React from 'react';

// import { Container } from './styles';

function Dashboard() {
  return <div />;
}

export default Dashboard;
```

## src/pages/Profile/index.js

```javascript
import React from 'react';

// import { Container } from './styles';

function Profile() {
  return <div />;
}

export default Profile;
```
