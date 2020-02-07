/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/admin.module.css';
import ModuleBtns from '../components/Module/ModuleBtns';

const DEFAULT_PRICES = {
  standardPrice: '',
  vipPrice: '',
};

// Форма обновления цен
const UpdatePrices = (props) => {
  const {
    activeHall,
    onSubmit: updatePrices,
  } = props;

  const [prices, setPrices] = useState(DEFAULT_PRICES);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setPrices(DEFAULT_PRICES);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updatePrices(prices);
    handleReset();
  };

  return (
    <>
      <p className={styles['conf-step__paragraph']}>Установите цены для типов кресел:</p>
      <form id="update-prices-form" onSubmit={handleSubmit}>
        <div className={styles['conf-step__legend']}>
          <label className={styles['conf-step__label']} htmlFor="standardPrice">
Цена, рублей
            <input
              type="number"
              id="standardPrice"
              className={styles['conf-step__input']}
              name="standardPrice"
              placeholder={activeHall.standardPrice}
              value={prices.standardPrice}
              onChange={handleChange}
              required
            />
          </label>
за
          {' '}
          <span className={`${styles['conf-step__chair']} ${styles['conf-step__chair_standard']}`} />
          {' '}
обычные кресла
        </div>
        <div className={styles['conf-step__legend']}>
          <label className={styles['conf-step__label']} htmlFor="vipPrice">
Цена, рублей
            <input
              type="number"
              id="vipPrice"
              className={styles['conf-step__input']}
              name="vipPrice"
              placeholder={activeHall.vipPrice}
              value={prices.vipPrice}
              onChange={handleChange}
              required
            />
          </label>
за
          {' '}
          <span className={`${styles['conf-step__chair']} ${styles['conf-step__chair_vip']}`} />
          {' '}
VIP кресла
        </div>
        <ModuleBtns
          form="update-prices-form"
          onReset={handleReset}
          action="Обновить цены"
        />
      </form>
    </>
  );
};

UpdatePrices.propTypes = {
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
  onSubmit: PropTypes.func.isRequired,
};

export default UpdatePrices;
