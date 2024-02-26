import React, { useEffect, useState } from 'react';
import { LockClosedOutline, MailOutline } from 'react-ionicons';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (props.loginStatus.isLogin) {
      nav('/main');
    }

    if (Cookies.get('np')) {
      const CryptoJS = require('crypto-js');
      const bytes = CryptoJS.AES.decrypt(
        Cookies.get('np'),
        'my-secret-key@123'
      );
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      props.LoginCheck(decryptedData.Email, decryptedData.Password);
    }
  }, [props.loginStatus.isLogin, props]);

  function Login(e) {
    e.preventDefault();
    props.LoginCheck(email, password);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 background">
      <form
        className=" p-4 w-50 text-light shadow-lg"
        style={{ backgroundColor: 'rgba(0,0,0,.7)' }}
      >
        <div className="text-center pt-3">
          <h2 className="h1">LOGIN</h2>
        </div>
        <hr />
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend my-auto">
              <span
                className="input-group-text d-flex align-items-center"
                id="basic-addon1"
                style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
              >
                <MailOutline color={'#ffffff'} height="20px" width="20px" />
              </span>
            </div>
            <input
              style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Enter email"
              id="emailLogin"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
              >
                <LockClosedOutline
                  color={'#ffffff'}
                  height="20px"
                  width="20px"
                />
              </span>
            </div>
            <input
              style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              placeholder="Enter password"
              id="pwdLogin"
            />
          </div>
        </div>

        <button
          className="btn btn-outline-light d-block container mt-5"
          onClick={(e) => {
            Login(e);
          }}
        >
          SIGN IN
        </button>
      </form>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LoginCheck: (email, password) => {
      dispatch({
        type: 'LOGIN_CHECK',
        payload: { Email: email, Password: password },
      });
    },

    DecryptCheck: (a, b) => {
      dispatch({ type: 'DECRYPT_CHECK', payload: { Email: a, Password: b } });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
