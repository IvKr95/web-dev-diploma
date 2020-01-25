/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import Hall from '../admin/models/Hall';

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
    <form onSubmit={handleSubmit}>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
Название зала
        <input
          id="name"
          className="conf-step__input"
          type="text"
          placeholder="Например, &laquo;Зал 1&raquo;"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <div className="conf-step__buttons text-center">
        <input type="submit" value="Добавить зал" className="conf-step__button conf-step__button-accent" />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleClose}>Отменить</button>
      </div>
    </form>
  );
};

AddHallForm.propTypes = {
  onAddHall: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddHallForm;
