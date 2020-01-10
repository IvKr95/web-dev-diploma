import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SetHallMapForm from '../Forms/SetHallMapForm';
import ConfStepLegend from '../ConfSteps/ConfStepLegend';
import ActiveHallMap from './ActiveHallMap';
import ConfStepBtns from '../ConfSteps/ConfStepBtns';

const DEFAULT_HALL_MAP_PARAMS = {
  rows: '',
  maxSeatsInRow: '',
};

const SetHallMap = (props) => {
  const {
    activeHall,
    activeHallMap,
    setActiveHallMap,
    onSubmit: updateHall,
  } = props;

  const [hallMapParams, setHallMapParams] = useState(DEFAULT_HALL_MAP_PARAMS);

  const handleReset = () => {
    setHallMapParams(DEFAULT_HALL_MAP_PARAMS);
  };

  const update = (e) => {
    e.preventDefault();

    updateHall(hallMapParams);
    setHallMapParams(DEFAULT_HALL_MAP_PARAMS);
  };

  return (
    <>
      <SetHallMapForm
        activeHall={activeHall}
        onSubmit={update}
        hallMapParams={hallMapParams}
        setHallMapParams={setHallMapParams}
      />
      <ConfStepLegend />
      <ActiveHallMap
        activeHallMap={activeHallMap}
        setActiveHallMap={setActiveHallMap}
        hallMapParams={hallMapParams}
      />
      <ConfStepBtns form="set_hall-map" onReset={handleReset} />
    </>
  );
};

SetHallMap.propTypes = {
  activeHall: PropTypes.object.isRequired,
  activeHallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setActiveHallMap: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SetHallMap;
