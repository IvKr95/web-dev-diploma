/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/admin.module.css';
import ModuleBtns from '../components/Module/ModuleBtns';

// Форма удаления сеанса
function DeleteShowForm(props) {
  const {
    movie,
    onDelete: handleDelete,
    onClose: handleClose,
  } = props;

  return (
    <form id="delete-show" onSubmit={handleDelete}>
      <p className={styles['conf-step__paragraph']}>
Вы действительно хотите снять с сеанса фильм
        {' '}
        <span>{movie}</span>
?
      </p>
      <ModuleBtns
        form="delete-show"
        onReset={handleClose}
        action="Удалить сеанс"
        isInModal
      />
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
