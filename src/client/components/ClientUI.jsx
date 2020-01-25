/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import '../css/client.css';

// Компонент обертка
// Принимает массив элементов
function ClientUI({ children }) {
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
