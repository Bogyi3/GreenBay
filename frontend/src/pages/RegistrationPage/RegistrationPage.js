/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PasswordStrengthBar from 'react-password-strength-bar';
import generalFetch from '../../utilities/generalFetch';
import './RegistrationPage.css';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const registerUser = async () => {
    try {
      const response = await generalFetch('registration', 'POST', {
        username, firstName, lastName, email, password,
      });

      if (response.status === 201) {
        history.push('/login');
      } else {
        setErrorMessage(response.response.message);
      }
    } catch (error) {
      setErrorMessage(`Oops! There was an error.\n${error.message}\nPlease try again later.`);
    }
  };

  const onUsernameChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setUsername(event.target.value);
  };

  const onFirstNameChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setFirstName(event.target.value);
  };

  const onLastNameChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setLastName(event.target.value);
  };

  const onEmailChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    } setPassword(event.target.value);
  };

  const registerClick = (event) => {
    event.preventDefault();
    if (!username || !firstName || !lastName || !password || !email) {
      setErrorMessage('All fields are required.');
      return null;
    }

    const usernameFormat = /^[a-zA-Z0-9]*$/i;
    if (!usernameFormat.test(String(username))) {
      setErrorMessage('Alphanumerical only!');
      return null;
    }

    const firstNameFormat = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if (!firstNameFormat.test(String(firstName))) {
      setErrorMessage('First name is invalid.');
      return null;
    }

    const lastNameFormat = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if (!lastNameFormat.test(String(lastName))) {
      setErrorMessage('Last name is invalid.');
      return null;
    }

    const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailFormat.test(String(email).toLowerCase())) {
      setErrorMessage('E-mail should follow this format: example@mail.com.');
      return null;
    }

    if (password.length < 6) {
      setErrorMessage('Password is too short. Minimum 6 characters.');
      return null;
    }

    const weakPasswordFormat = /^[a-z]+$/;
    if (weakPasswordFormat.test(String(password))) {
      setErrorMessage('Password is too weak. Try adding numbers or special characters.');
      return null;
    }
    return registerUser();
  };

  return (
    <div className="registrationPage page">
      <form id="registerForm">
        <i className="fas fa-user-circle fa-4x" />
        <h1>Create an account</h1>
        <div className="errorMessage">
          {errorMessage}
        </div>

        <label htmlFor="username">
          Username
        </label>
        <input
          name="username"
          value={username}
          type="text"
          noValidate
          onChange={onUsernameChange}
        />

        <label htmlFor="firstName">
          First Name
        </label>
        <input
          name="firstName"
          value={firstName}
          type="text"
          noValidate
          onChange={onFirstNameChange}
        />

        <label htmlFor="lastName">
          Last Name
        </label>
        <input
          name="lastName"
          value={lastName}
          type="text"
          noValidate
          onChange={onLastNameChange}
        />

        <label htmlFor="email">
          E-mail
        </label>
        <input
          name="email"
          value={email}
          type="e-mail"
          noValidate
          onChange={onEmailChange}
        />

        <label htmlFor="password">
          Password
        </label>
        <input
          name="password"
          value={password}
          type="password"
          noValidate
          onChange={onPasswordChange}
        />

        <PasswordStrengthBar
          className="strengthBar"
          minLength={6}
          password={password}
          scoreWordClassName="strengthWord"
          scoreWords={['weak', 'weak', 'medium', 'good', 'strong']}
          barColors={['#ddd', '#b71c1c', '#ef6c00', '#ffca28', '#49d290']}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={registerClick}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default RegistrationPage;
