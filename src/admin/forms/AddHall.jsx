/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import Hall from '../models/Hall';
import styles from '../css/admin.module.css';
import ModuleBtns from '../components/Module/ModuleBtns';

const DEFAULT_HALL_NAME = '';

// Форма добавления зала
const AddHallForm = (props) => {
  const {
    onAddHall: addHall,
    onClose: handleClose,
  } = props;

  const [name, setName] = useState(DEFAULT_HALL_NAME);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hall = new Hall(nanoid(), name);
    addHall(hall);
    setName(DEFAULT_HALL_NAME);
    handleClose();
  };

  return (
    <form id="add-hall" onSubmit={handleSubmit}>
      <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="name">
Название зала
        <input
          id="name"
          className={styles['conf-step__input']}
          type="text"
          placeholder="Например, &laquo;Зал 1&raquo;"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <ModuleBtns
        form="add-hall"
        onReset={handleClose}
        action="Добавить зал"
        isInModal
      />
    </form>
  );
};

AddHallForm.propTypes = {
  onAddHall: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddHallForm;
