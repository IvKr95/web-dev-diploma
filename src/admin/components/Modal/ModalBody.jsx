import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AddHallForm from '../Forms/AddHallForm';
import AddMovieForm from '../Forms/AddMovieForm';
import DeleteHallForm from '../Forms/DeleteHallForm';
import AddShowForm from '../Forms/AddShowForm';
import DeleteShowForm from '../Forms/DeleteShowForm';

const ModalBody = (props) => {
  const {
    action, onAddShow: addShow,
    onAddHall: addHall, onAddMovie: addMovie,
    onClose: handleModal, itemToDelete, onDelete: handleDelete,
    halls,
  } = props;

  const [modalToShow, setModalToShow] = useState(null);

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
          <AddHallForm
            onAddHall={addHall}
            onClose={handleModal}
          />
        );
        break;
      case 'deleteHall':
        newModal = (
          <DeleteHallForm
            hallName={itemToDelete}
            onDelete={handleDelete}
            onClose={handleModal}
          />
        );
        break;
      case 'addMovie':
        newModal = (
          <AddMovieForm
            onAddMovie={addMovie}
            onClose={handleModal}
          />
        );
        break;
      case 'addShowTime':
        newModal = (
          <AddShowForm
            halls={halls}
            onAddShow={addShow}
            onClose={handleModal}
          />
        );
        break;
      case 'deleteShowTime':
        newModal = (
          <DeleteShowForm
            show={itemToDelete}
            onDelete={handleDelete}
            onClose={handleModal}
          />
        );
        break;

      default:
        newModal = '';
        break;
    }

    setModalToShow(newModal);
  };

  return (
    <div className="popup__wrapper">
      {modalToShow}
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
