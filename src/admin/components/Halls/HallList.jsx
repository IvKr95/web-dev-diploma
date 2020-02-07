/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Hall from './Hall';
import styles from '../../css/admin.module.css';

// Показывает доступные залы
// А также кнопку для создания нового зала
function HallList(props) {
  const {
    halls,
    handleModal,
  } = props;

  return (
    <>
      <p className={styles['conf-step__paragraph']}>Доступные залы:</p>
      <ul className={styles['conf-step__list']}>
        {halls.map((hall) => (
          <Hall
            key={hall.hallName}
            hallName={hall.hallName}
            onDelete={handleModal}
          />
        ))}
      </ul>
      <button
        type="button"
        className={`${styles['conf-step__button']} ${styles['conf-step__button-accent']}`}
        data-action="addHall"
        onClick={handleModal}
      >
Создать зал
      </button>
    </>
  );
}

HallList.propTypes = {
  halls: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default HallList;
