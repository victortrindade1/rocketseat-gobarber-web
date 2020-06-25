# Layouts por página

O layout do app é dividido em 2 layouts diferentes, e em cada layout, vai
renderizar 2 páginas. Portanto, são 2 layouts, com duas páginas por layout. São
elas:

- Layout 1
  - SignIn
  - SignUp
- Layout 2 (possui header)
  - Dashboard
  - Profile

## src/pages/\_layouts

> A pasta `_layouts` possui este _underline_ para q o vscode organize sempre ele
> mais acima de todas as pastas.

## src/pages/\_layouts/auth/index.js

```javascript
import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function AuthLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
```

## src/pages/\_layouts/auth/styles.js

```javascript
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
`;
```

## src/pages/\_layouts/default/index.js

```javascript
import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
```

## src/pages/\_layouts/default/styles.js

```javascript
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #333;
`;
```

## src/routes/Route.js

```diff
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

+import AuthLayout from '../pages/_layouts/auth';
+import DefaultLayout from '../pages/_layouts/default';

export default function RouteWrapper({
  component: Component, // Deve estar em letra maiúscula para a sintax entender JSX
  isPrivate,
  ...rest
}) {
  const signed = false; // temporario. esta const será automatizada

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

+ const Layout = signed ? DefaultLayout : AuthLayout;

- return <Route {...rest} component={Component} />;
+ return (
+   <Route
+     {...rest}
+     render={(props) => (
+       <Layout>
+         <Component {...props} />
+       </Layout>
+     )}
+   />
+ );
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
