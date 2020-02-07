/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../contexts/LoginContext';
import withAuthorization from '../hoc/WithAuthorization';

// Значение формы по умолчанию
const DEFAULT_LOGIN_STATE = {
  email: '',
  password: '',
};

// Стили для ошибок логина
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
  // Если есть ошибка при авторизации, то подгружается сюда
  const [error, setError] = useState(null);
  // Меняем контекст при успешном логине
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

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
            htmlFor="email"
            style={error === 'No Such User' || error === 'Empty Fields, Fill In All Fields!' ? { color: 'red' } : null}
          >
E-mail
            <input
              id="email"
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
            htmlFor="password"
            style={error === 'Wrong Password' || error === 'Empty Fields, Fill In All Fields!' ? { color: 'red' } : null}
          >
            Пароль
            <input
              id="password"
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
  // Функция логина из HOC withAuthorization
  login: PropTypes.func.isRequired,
};

// Используем HOC для работы с сервером
export default withAuthorization(LoginForm, process.env.REACT_APP_AUTH_URL);
