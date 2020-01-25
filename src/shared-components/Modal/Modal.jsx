/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

// Если модальное окно активно
// Приминяем этот класс
const ACTIVE_POPUP = 'popup active';
// Если неактивно, то этот
const NOT_ACTIVE_POPUP = 'popup';

function Modal(props) {
  const {
    isModalActive,
    children,
  } = props;

  return (
    <div className={isModalActive ? ACTIVE_POPUP : NOT_ACTIVE_POPUP}>
      <div className="popup__container">
        <div className="popup__content">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  // С помощью этой переменной проверяем состояние модального окна
  isModalActive: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Modal;
