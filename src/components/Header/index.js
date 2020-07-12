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
