/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginContext from '../contexts/LoginContext';
import withAuthorization from '../hoc/WithAuthorization';

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

  return (
    <header className="page-header">
      <h1 className="page-header__title">
        <Link
          style={linkStyle}
          to="/"
          title="Главная страница ИдемВКино"
        >
Идём
          <span>в</span>
кино
        </Link>
        {isAdminPage && <span className="page-header__subtitle">Администраторская</span>}
      </h1>

      {!isLoggedIn
        ? (
          <Link
            to="/login"
            className="page-header__title"
            title="Зайти используя логин"
          >
Login
          </Link>
        )
        : (
          <>
            <Link
              to="/admin"
              className="page-header__title"
              title="Перейти на страницу администратора"
            >
Admin
            </Link>
            <button
              type="button"
              className="page-header__title"
              onClick={() => logout(setIsLoggedIn)}
              title="Выйти из учетной записи"
            >
Logout
            </button>
          </>
        )}
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
