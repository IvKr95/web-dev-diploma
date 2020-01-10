import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import loginForm from '../js/loginForm';

const LoginForm = ({ isLoggedIn, setIsLoggedIn }) => {
  const [state, setState] = useState({
    email: '',
    pwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...state,
      submit: true,
    };

    const res = await loginForm(process.env.REACT_APP_LOGIN_URL, data);

    setState({ email: '', pwd: '' });

    if (res.status === 'success') {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="admin" />;
  }
  return (
    <section className="login">

      <header className="login__header">
        <h2 className="login__title">Авторизация</h2>
      </header>

      <div className="login__wrapper">
        <form encType="multipart/form-data" className="login__form" acceptCharset="utf-8" onSubmit={handleSubmit}>

          <label className="login__label" htmlFor="mail">
                            E-mail
                  <input className="login__input" type="mail" placeholder="example@domain.xyz" name="email" value={state.email} onChange={handleChange} />
                </label>

          <label className="login__label" htmlFor="pwd">
                            Пароль
                  <input className="login__input" type="password" placeholder="" name="pwd" value={state.pwd} onChange={handleChange} />
                </label>

          <div className="text-center">
                  <input value="Авторизоваться" type="submit" className="login__button" name="submit" />
                </div>

        </form>
      </div>

    </section>
  );
};

export default LoginForm;
