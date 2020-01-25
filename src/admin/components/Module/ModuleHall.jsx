/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import handleDragEnter from '../../js/handleDragEnter';
import handleDragLeave from '../../js/handleDragLeave';
import handleDragOver from '../../js/handleDragOver';
import ModuleShow from './ModuleShow';

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

  return (
    <div className="conf-step__seances-hall">
      <h3 className="conf-step__seances-title">{hallName}</h3>
      <div
        className="conf-step__seances-timeline"
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
