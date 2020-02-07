import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/HallPage.module.css';

// Отображает информацию по залу
function HallInfo({ data }) {
  const { movieName, time, hall } = data;

  return (
    <div className={styles.buying__info}>
      <div className={styles['buying__info-description']}>
        <h2 className={styles['buying__info-title']}>{movieName}</h2>
        <p className={styles['buying__info-start']}>
Начало сеанса:
          {' '}
          {time.time}
        </p>
        <p className={styles['buying__info-hall']}>{hall}</p>
      </div>
      <div className={styles['buying__info-hint']}>
        <p>
Тапните дважды,
          <br />
чтобы увеличить
        </p>
      </div>
    </div>
  );
}

HallInfo.propTypes = {
  data: PropTypes.shape({
    movieName: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
    hall: PropTypes.string.isRequired,
  }).isRequired,
};

export default HallInfo;
