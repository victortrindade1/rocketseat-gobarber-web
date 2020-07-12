# Configurando Header

## src/pages/\_layouts/default/styles.js

```diff
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
- background: #333;
+ background: linear-gradient(-90deg, #7159c1, #ab59c1);
`;
```

## src/components/Header/index.js

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-purple.svg';

import { Container, Content, Profile } from './styles';

function Header() {
  return (
    <Container>
      {/* Content é p/ alinhar o conteúdo ao centro */}
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Victor Trindade</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            {/* API avatars.adorable.io */}
            <img
              src="https://api.adorable.io/avatars/50/teste@teste.com.png"
              alt="Victor Trindade"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
```

## src/components/Header/styles.js

```javascript
import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #7159c1;
    }
  }

  aside {
    display: flex;
    align-self;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    height: 32px;
    border-radius: 50%;
  }
`;
```

## src/pages/\_layouts/default/index.js

O Header vai aparecer para todas as páginas q tenham o usuário logado. Portanto,
vou colocar o Header aqui na página layout-default.

```diff
import React from 'react';
import PropTypes from 'prop-types';

+import Header from '~/components/Header';

import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
-  return <Wrapper>{children}</Wrapper>;
+  return (
+    <Wrapper>
+      <Header />
+      {children}
+    </Wrapper>
+  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
```
