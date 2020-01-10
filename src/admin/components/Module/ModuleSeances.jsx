/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import ModuleHall from './ModuleHall';

function ModuleSeances(props) {
  const {
    halls,
    shows,
    onClick: handleModal,
  } = props;

  const handleDrop = (e) => {
    e.target.classList.remove('hold');
    handleModal(e);
  };

  return (
    <div className="conf-step__seances">
      {
        halls.map(
          (hall) => (
            <ModuleHall hall={hall} shows={shows} onDrop={handleDrop} onClick={handleModal} />
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
