/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/client.css';

// Компонент обертка
// Принимает массив элементов
function ClientUI({ children }) {
  useEffect(() => {
    document.body.classList.add('client-theme');
    return () => {
      document.body.classList.remove('client-theme');
    };
  }, []);

  return (
    <div className="client-ui">
      {children}
    </div>
  );
}

ClientUI.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ClientUI;
