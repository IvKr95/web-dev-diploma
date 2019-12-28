import React from 'react';
import PropTypes from 'prop-types';

function ConfigShows({ children }) {
  return <>{children}</>;
}

ConfigShows.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ConfigShows;
