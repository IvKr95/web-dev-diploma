/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

// Форма для задания разметки зала
function SetHallMapForm(props) {
  const {
    activeHall,
    onSubmit: update,
    hallMapParams,
    setHallMapParams,
  } = props;

  const handleChange = (event) => {
    const { value, name } = event.target;

    setHallMapParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <p className="conf-step__paragraph">
Укажите количество рядов и максимальное количество кресел в ряду:
      </p>
      <div className="conf-step__legend">
        <form id="set_hall-map" onSubmit={update}>
          <label className="conf-step__label" htmlFor="rows">
Рядов, шт
            <input
              type="number"
              id="rows"
              className="conf-step__input"
              name="rows"
              placeholder={activeHall.rows}
              value={hallMapParams.rows}
              onChange={handleChange}
              maxLength="20"
              required
            />
          </label>
          <span className="multiplier">x</span>
          <label className="conf-step__label" htmlFor="maxSeatsInRow">
Мест, шт
            <input
              type="number"
              id="maxSeatsInRow"
              className="conf-step__input"
              name="maxSeatsInRow"
              placeholder={activeHall.maxSeatsInRow}
              value={hallMapParams.maxSeatsInRow}
              onChange={handleChange}
              maxLength="20"
              required
            />
          </label>
        </form>
      </div>
    </>
  );
}

SetHallMapForm.propTypes = {
  // Объект активного зала
  activeHall: PropTypes.shape({
    hallName: PropTypes.string,
    hallSchema: PropTypes.string,
    hall_id: PropTypes.string,
    id: PropTypes.number,
    isOpen: PropTypes.string,
    maxSeatsInRow: PropTypes.number,
    rows: PropTypes.number,
    standardPrice: PropTypes.number,
    vipPrice: PropTypes.number,
  }).isRequired,
  // Параметры для задания разметки
  hallMapParams: PropTypes.shape({
    maxSeatsInRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setHallMapParams: PropTypes.func.isRequired,
};


export default SetHallMapForm;
