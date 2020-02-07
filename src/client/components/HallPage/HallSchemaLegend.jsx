import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/HallPage.module.css';

// Легенда разметки зала
// Принимает объект зала
// Использует от туда цены для стандартных
// и вип кресел
function HallSchemaLegend({ hall }) {
  const { standardPrice, vipPrice } = hall;

  return (
    <div className={styles['buying-scheme__legend']}>
      <div className={styles.col}>
        <p className={styles['buying-scheme__legend-price']}>
          <span className={`${styles['buying-scheme__chair']} ${styles['buying-scheme__chair_standard']}`} />
Свободно (
          <span className={styles['buying-scheme__legend-value']}>{standardPrice}</span>
руб)
        </p>
        <p className={styles['buying-scheme__legend-price']}>
          <span className={`${styles['buying-scheme__chair']} ${styles['buying-scheme__chair_vip']}`} />
Свободно VIP (
          <span className={styles['buying-scheme__legend-value']}>{vipPrice}</span>
руб)
        </p>
      </div>
      <div className={styles.col}>
        <p className={styles['buying-scheme__legend-price']}>
          <span className={`${styles['buying-scheme__chair']} ${styles['buying-scheme__chair_taken']}`} />
          {' '}
Занято (Недоступно)
        </p>
        <p className={styles['buying-scheme__legend-price']}>
          <span className={`${styles['buying-scheme__chair']} ${styles['buying-scheme__chair_selected']}`} />
          {' '}
Выбрано
        </p>
      </div>
    </div>
  );
}

HallSchemaLegend.propTypes = {
  hall: PropTypes.shape({
    standardPrice: PropTypes.number,
    vipPrice: PropTypes.number,
  }).isRequired,
};

export default HallSchemaLegend;
