import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import Hall from '../../models/Hall';

const DEFAULT_HALL_NAME = '';

const AddHallForm = (props) => {
  const { onAddHall: addHall, onClose: handleModal } = props;

  const [name, setName] = useState(DEFAULT_HALL_NAME);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hall = new Hall(nanoid(), name);
    addHall(hall);
    setName(DEFAULT_HALL_NAME);
    handleModal();
  };

  return (
    <form acceptCharset="utf-8" onSubmit={handleSubmit}>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
Название зала
        <input className="conf-step__input" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="name" value={name} onChange={handleChange} required />
      </label>
      <div className="conf-step__buttons text-center">
        <input type="submit" defaultValue="Добавить зал" className="conf-step__button conf-step__button-accent" />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleModal}>Отменить</button>
      </div>
    </form>
  );
};

AddHallForm.propTypes = {
  onAddHall: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddHallForm;
