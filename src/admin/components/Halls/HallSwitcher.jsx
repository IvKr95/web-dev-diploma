/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/admin.module.css';

// Здесь происходит переключение между залами
function HallSwitcher(props) {
  const {
    halls,
    activeHall,
    setActiveHall,
    setActiveHallMap,
  } = props;

  // Устанавливает выбранный зал и его разметку в состояния
  const handleChange = (hall = {}) => {
    setActiveHall(hall);
    setActiveHallMap(hall.hallSchema ? JSON.parse(hall.hallSchema) : []);
  };

  return (
    <>
      <p className={styles['conf-step__paragraph']}>Выберите зал для конфигурации:</p>
      <ul className={styles['conf-step__selectors-box']}>
        {halls.map((hall) => (
          <li key={hall.hallName}>
            <input
              type="radio"
              className={styles['conf-step__radio']}
              value={hall.hallName}
              checked={activeHall.hallName === hall.hallName}
              onChange={() => handleChange(hall)}
            />
            <span className={styles['conf-step__selector']}>{hall.hallName}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

HallSwitcher.propTypes = {
  halls: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeHall: PropTypes.object.isRequired,
  setActiveHall: PropTypes.func.isRequired,
  setActiveHallMap: PropTypes.func.isRequired,
};

export default HallSwitcher;
