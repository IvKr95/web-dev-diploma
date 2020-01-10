import React from 'react';
import PropTypes from 'prop-types';

function HallList(props) {
  const { halls, handleModal } = props;

  return (
    <>
      <p className="conf-step__paragraph">Доступные залы:</p>
      <ul className="conf-step__list">
        {halls.map((hall) => (
          <li key={hall.hallName}>
            {hall.hallName}
            <button
              type="button"
              className="conf-step__button conf-step__button-trash"
              data-action="deleteHall"
              onClick={(e) => handleModal(e, hall.hallName)}
            />
          </li>
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
