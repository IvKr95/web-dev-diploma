/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/admin.module.css';
import ModuleBtns from '../components/Module/ModuleBtns';

// Форма удаления зала
function DeleteHallForm(props) {
  const {
    hallName,
    onDelete: handleDelete,
    onClose: handleClose,
  } = props;

  return (
    <form id="delete-hall" onSubmit={handleDelete}>
      <p className={styles['conf-step__paragraph']}>
Вы действительно хотите удалить зал
        {' '}
        <span>{hallName}</span>
?
      </p>
      <ModuleBtns
        form="delete-hall"
        onReset={handleClose}
        action="Удалить зал"
        isInModal
      />
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
