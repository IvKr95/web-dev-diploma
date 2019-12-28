import React from 'react';
import PropTypes from 'prop-types';

function ConfigHalls({ children }) {
  return <>{children}</>;
}

ConfigHalls.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ConfigHalls;
