/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

// Отображает одно место в ряду
function HallMapSeat(props) {
  const {
    seat, onClick: handleClick, nRow, nSeat,
  } = props;

  // Если кресло занято или недоступно
  // то отображает как недоступное кресло
  // Отсутствуют обработчики
  if (seat.isTaken || !seat.isAvail) {
    return (
      <span
        className={`buying-scheme__chair buying-scheme__chair_${seat.type} buying-scheme__chair_taken`}
        role="cell"
      />
    );
  }
  // Если кресло свободно и доступно
  return (
    <span
      className={`buying-scheme__chair buying-scheme__chair_${seat.type} ${seat.isSelected ? 'buying-scheme__chair_selected' : ''}`}
      onClick={() => handleClick(nRow, nSeat, seat)}
      onKeyPress={() => handleClick(nRow, nSeat, seat)}
      role="cell"
    />
  );
}

HallMapSeat.propTypes = {
  seat: PropTypes.shape({
    isTaken: PropTypes.bool.isRequired,
    isAvail: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  nRow: PropTypes.number,
  nSeat: PropTypes.number,
};

HallMapSeat.defaultProps = {
  nRow: 0,
  nSeat: 0,
};

export default HallMapSeat;
