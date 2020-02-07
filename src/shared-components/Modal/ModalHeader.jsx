/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/modal.module.css';

// Хэдер модального окна
function ModalHeader(props) {
  const {
    action,
    onClose: handleClose,
  } = props;

  return (
    <div className={styles.popup__header}>
      <h2 className={styles.popup__title}>
        {action}
        <button type="button" className={styles.popup__dismiss} onClick={handleClose}>
          <img src="i/close.png" alt="Закрыть" />
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
