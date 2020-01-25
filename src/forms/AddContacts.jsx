/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_EMAIL = '';

// Форма добавления контактов,
// на которые нужно будет отправить
// сообщение о заказе билета
const AddContacts = (props) => {
  const {
    link,
    email,
    setEmail,
    onClose: handleClose,
  } = props;

  const [state, setstate] = useState('');

  const handleChange = (event) => {
    setstate(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setEmail(state);
  //   setstate(DEFAULT_EMAIL);
  //   handleClose();
  // };

  return (
    <form>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="email">
Введите данные для получения билета
        <input
          id="email"
          className="conf-step__input"
          type="email"
          placeholder="Электронная почта"
          name="email"
          value={state}
          onChange={handleChange}
          required
        />
      </label>
      <div className="conf-step__buttons text-center">
        {link}
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleClose}>Отмена</button>
      </div>
    </form>
  );
};

AddContacts.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddContacts;
