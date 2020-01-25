/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

// Показывает зал и кнопку для его удаления
function Hall(props) {
  const {
    hallName,
    onDelete: handleModal,
  } = props;

  return (
    <li>
      {hallName}
      <button
        type="button"
        className="conf-step__button conf-step__button-trash"
        data-action="deleteHall"
        onClick={(event) => handleModal(event, hallName)}
      />
    </li>
  );
}

Hall.propTypes = {
  hallName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Hall;
