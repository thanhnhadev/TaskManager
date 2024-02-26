import { call, put } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function* LoginCheck(params) {
  const CryptoJS = require('crypto-js');
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(params.payload),
    'my-secret-key@123'
  ).toString();

  let result = null;
  yield call(async () => {
    result = await fetch('http://localhost:1880/User/Login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(params.payload),
    });
    result = await result.json();
    console.log(result);
    Cookies.set('np', ciphertext);
  });

  if (result.length > 0) {
    yield put({ type: 'SetCurrentUser', payload: { user: result } });
    yield put({ type: 'SetLogin', payload: { isLogin: true } });
  }
}

export function* LogoutCheck() {
  yield Cookies.remove('np');
  yield put({ type: 'SetLogin', payload: { isLogin: false } });
}

export function* DecryptCheck(params) {
  let result = null;
  yield call(async () => {
    result = await fetch('http://localhost:1880/User/Login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(params.payload),
    });
    result = await result.json();
    console.log('aaaa', result);
  });

  if (result.length > 0) {
    yield put({ type: 'SetCurrentUser', payload: { user: result } });
  }
}

export default LoginCheck;
