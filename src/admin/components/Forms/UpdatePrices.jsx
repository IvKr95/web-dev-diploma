/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModuleBtns from '../Module/ModuleBtns';

const DEFAULT_PRICES = {
  standardPrice: '',
  vipPrice: '',
};

const UpdatePrices = (props) => {
  const {
    activeHall,
    onSubmit: updatePrices,
  } = props;

  const [prices, setPrices] = useState(DEFAULT_PRICES);

  const handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setPrices(DEFAULT_PRICES);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePrices(prices);
    setPrices(DEFAULT_PRICES);
  };

  return (
    <>
      <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
      <form id="update_prices-form" onSubmit={handleSubmit}>
        <div className="conf-step__legend">
          <label className="conf-step__label" htmlFor="standardPrice">
Цена, рублей
            <input
              type="number"
              id="standardPrice"
              className="conf-step__input"
              name="standardPrice"
              placeholder={activeHall.standardPrice}
              value={prices.standardPrice}
              onChange={handleChange}
              required
            />
          </label>
за
          {' '}
          <span className="conf-step__chair conf-step__chair_standard" />
          {' '}
обычные кресла
        </div>
        <div className="conf-step__legend">
          <label className="conf-step__label" htmlFor="vipPrice">
Цена, рублей
            <input
              type="number"
              id="vipPrice"
              className="conf-step__input"
              name="vipPrice"
              placeholder={activeHall.vipPrice}
              value={prices.vipPrice}
              onChange={handleChange}
              required
            />
          </label>
за
          {' '}
          <span className="conf-step__chair conf-step__chair_vip" />
          {' '}
VIP кресла
        </div>
        <ModuleBtns form="update_prices-form" onReset={handleReset} />
      </form>
    </>
  );
};

UpdatePrices.propTypes = {
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
  onSubmit: PropTypes.func.isRequired,
};

export default UpdatePrices;
