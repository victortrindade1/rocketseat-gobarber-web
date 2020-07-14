# Atualizando perfil

<!-- TOC -->

- [Atualizando perfil](#atualizando-perfil)
  - [src/pages/Profile/index.js](#srcpagesprofileindexjs)
  - [src/store/modules/user/actions.js](#srcstoremodulesuseractionsjs)
  - [src/store/modules/user/sagas.js](#srcstoremodulesusersagasjs)
  - [src/store/modules/user/reducer.js](#srcstoremodulesuserreducerjs)

<!-- /TOC -->

## src/pages/Profile/index.js

```diff
import React from 'react';
-import { useSelector } from 'react-redux';
+import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'unform';

import { Container } from './styles';

function Profile() {
+ const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

- function handleSubmit(data) {}
+ function handleSubmit(data) {
+   dispatch(updateProfileRequest(data));
+ }

  return (
    <Container>
      {/* initialData é um argumento pronto da lib. Faz com q ao carregar a
      página, já aparecerem os dados preenchidos no form */}
      <Form initialData={profile} onSubmit={handleSubmit}>
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

      <button type="button">Sair do GoBarber</button>
    </Container>
  );
}

export default Profile;
```

## src/store/modules/user/actions.js

```javascript
export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
```

## src/store/modules/user/sagas.js

```javascript
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
```

## src/store/modules/user/reducer.js

```diff
import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
+ return produce(state, (draft) => {
    switch (action.type) {
      // Não tem problema se o reducer de um module tiver   action de outro module
      case '@auth/SIGN_IN_SUCCESS':
-       return produce(state, (draft) => {
          draft.profile = action.payload.user;
+         break;
-       });
+     case '@user/UPDATE_PROFILE_SUCCESS': {
+       draft.profile = action.payload.profile;
+       break;
+     }
      default:
-       return state;
    }
+ });
}
```
