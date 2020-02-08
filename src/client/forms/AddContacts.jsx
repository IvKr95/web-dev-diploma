/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../admin/css/admin.module.css';

const DEFAULT_EMAIL = '';

// Форма добавления контактов,
// на которые нужно будет отправить
// сообщение о заказе билета
const AddContacts = ({ onAddEmail: addEmail }) => {
  const [email, setEmail] = useState(DEFAULT_EMAIL);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEmail(email);
    setEmail(DEFAULT_EMAIL);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="email">
        <h1>Введите адресс электронной почты для получения билета</h1>
        <input
          id="email"
          className={styles['conf-step__input']}
          type="email"
          placeholder="Электронная почта"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </label>
      <div className={`${styles['conf-step__buttons']} ${styles['text-center']}`}>
        <button type="submit" className={`${styles['conf-step__button']} ${styles['conf-step__button-regular']}`}>
          Отправить
        </button>
      </div>
    </form>
  );
};

AddContacts.propTypes = {
  onAddEmail: PropTypes.func.isRequired,
};

export default AddContacts;
