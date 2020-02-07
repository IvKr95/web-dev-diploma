/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';

// Семантически оборачивает содержимое
// Если в администраторской, то задаем класс
// 'conf-steps'
function Main({ children, isAdminPage }) {
  return (
    <main className={isAdminPage ? 'conf-steps' : ''}>
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.bool]).isRequired,
  // Проверяем, не в админе ли мы
  isAdminPage: PropTypes.bool,
};

Main.defaultProps = {
  isAdminPage: false,
};

export default Main;
