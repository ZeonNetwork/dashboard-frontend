import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

import { initSignIn, verifySignIn, changeStep, resetStore, CLOSE_WALLET_CREDS } from '../../redux/modules/auth/signIn';
import { login } from '../../redux/modules/app/app';
import * as routes from '../../routes';


function* initSignInIterator({ payload }) {
  try {
    const data = yield call(post, '/user/login/initiate', payload);
    yield put(initSignIn.success(data));
    yield put(changeStep('verifySignIn'));
  } catch (e) {
    yield put(initSignIn.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* initSignInSaga() {
  yield takeLatest(
    initSignIn.REQUEST,
    initSignInIterator
  );
}


function* verifySignInIterator({ payload }) {
  try {
    const data = yield call(post, '/user/login/verify', payload);
    yield put(verifySignIn.success(data));
    if (!Array.isArray(data.wallets) || !data.wallets.length) {
      yield put(login(data.accessToken));
      yield put(resetStore());
      yield put(push(routes.DASHBOARD));
    } else {
      yield put(changeStep('walletCreds'));
    }
  } catch (e) {
    yield put(verifySignIn.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* verifySingInSaga() {
  yield takeLatest(
    verifySignIn.REQUEST,
    verifySignInIterator
  );
}

const getAccessToken = (state) => state.auth.signIn.accessToken;

function* closeWalletCredsIterator() {
  console.log('22222');
  const accessToken = yield select(getAccessToken);
  yield put(login(accessToken));
  yield put(resetStore());
  yield put(push(routes.DASHBOARD));
}

function* closeWalletCredsSaga() {
  console.log('1111');
  yield takeLatest(
    CLOSE_WALLET_CREDS,
    closeWalletCredsIterator
  );
}


export default function* () {
  yield all([
    fork(initSignInSaga),
    fork(verifySingInSaga),
    fork(closeWalletCredsSaga)
  ]);
}
