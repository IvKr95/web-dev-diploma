/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

// Форма удаления зала
function DeleteHallForm(props) {
  const {
    hallName,
    onDelete: handleDelete,
    onClose: handleModal,
  } = props;

  return (
    <form onSubmit={handleDelete}>
      <p className="conf-step__paragraph">
Вы действительно хотите удалить зал
        {' '}
        <span>{hallName}</span>
?
      </p>
      <div className="conf-step__buttons text-center">
        <input type="submit" value="Удалить зал" className="conf-step__button conf-step__button-accent" />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleModal}>Отменить</button>
      </div>
    </form>
  );
}

DeleteHallForm.propTypes = {
  // Имя зала
  hallName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteHallForm;
