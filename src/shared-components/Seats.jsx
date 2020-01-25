import React from 'react';
import PropTypes from 'prop-types';

// Отображаем выбранные места в зале
function Seats({ row, seat }) {
  return (
    <>
Ряд:
      {' '}
      <span className="ticket__details ticket__chairs">{row}</span>
Место:
      {' '}
      <span className="ticket__details ticket__chairs">{seat}</span>
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
