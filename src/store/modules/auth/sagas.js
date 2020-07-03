import { takeLatest, call, put, all } from 'redux-saga/effects';

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
      console.tron.error('Usuário não é prestador');
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
