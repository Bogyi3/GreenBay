/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getUserData } from '../../actions/loginActions';
import './LoginPage.css';

function Login() {
  const history = useHistory();
  const loginData = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    userValue: null,
    error: '',
  });

  const [passwordInput, setPasswordInput] = useState({
    passwordValue: null,
    error: '',
  });

  function clearState() {
    setUserInput('');
    setPasswordInput('');
  }

  async function loginClick() {
    if (!userInput.userValue) {
      setUserInput({
        userValue: null,
        error: 'Username is required!',
      });
    }
    if (!passwordInput.passwordValue) {
      setPasswordInput({
        error: 'Password is required!',
      });
    }
    if (userInput.userValue
      && passwordInput.passwordValue
      && !userInput.error
      && !passwordInput.error) {
      const loginObject = {
        username: userInput.userValue,
        password: passwordInput.passwordValue,
      };
      const loggedIn = await dispatch(getUserData(loginObject));
      if (loggedIn === 'success') {
        clearState();
        history.push('/store');
      }
    }
  }

  const userChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    const regExp = /[^a-z\d]/i;
    let regError = '';
    const regExpTest = regExp.test(value);
    if (regExpTest) { regError = 'Alphanumerical only!'; }

    setUserInput({
      userValue: value,
      error: regError,
    });
  };

  const passwordChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    let { error } = passwordInput;

    error = value.length < 6
      ? 'Password must be at least 6 characters long!'
      : '';

    setPasswordInput({
      passwordValue: value,
      error,
    });
  };

  function hitEnter(event) {
    if (event.key === 'Enter') {
      loginClick();
    }
  }

  return (
    <div className="loginPage page">
      <form id="loginForm">
        <i className="fas fa-unlock-alt fa-3x" />
        <h1>Sign in</h1>
        <p className="logError">{loginData.errorMessage}</p>

        <label htmlFor="User">
          Username
        </label>
        <input name="User" type="text" onChange={userChange} onKeyPress={hitEnter} />
        <p className="logError">{userInput.error}</p>

        <label htmlFor="Password">
          Password
        </label>
        <input name="Password" type="password" onChange={passwordChange} onKeyPress={hitEnter} />
        <p className="logError">{passwordInput.error}</p>

        <div className="buttons">
          <Link to="/register">
            <Button variant="contained" color="secondary">
              Register
            </Button>

          </Link>
          <Button onClick={loginClick} variant="contained" color="secondary">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default (Login);
