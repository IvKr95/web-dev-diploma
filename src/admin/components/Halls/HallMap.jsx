/* eslint-disable linebreak-style */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ActiveHallMap from './ActiveHallMap';
import SetHallMap from '../../../forms/SetHallMap';
import ConfStepLegend from '../Module/ModuleLegend';
import ModuleBtns from '../Module/ModuleBtns';

const DEFAULT_HALL_MAP_PARAMS = {
  rows: '',
  maxSeatsInRow: '',
};

// Показывает карту зала
// Обновляет активный зал
// Есть форма для обновления зала
const HallMap = (props) => {
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

  const update = (event) => {
    event.preventDefault();

    updateHall(hallMapParams);
    setHallMapParams(DEFAULT_HALL_MAP_PARAMS);
  };

  return (
    <>
      <SetHallMap
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
      <ModuleBtns form="set_hall-map" onReset={handleReset} />
    </>
  );
};

HallMap.propTypes = {
  activeHall: PropTypes.object.isRequired,
  activeHallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setActiveHallMap: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default HallMap;
