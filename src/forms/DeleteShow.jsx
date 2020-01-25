/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

// Форма удаления сеанса
function DeleteShowForm(props) {
  const {
    movie,
    onDelete: handleDelete,
    onClose: handleModal,
  } = props;

  return (
    <form acceptCharset="utf-8" onSubmit={handleDelete}>
      <p className="conf-step__paragraph">
Вы действительно хотите снять с сеанса фильм
        {' '}
        <span>{movie}</span>
?
      </p>
      <div className="conf-step__buttons text-center">
        <input type="submit" value="Удалить сеанс" className="conf-step__button conf-step__button-accent" />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleModal}>Отменить</button>
      </div>
    </form>
  );
}

DeleteShowForm.propTypes = {
  // Название фильма
  movie: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteShowForm;