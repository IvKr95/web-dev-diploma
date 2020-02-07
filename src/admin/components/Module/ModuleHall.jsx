/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import ModuleShow from './ModuleShow';
import styles from '../../css/admin.module.css';

// Показывает зал с таймлайном
// И всеми шоу в этом таймлайне
function ModuleHall(props) {
  const {
    hall,
    shows,
    onDrop: handleDrop,
    onClick: handleModal,
  } = props;
  const { hallName } = hall;

  const handleDragEnter = (event) => {
    event.target.classList.add(styles.hovered);
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove(styles.hovered);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles['conf-step__seances-hall']}>
      <h3 className={styles['conf-step__seances-title']}>{hallName}</h3>
      <div
        className={styles['conf-step__seances-timeline']}
        data-action="addShowTime"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, hallName)}
      >
        {
          shows.map((show) => (
            <ModuleShow
              key={show.showId}
              show={show}
              hallName={hallName}
              onClick={handleModal}
            />
          ))
        }
      </div>
    </div>
  );
}

ModuleHall.propTypes = {
  hall: PropTypes.object.isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ModuleHall;
