/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AddHall from '../Forms/AddHall';
import AddMovie from '../Forms/AddMovie';
import DeleteHall from '../Forms/DeleteHall';
import AddShow from '../Forms/AddShow';
import DeleteShow from '../Forms/DeleteShow';

const ModalBody = (props) => {
  const {
    action,
    onAddShow: addShow,
    onAddHall: addHall,
    onAddMovie: addMovie,
    onClose: handleModal,
    itemToDelete,
    onDelete: handleDelete,
    halls,
  } = props;

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (action) {
      chooseModal();
    }
  }, [action]);

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
            halls={halls}
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
    <div className="popup__wrapper">
      {activeModal}
    </div>
  );
};

ModalBody.propTypes = {
  halls: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.string.isRequired,
  itemToDelete: PropTypes.string.isRequired,
  onAddShow: PropTypes.func.isRequired,
  onAddHall: PropTypes.func.isRequired,
  onAddMovie: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ModalBody;
