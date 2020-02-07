/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AddHall from '../../admin/forms/AddHall';
import AddMovie from '../../admin/forms/AddMovie';
import DeleteHall from '../../admin/forms/DeleteHall';
import AddShow from '../../admin/forms/AddShow';
import DeleteShow from '../../admin/forms/DeleteShow';
import styles from './css/modal.module.css';

// Тело модального окна
const ModalBody = (props) => {
  const {
    action,
    onAddShow: addShow,
    onAddHall: addHall,
    onAddMovie: addMovie,
    onClose: handleModal,
    itemToDelete,
    onDelete: handleDelete,
    shows,
  } = props;

  // Активное окно
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (action) {
      chooseModal();
    }
  }, [action]);

  // Выбираем какое окно показывать
  // с помощью action
  const chooseModal = () => {
    let newModal;

    switch (action) {
      case 'addHall':
        newModal = (
          <AddHall
            onAddHall={addHall}
            onClose={handleModal}
          />
        );
        break;
      case 'deleteHall':
        newModal = (
          <DeleteHall
            hallName={itemToDelete}
            onDelete={handleDelete}
            onClose={handleModal}
          />
        );
        break;
      case 'addMovie':
        newModal = (
          <AddMovie
            onAddMovie={addMovie}
            onClose={handleModal}
          />
        );
        break;
      case 'addShowTime':
        newModal = (
          <AddShow
            shows={shows}
            onAddShow={addShow}
            onClose={handleModal}
          />
        );
        break;
      case 'deleteShowTime':
        newModal = (
          <DeleteShow
            movie={itemToDelete.movie}
            onDelete={handleDelete}
            onClose={handleModal}
          />
        );
        break;
      default:
        newModal = '';
        break;
    }

    setActiveModal(newModal);
  };

  return (
    <div className={styles.popup__wrapper}>
      {activeModal}
    </div>
  );
};

ModalBody.propTypes = {
  action: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  shows: PropTypes.arrayOf(PropTypes.object),
  itemToDelete: PropTypes.string,
  onAddShow: PropTypes.func,
  onAddHall: PropTypes.func,
  onAddMovie: PropTypes.func,
  onDelete: PropTypes.func,
};

ModalBody.defaultProps = {
  shows: [],
  itemToDelete: '',
  onAddShow: () => {},
  onAddHall: () => {},
  onAddMovie: () => {},
  onDelete: () => {},
};

export default ModalBody;
