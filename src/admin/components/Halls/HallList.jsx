/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Hall from './Hall';

function HallList(props) {
  const {
    halls,
    handleModal,
  } = props;

  return (
    <>
      <p className="conf-step__paragraph">Доступные залы:</p>
      <ul className="conf-step__list">
        {halls.map((hall) => (
          <Hall key={hall.hallName} hallName={hall.hallName} onDelete={handleModal} />
        ))}
      </ul>
      <button
        type="button"
        className="conf-step__button conf-step__button-accent"
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
