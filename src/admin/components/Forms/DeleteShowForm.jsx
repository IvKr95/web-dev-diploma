import React from 'react';
import PropTypes from 'prop-types';

function DeleteShowForm(props) {
  const {
    show, onDelete: handleDelete, onClose: handleModal,
  } = props;
  const movie = JSON.parse(show.movie);

  return (
    <form acceptCharset="utf-8" onSubmit={handleDelete}>
      <p className="conf-step__paragraph">
Вы действительно хотите снять с сеанса фильм
        {' '}
        <span>{movie.name}</span>
?
      </p>
      <div className="conf-step__buttons text-center">
        <input type="submit" defaultValue="Удалить сеанс" className="conf-step__button conf-step__button-accent" />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleModal}>Отменить</button>
      </div>
    </form>
  );
}

DeleteShowForm.propTypes = {
  show: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteShowForm;
