import React from 'react';
import PropTypes from 'prop-types';

// Отображает отдельный ряд с местами
function HallMapRow({ children }) {
  return (
    <div className="buying-scheme__row" role="row">{children}</div>
  );
}

HallMapRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default HallMapRow;
