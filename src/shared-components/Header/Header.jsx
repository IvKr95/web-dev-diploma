/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginContext from '../../contexts/LoginContext';
import withAuthorization from '../../hoc/WithAuthorization';
import styles from './css/header.module.css';

const linkStyle = {
  color: 'inherit',
  textDecoration: 'none',
};

// Стандартный хэдер
// Содержит ссылки на главную и админ страницы
// Также есть кнопка выхода из учетной записи
function Header(props) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { isAdminPage, logout } = props;

  const notLoggedInSlot = (
    <Link
      to="/login"
      className={styles['page-header__title']}
      title="Зайти используя логин"
    >
Login
    </Link>
  );

  const loggedInSlot = (
    <>
      <Link
        to="/admin"
        className={styles['page-header__title']}
        title="Перейти на страницу администратора"
      >
Admin
      </Link>
      <button
        type="button"
        className={styles['page-header__title']}
        onClick={() => logout(setIsLoggedIn)}
        title="Выйти из учетной записи"
      >
Logout
      </button>
    </>
  );

  return (
    <header className={styles['page-header']}>
      <h1 className={styles['page-header__title']}>
        <Link
          style={linkStyle}
          to="/"
          title="Главная страница ИдемВКино"
        >
Идём
          <span>в</span>
кино
        </Link>
        {isAdminPage && <span className={styles['page-header__subtitle']}>Администраторская</span>}
      </h1>

      {!isLoggedIn ? notLoggedInSlot : loggedInSlot}
    </header>
  );
}

Header.propTypes = {
  // Проверяет не в админе ли мы
  isAdminPage: PropTypes.bool,
  // Помогает выйти из учетной записи
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isAdminPage: false,
};

// Используем HOC для работы с сервером
export default withAuthorization(Header, process.env.REACT_APP_AUTH_URL);
