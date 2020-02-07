/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/admin.module.css';

// Здесь открываем или закрываем зал для продаж
function OpenSales(props) {
  const {
    onOpen: openSales,
    title,
  } = props;

  return (
    <>
      <p className={styles['conf-step__paragraph']}>Всё готово, теперь можно:</p>
      <button
        type="button"
        className={`${styles['conf-step__button']} ${styles['conf-step__button-accent']}`}
        data-action="openSales"
        onClick={openSales}
      >
        {title}
      </button>
    </>
  );
}

OpenSales.propTypes = {
  onOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default OpenSales;
