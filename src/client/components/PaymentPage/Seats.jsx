import React from 'react';
import PropTypes from 'prop-types';

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

};

export default Seats;
