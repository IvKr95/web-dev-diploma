/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import styles from './css/modal.module.css';

// Если модальное окно активно
// Приминяем этот класс
const ACTIVE_POPUP = `${styles.popup} ${styles.active}`;
// Если неактивно, то этот
const NOT_ACTIVE_POPUP = styles.popup;

function Modal(props) {
  const {
    isModalActive,
    onClose: handleClose,
    action,
    onAddShow: addShow,
    onAddMovie: addMovie,
    onAddHall: addHall,
    itemToDelete,
    onDelete: handleDelete,
    halls,
    shows,
  } = props;

  return (
    <div className={isModalActive ? ACTIVE_POPUP : NOT_ACTIVE_POPUP}>
      <div className={styles.popup__container}>
        <div className={styles.popup__content}>
          <ModalHeader
            action={action}
            onClose={handleClose}
          />
          <ModalBody
            action={action}
            onAddShow={addShow}
            onAddMovie={addMovie}
            onAddHall={addHall}
            onClose={handleClose}
            itemToDelete={itemToDelete}
            onDelete={handleDelete}
            halls={halls}
            shows={shows}
          />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  // С помощью этой переменной проверяем состояние модального окна
  isModalActive: PropTypes.bool.isRequired,
  // children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Modal;
