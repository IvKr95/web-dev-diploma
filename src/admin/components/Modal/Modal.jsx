import React from 'react';
import PropTypes from 'prop-types';

const ACTIVE_POPUP = 'popup active';
const NOT_ACTIVE_POPUP = 'popup';

function Modal(props) {
  const { isModalActive, children } = props;

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
  isModalActive: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Modal;
