/* eslint-disable linebreak-style */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ModuleHall from './ModuleHall';
import DragContext from '../../../contexts/DragContext';
import styles from '../../css/admin.module.css';

// Отображает сеансы
function ModuleSeances(props) {
  const {
    halls,
    shows,
    onClick: handleModal,
  } = props;

  // Используем контекст drag&drop
  // Устанавливаем элемент в который дропаем
  const { setDroppedIn } = useContext(DragContext);

  const handleDrop = (event, element) => {
    setDroppedIn(element);
    event.target.classList.remove(styles.hovered);
    handleModal(event, element);
  };

  return (
    <div className={styles['conf-step__seances']}>
      {
        halls.map(
          (hall) => (
            <ModuleHall
              key={hall.hallName}
              hall={hall}
              shows={shows}
              onDrop={handleDrop}
              onClick={handleModal}
            />
          ),
        )
      }
    </div>
  );
}

ModuleSeances.propTypes = {
  halls: PropTypes.arrayOf(PropTypes.object).isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ModuleSeances;
