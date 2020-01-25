/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

// Хэдер модального окна
function ModalHeader(props) {
  const {
    action,
    onClose: handleClose,
  } = props;

  return (
    <div className="popup__header">
      <h2 className="popup__title">
        {action}
        <button type="button" className="popup__dismiss" onClick={handleClose}>
          <span>&times;</span>
        </button>
      </h2>
    </div>
  );
}

ModalHeader.propTypes = {
  // Текущее действие
  action: PropTypes.string.isRequired,
  // Закрывает окно
  onClose: PropTypes.func.isRequired,
};

export default ModalHeader;
