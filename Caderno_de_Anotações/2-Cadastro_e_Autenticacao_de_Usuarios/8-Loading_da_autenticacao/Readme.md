# Loading da autenticação

## src/store/modules/auth/reducer.js

```diff
import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
+ return produce(state, (draft) => {
    switch (action.type) {
+     case '@auth/SIGN_IN_REQUEST': {
+       draft.loading = true;
+       break;
+     }
      case '@auth/SIGN_IN_SUCCESS':
-     return produce(state, (draft) => {
          draft.token = action.payload.token;
          draft.signed = true;
+         draft.loading = false;
+         break;
-     });
+     case '@auth/SIGN_FAILURE': {
+       draft.loading = false;
+       break;
+     }
      default:
-       return state;
    }
+ });
}
```

## src/pages/SignIn/index.js

```diff
import React from 'react';
-import { useDispatch } from 'react-redux';
+import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from 'unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn() {
  const dispatch = useDispatch();
+ const loading = useSelector((state) => state.auth.loading);

  /**
   * Eu poderia simplesmente passar apenas (...data), porém fica mt obscuro qnd lê
   * o código. Passando apenas os dados separados (email, password), quem ler o
   * codigo vai saber pra q q serve aquela Request.
   */
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

-       <button type="submit">Acessar</button>
+       <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

export default SignIn;
```

## src/store/modules/auth/sagas.js

```diff
import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

-import { signInSuccess } from './actions';
+import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
+ try {
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
      console.tron.error('Usuário não é prestador');
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
+ } catch (err) {
+   yield put(signFailure());
+ }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
```
