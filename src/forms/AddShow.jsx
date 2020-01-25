/* eslint-disable linebreak-style */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import DragContext from '../contexts/DragContext';
import DateContext from '../contexts/DateContext';

const DEFAULT_SHOW_DATA = {
  hall: '',
  date: '',
  startTime: '',
  name: '',
};

// Форма добавления сеанса
const AddShowForm = (props) => {
  const {
    shows,
    onAddShow: addShow,
    onClose: handleModal,
  } = props;

  const [showData, setShowData] = useState(DEFAULT_SHOW_DATA);
  const {
    dragging, droppedIn, setDragging, setDroppedIn,
  } = useContext(DragContext);
  const { chosen } = useContext(DateContext);

  useEffect(() => {
    setShowData({
      hall: droppedIn,
      date: chosen,
      startTime: '',
      name: dragging,
    });
  }, [dragging, droppedIn, chosen]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setShowData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = shows.find(
      (show) => show.date === showData.date
                  && show.hall === showData.hall
                    && show.time === showData.startTime,
    );

    if (result) {
      console.log('Это время в этом зале на эту дату уже занято!');
    } else {
      addShow(showData);
      setDragging('');
      setDroppedIn('');
      setShowData(DEFAULT_SHOW_DATA);
      handleModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="hall">
Название зала
        <input
          id="hall"
          className="conf-step__input"
          type="text"
          name="hall"
          value={showData.hall}
          disabled
        />
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="date">
Дата сеанса
        <input
          id="date"
          className="conf-step__input"
          type="text"
          name="date"
          value={showData.date}
          disabled
        />
      </label>

      <label className="conf-step__label conf-step__label-fullsize" htmlFor="time">
Время начала
        <input
          id="time"
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
          id="name"
          className="conf-step__input"
          type="text"
          name="name"
          value={showData.name}
          disabled
        />
      </label>

      <div className="conf-step__buttons text-center">
        <input type="submit" value="Добавить сеанс" className="conf-step__button conf-step__button-accent" />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleModal}>Отменить</button>
      </div>
    </form>
  );
};

AddShowForm.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddShow: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddShowForm;
