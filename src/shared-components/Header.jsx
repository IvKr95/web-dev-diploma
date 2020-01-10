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

function Header({ isAdminPage, logout }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  return (
    <header className="page-header">
      <h1 className="page-header__title">
        <Link style={linkStyle} to="/">
Идём
          <span>в</span>
кино

        </Link>
        {isAdminPage ? <span className="page-header__subtitle">Администраторская</span> : ''}
      </h1>

      {!isLoggedIn
        ? <Link to="/login" className="page-header__title">Login</Link>
        : (
          <>
            <Link to="/admin" className="page-header__title">Admin</Link>
            <button
              type="button"
              className="page-header__title"
              onClick={() => logout(setIsLoggedIn)}
            >
Logout
            </button>
          </>
        )}
    </header>
  );
}

Header.propTypes = {
  isAdminPage: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};


export default withAuthorization(Header, process.env.REACT_APP_AUTH_URL);