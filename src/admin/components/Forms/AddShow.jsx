/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SHOW_DATA = {
  hall: '',
  date: '',
  startTime: '',
  name: '',
};

const AddShowForm = (props) => {
  const {
    halls,
    onAddShow: addShow,
    onClose: handleModal,
  } = props;

  const [showData, setShowData] = useState(DEFAULT_SHOW_DATA);

  const handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    setShowData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addShow(showData);
    setShowData(DEFAULT_SHOW_DATA);
    handleModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="hall">
Название зала
        <select
          className="conf-step__input"
          name="hall"
          value={showData.hall}
          onChange={handleChange}
          required
        >
          {halls.map((h) => <option key={h.hallName}>{h.hallName}</option>)}
        </select>
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="date">
Дата сеанса
        <input
          className="conf-step__input"
          type="text"
          name="date"
          value={showData.date}
          onChange={handleChange}
          required
        />
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
Время начала
        <input
          className="conf-step__input"
          type="time"
          name="startTime"
          value={showData.startTime}
          onChange={handleChange}
          required
        />
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
Название фильма
        <input
          className="conf-step__input"
          type="text"
          name="name"
          placeholder="Например, &laquo;Название Фильма&raquo;"
          value={showData.name}
          onChange={handleChange}
          required
        />
      </label>

      <div className="conf-step__buttons text-center">
        <input type="submit" defaultValue="Добавить сеанс" className="conf-step__button conf-step__button-accent" />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleModal}>Отменить</button>
      </div>
    </form>
  );
};

AddShowForm.propTypes = {
  halls: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddShow: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddShowForm;
