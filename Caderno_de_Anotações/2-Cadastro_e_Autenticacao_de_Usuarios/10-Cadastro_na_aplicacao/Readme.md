# Cadastro na aplicação

## src/store/modules/auth/actions.js

Não é necessário criar a action SIGN_UP_SUCCESS.

```diff
export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

+export function signUpRequest(name, email, password) {
+  return {
+    type: '@auth/SIGN_UP_REQUEST',
+    payload: { name, email, password },
+  };
+}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
```

## src/pages/SignUp/index.js

```diff
import React from 'react';
+import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from 'unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

+import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

function SignUp() {
+ const dispatch = useDispatch();

  function handleSubmit(data) {
-   console.tron.log(data);
+   dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
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

## src/store/modules/auth/sagas.js

```diff
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    /**
     * O primeiro parâmetro de call() é o método q quer chamar: api.post
     * Fique atento para NÃO colocar "()" no método api.post
     * Do segundo em diante, são parâmetros do método: 'sessions', { email, ...}
     * O primeiro parâmetro do método api.post é a URL: 'sessions'
     * O segundo parâmetro são os dados q quer enviar: { email, password }
     */
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é prestador');
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

+export function* signUp({ payload }) {
+  try {
+    const { name, email, password } = payload;
+
+    yield call(api.post, 'users', {
+      name,
+      email,
+      password,
+      provider: true,
+    });
+
+    history.push('/');
+  } catch (err) {
+    toast.error('Falha no cadastro, verifique seus dados');
+
+    yield put(signFailure());
+  }
+}

-export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
+export default all([
+  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
+  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
+]);
```
