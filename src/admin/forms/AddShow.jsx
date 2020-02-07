/* eslint-disable linebreak-style */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import DragContext from '../../contexts/DragContext';
import DateContext from '../../contexts/DateContext';
import styles from '../css/admin.module.css';
import ModuleBtns from '../components/Module/ModuleBtns';

const DEFAULT_SHOW_DATA = {
  hall: '',
  date: '',
  startTime: '',
  name: '',
};

function alreadyTakenTimeAlert() {
  return (
    <div
      className="already-taken"
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '300px',
        height: '200px',
      }}
    >
      <p>Это время в этом зале на эту дату уже занято!</p>
    </div>
  );
}

// Форма добавления сеанса
const AddShowForm = (props) => {
  const {
    shows,
    onAddShow: addShow,
    onClose: handleClose,
  } = props;

  const [showData, setShowData] = useState(DEFAULT_SHOW_DATA);
  const [error, setError] = useState(null);
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

    const isSameTime = shows.find(
      (show) => show.date === showData.date
      && show.hall === showData.hall
      && show.time === showData.startTime,
    );

    const isTooClose = shows.find((show) => {
      if (show.date === showData.date && show.hall === showData.hall) {
        const diff = parseInt(show.time) - parseInt(showData.startTime);
        return (diff < 2 && diff > -2);
      }
    });

    if (isSameTime) {
      setError('Это время в этом зале на эту дату уже занято!');
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else if (isTooClose) {
      setError('Выбранное время слишком близко к следующему/предыдущему сеансу!');
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      addShow(showData);
      setDragging('');
      setDroppedIn('');
      setShowData(DEFAULT_SHOW_DATA);
      handleClose();
    }
  };

  return (
    <>
      {error && (
        <div className="modal">
          <div className="modal__content">
            <p style={{ textAlign: 'center' }}>{error}</p>
          </div>
        </div>
      )}
      <form id="add-show" onSubmit={handleSubmit}>
        <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="hall">
Название зала
          <input
            id="hall"
            className={styles['conf-step__input']}
            type="text"
            name="hall"
            value={showData.hall}
            disabled
          />
        </label>

        <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="date">
Дата сеанса
          <input
            id="date"
            className={styles['conf-step__input']}
            type="text"
            name="date"
            value={showData.date}
            disabled
          />
        </label>

        <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="time">
Время начала
          <input
            id="time"
            className={styles['conf-step__input']}
            type="time"
            name="startTime"
            value={showData.startTime}
            onChange={handleChange}
            required
          />
        </label>

        <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="name">
Название фильма
          <input
            id="name"
            className={styles['conf-step__input']}
            type="text"
            name="name"
            value={showData.name}
            disabled
          />
        </label>

        <ModuleBtns
          form="add-show"
          onReset={handleClose}
          action="Добавить сеанс"
          isInModal
        />
      </form>
    </>
  );
};

AddShowForm.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddShow: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddShowForm;
