# Dados do Header

<!-- TOC -->

- [Dados do Header](#dados-do-header)
  - [src/components/Header/index.js](#srccomponentsheaderindexjs)
  - [src/components/Header/styles.js](#srccomponentsheaderstylesjs)

<!-- /TOC -->

## src/components/Header/index.js

```diff
import React from 'react';
+import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';

import logo from '~/assets/logo-purple.svg';

import { Container, Content, Profile } from './styles';

function Header() {
+ const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      {/* Content é p/ alinhar o conteúdo ao centro */}
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
-             <strong>Victor Trindade</strong>
+             <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            {/* API avatars.adorable.io */}
            <img
-             src="https://api.adorable.io/avatars/50/teste@teste.com.png"
-             alt="Victor Trindade"
+             src={
+               profile.avatar
+                 ? profile.avatar.url
+                 : 'https://api.adorable.io/avatars/50/teste@teste.com.png'
+             }
+             alt=""
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

```diff
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
+   width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
```
