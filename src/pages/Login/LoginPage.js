import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';

import './LoginPage.scss';

const LoginPage = () => {
  const [emailInputVal, setEmailInputVal] = useState('');
  const [passwordInputVal, setPasswordInputVal] = useState('');
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(emailInputVal, passwordInputVal));
  };

  return (
    <div className='lp'>
      <div className='lp-inner'>
        <div className='lp-content'>
          <h2 className='lp-signIn-text text-center'> Sign In </h2>
          <form className='lp-signIn-form' onSubmit={handleLoginSubmit}>
            <input
              className='lp-signIn-form-input lp-signIn-form-input-email'
              type='text'
              placeholder='Email Address'
              value={emailInputVal}
              onChange={(e) => {
                setEmailInputVal(e.target.value);
              }}
            />
            <input
              className='lp-signIn-form-input lp-signIn-form-input-password'
              type='password'
              placeholder='Password'
              value={passwordInputVal}
              onChange={(e) => setPasswordInputVal(e.target.value)}
            />
            <button className='lp-signIn-form-submit-button' type='submit'>
              Sign In
            </button>
          </form>
          <div className='lip-forgotten-password-text text-center'>Forgotten your password?</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
