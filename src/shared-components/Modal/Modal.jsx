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
            shows={shows}
            action={action}
            onAddShow={addShow}
            onAddHall={addHall}
            onAddMovie={addMovie}
            onClose={handleClose}
            onDelete={handleDelete}
            itemToDelete={itemToDelete}
          />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  // С помощью этой переменной проверяем состояние модального окна
  isModalActive: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  shows: PropTypes.arrayOf(PropTypes.object),
  itemToDelete: PropTypes.string,
  onAddShow: PropTypes.func,
  onAddHall: PropTypes.func,
  onAddMovie: PropTypes.func,
  onDelete: PropTypes.func,
};


Modal.defaultProps = {
  shows: [],
  itemToDelete: '',
  onAddShow: () => {},
  onAddHall: () => {},
  onAddMovie: () => {},
  onDelete: () => {},
};

export default Modal;
