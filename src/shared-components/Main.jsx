/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

function Main({ children, isAdminPage }) {
  return (
    <main className={isAdminPage ? 'conf-steps' : ''}>
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  isAdminPage: PropTypes.bool,
};

Main.defaultProps = {
  isAdminPage: false,
};

export default Main;
