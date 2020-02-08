/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/admin.module.css';

const SEAT_TYPES = ['standard', 'vip', 'disabled'];

// Показывает активную карту зала
// Также обновляет ее
function ActiveHallMap(props) {
  const {
    activeHallMap,
    setActiveHallMap,
    hallMapParams,
  } = props;
  const { maxSeatsInRow, rows } = hallMapParams;

  useEffect(() => {
    if (rows) {
      updateHallMap();
    }
  }, [maxSeatsInRow, rows]);

  const handleChangeSeatType = (prevSeat, rowIndex, seatIndex) => {
    let newSeatType;

    if (prevSeat === SEAT_TYPES[0]) {
      newSeatType = SEAT_TYPES[1];
    } else if (prevSeat === SEAT_TYPES[1]) {
      newSeatType = SEAT_TYPES[2];
    } else {
      newSeatType = SEAT_TYPES[0];
    }

    setActiveHallMap((prev) => {
      const hallMapCopy = [...prev];
      hallMapCopy[rowIndex][seatIndex] = newSeatType;
      return hallMapCopy;
    });
  };

  const updateHallMap = () => {
    const updatedHallMap = [];

    for (let row = 0; row < rows; row++) {
      updatedHallMap[row] = [];
      for (let seat = 0; seat < maxSeatsInRow; seat++) {
        updatedHallMap[row].push(SEAT_TYPES[0]);
      }
    }

    setActiveHallMap(updatedHallMap);
  };

  return (
    <div className={styles['conf-step__hall']}>
      <div className={styles['conf-step__hall-wrapper']}>
        {
          activeHallMap.map((row, rowIndex) => (
            <div
              className={styles['conf-step__row']}
              key={`row_${rowIndex}`}
              role="row"
            >
              {
                row.map((seat, seatIndex) => (
                  <span
                    key={`seat_${seatIndex}`}
                    className={`${styles['conf-step__chair']} ${styles[`conf-step__chair_${seat}`]}`}
                    onClick={() => handleChangeSeatType(seat, rowIndex, seatIndex)}
                    onKeyPress={() => handleChangeSeatType(seat, rowIndex, seatIndex)}
                    role="cell"
                  />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

ActiveHallMap.propTypes = {
  activeHallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setActiveHallMap: PropTypes.func.isRequired,
  hallMapParams: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ActiveHallMap;
