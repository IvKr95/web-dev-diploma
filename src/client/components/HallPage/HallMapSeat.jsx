/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

function HallMapSeat({
  seat, onClick: handleClick, r, s,
}) {
  if (seat.isTaken || !seat.isAvail) {
    return (
      <span
        className={`buying-scheme__chair buying-scheme__chair_${seat.type} buying-scheme__chair_taken`}
        role="cell"
      />
    );
  }
  return (
    <span
      className={`buying-scheme__chair buying-scheme__chair_${seat.type} ${seat.isSelected ? 'buying-scheme__chair_selected' : ''}`}
      onClick={() => handleClick(r, s, seat)}
      onKeyPress={() => handleClick(r, s, seat)}
      role="cell"
    />
  );
}

HallMapSeat.propTypes = {

};

export default HallMapSeat;
