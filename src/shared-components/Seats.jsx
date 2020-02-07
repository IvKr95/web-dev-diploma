import React from 'react';
import PropTypes from 'prop-types';
import styles from '../client/components/PaymentPage/css/PaymentPage.module.css';
// Отображаем выбранные места в зале
function Seats({ row, seat }) {
  return (
    <>
Ряд:
      {' '}
      <span className={`${styles.ticket__details} ${styles.ticket__chairs}`}>{row}</span>
Место:
      {' '}
      <span className={`${styles.ticket__details} ${styles.ticket__chairs}`}>{seat}</span>
    </>
  );
}

Seats.propTypes = {
  // Выбранный ряд
  row: PropTypes.number,
  // Выбранное место
  seat: PropTypes.number,
};

Seats.defaultProps = {
  row: 0,
  seat: 0,
};

export default Seats;
