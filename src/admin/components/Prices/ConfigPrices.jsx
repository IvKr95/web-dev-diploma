import React from 'react';
import PropTypes from 'prop-types';

function ConfigPrices({ children }) {
  return <>{children}</>;
}

ConfigPrices.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ConfigPrices;
