# Foto de perfil

<!-- TOC -->

- [Foto de perfil](#foto-de-perfil)
  - [src/pages/Profile/AvatarInput/index.js](#srcpagesprofileavatarinputindexjs)
  - [src/pages/Profile/index.js](#srcpagesprofileindexjs)
  - [src/pages/Profile/AvatarInput/styles.js](#srcpagesprofileavatarinputstylesjs)
  - [src/store/modules/user/sagas.js](#srcstoremodulesusersagasjs)

<!-- /TOC -->

## src/pages/Profile/AvatarInput/index.js

Vou criar um component q só é usado nesta página. Portanto, vou criar dentro
de pages/Profile.

Este component é uma foto de perfil clicável, onde o usuário faz upload da foto
do perfil.

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'unform';
import api from '~/services/api';

import { Container } from './styles';

function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  // Se defaultValue, então defaultValue
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/teste@teste.com.png'
          }
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default AvatarInput;
```

## src/pages/Profile/index.js

```diff
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

+import AvatarInput from './AvatarInput';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      {/* initialData é um argumento pronto da lib. Faz com q ao carregar a
      página, já aparecerem os dados preenchidos no form */}
      <Form initialData={profile} onSubmit={handleSubmit}>
+       <AvatarInput name="avatar_id" />

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

## src/pages/Profile/AvatarInput/styles.js

```javascript
import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
```

## src/store/modules/user/sagas.js

```diff
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
-   const { name, email, ...rest } = payload.data;
+   const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
+     avatar_id,
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
