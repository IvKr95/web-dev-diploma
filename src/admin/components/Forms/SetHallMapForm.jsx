import React from 'react';
import PropTypes from 'prop-types';

function SetHallMapForm(props) {
  const {
    activeHall, onSubmit: update, hallMapParams, setHallMapParams,
  } = props;

  const handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

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
              type="text"
              id="rows"
              className="conf-step__input"
              name="rows"
              placeholder={activeHall.rows}
              value={hallMapParams.rows}
              onChange={handleChange}
              required
            />
          </label>
          <span className="multiplier">x</span>
          <label className="conf-step__label" htmlFor="maxSeatsInRow">
            Мест, шт
            <input
              type="text"
              id="maxSeatsInRow"
              className="conf-step__input"
              name="maxSeatsInRow"
              placeholder={activeHall.maxSeatsInRow}
              value={hallMapParams.maxSeatsInRow}
              onChange={handleChange}
              required
            />
          </label>
        </form>
      </div>
    </>
  );
}

SetHallMapForm.propTypes = {
  activeHall: PropTypes.object.isRequired,
  hallMapParams: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setHallMapParams: PropTypes.func.isRequired,
};


export default SetHallMapForm;
