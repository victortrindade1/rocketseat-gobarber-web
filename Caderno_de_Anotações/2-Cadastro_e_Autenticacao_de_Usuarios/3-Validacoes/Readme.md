# Validações

A lib `Yup` serve tanto para backend qnt para frontend.

`yarn add yup`

## src/pages/SignUp/index.js

```diff
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'unform';
+import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

+const schema = Yup.object().shape({
+  name: Yup.string().required('O nome é obrigatório'),
+  email: Yup.string()
+    .email('Insira um e-mail válido')
+    .required('O e-mail é obrigatório'),
+  password: Yup.string()
+    .min(6, 'No mínimo 6 caracteres')
+    .required('A senha é obrigatória'),
+});

function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

-     <Form onSubmit={handleSubmit}>
+     <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}

export default SignUp;
```

## src/pages/SignIn/index.js

```diff
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'unform';
+import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

+const schema = Yup.object().shape({
+  email: Yup.string()
+    .email('Insira um e-mail válido')
+    .required('O e-mail é obrigatório'),
+  password: Yup.string().required('A senha é obrigatória'),
+});

function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

-     <Form onSubmit={handleSubmit}>
+     <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

export default SignIn;
```

## src/pages/\_layouts/auth/styles.js

Vou estilizar a msg de erro da validação. Se vc inspecionar, verá q fica num span.

```diff
import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

+   span {
+     color: #fb6f91;
+     align-self: flex-start;
+     margin: 0 0 10px;
+     font-weight: bold;
+   }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: backgroundd 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
```
