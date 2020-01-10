/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../contexts/LoginContext';
import withAuthorization from '../hoc/WithAuthorization';

const DEFAULT_LOGIN_STATE = {
  email: '',
  password: '',
};

const css = {
  error: {
    fontSize: '2rem',
    color: 'red',
    textAlign: 'center',
  },
  resolved: {
    color: 'initial',
  },
};

const LoginForm = ({ login }) => {
  const [state, setState] = useState(DEFAULT_LOGIN_STATE);
  const [error, setError] = useState(null);
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const authData = {
      ...state,
      action: 'login',
    };

    login(authData, setIsLoggedIn, setError);
    refreshForm();
  };

  const refreshForm = () => {
    setState(DEFAULT_LOGIN_STATE);
  };

  return (
    <section className="login">
      <header className="login__header">
        <h2 className="login__title">Авторизация</h2>
      </header>

      <div className="login__wrapper">
        {
          error ? <p style={css.error}>{error}</p>
            : null
        }
        <form className="login__form" onSubmit={handleSubmit}>

          <label
            className="login__label"
            htmlFor="mail"
            style={error === 'No Such User' || error === 'Empty Fields, Fill In All Fields!' ? { color: 'red' } : null}
          >
E-mail
            <input
              className="login__input"
              type="mail"
              placeholder="example@domain.xyz"
              name="email"
              value={state.email}
              onChange={handleChange}
              style={error === 'No Such User' || error === 'Empty Fields, Fill In All Fields!' ? { borderColor: 'red' } : null}
            />
          </label>

          <label
            className="login__label"
            htmlFor="pwd"
            style={error === 'Wrong Password' || error === 'Empty Fields, Fill In All Fields!' ? { color: 'red' } : null}
          >
            Пароль
            <input
              className="login__input"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              style={error === 'Wrong Password' || error === 'Empty Fields, Fill In All Fields!' ? { borderColor: 'red' } : null}
            />
          </label>

          <div className="text-center">
            <input type="submit" className="login__button" name="submit" value="Авторизоваться" />
          </div>

        </form>
      </div>
    </section>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};


export default withAuthorization(LoginForm, process.env.REACT_APP_AUTH_URL);
