# Logout da aplicação

<!-- TOC -->

- [Logout da aplicação](#logout-da-aplicação)
  - [src/store/modules/auth/actions.js](#srcstoremodulesauthactionsjs)
  - [src/store/modules/auth/reducer.js](#srcstoremodulesauthreducerjs)
  - [src/store/modules/auth/sagas.js](#srcstoremodulesauthsagasjs)
  - [src/pages/Profile/index.js](#srcpagesprofileindexjs)
  - [src/store/modules/user/reducer.js](#srcstoremodulesuserreducerjs)

<!-- /TOC -->

## src/store/modules/auth/actions.js

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

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

+export function signOut() {
+  return {
+    type: '@auth/SIGN_OUT',
+  };
+}
```

## src/store/modules/auth/reducer.js

```diff
import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
+     case '@auth/SIGN_OUT': {
+       draft.token = null;
+       draft.signed = false;
+       break;
+     }
      default:
    }
  });
}
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

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

+export function signOut() {
+  // Magicamente somente com o history push pra raiz já desloga automaticamente
+  history.push('/');
+}

// A action persist/REHYDRATE vem pronta da lib redux-persist
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
+ takeLatest('@auth/SIGN_OUT', signOut),
]);
```

## src/pages/Profile/index.js

```diff
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'unform';

+import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

+ function handleSignOut() {
+   dispatch(signOut());
+ }

  return (
    <Container>
      {/* initialData é um argumento pronto da lib. Faz com q ao carregar a
      página, já aparecerem os dados preenchidos no form */}
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação da senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

-     <button type="button">Sair do GoBarber</button>
+     <button type="button" onClick={handleSignOut}>
+       Sair do GoBarber
+     </button>
    </Container>
  );
}

export default Profile;
```

## src/store/modules/user/reducer.js

```diff
import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      // Não tem problema se o reducer de um module tiver action de outro module
      case '@auth/SIGN_IN_SUCCESS':
        draft.profile = action.payload.user;
        break;
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
+     case '@auth/SIGN_OUT': {
+       draft.profile = null;
+       break;
+     }
      default:
    }
  });
}
```
