/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import handleDragEnter from '../../js/handleDragEnter';
import handleDragLeave from '../../js/handleDragLeave';
import handleDragOver from '../../js/handleDragOver';
import ModuleShow from './ModuleShow';


function ModuleHall(props) {
  const {
    hall,
    shows,
    onDrop: handleDrop,
    onClick: handleModal,
  } = props;
  const { hallName } = hall;

  return (
    <div className="conf-step__seances-hall" key={hallName}>
      <h3 className="conf-step__seances-title">{hallName}</h3>
      <div
        className="conf-step__seances-timeline"
        data-action="addShowTime"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {
          shows.map((show) => <ModuleShow show={show} hallName={hallName} onClick={handleModal} />)
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
