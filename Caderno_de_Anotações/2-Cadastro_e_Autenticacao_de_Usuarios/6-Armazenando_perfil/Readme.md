# Armazenando perfil

Vamos armazenar os dados do usuário, assim como o token gerado no backend.

## src/store/modules/rootReducer.js

```diff
import { combineReducers } from 'redux';

import auth from './auth/reducer';
+ import user from './user/reducer';

export default combineReducers({ auth });
```

## src/store/modules/rootSaga.js

```diff
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
+ import user from './user/sagas';

export default function* rootSaga() {
-  return yield all([auth]);
+  return yield all([auth, user]);
}
```

## src/store/modules/user/actions.js

Foi criado arquivo em branco

## src/store/modules/user/sagas.js

```javascript
import { all } from 'redux-saga/effects';

export default all([]);
```

## src/store/modules/user/reducer.js

```javascript
import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Não tem problema se o reducer de um module tiver action de outro module
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft.profile = action.payload.user;
      });
    default:
      return state;
  }
}
```
