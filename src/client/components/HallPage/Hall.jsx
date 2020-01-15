/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

function Hall({ children }) {
  return <section className="buying">{children}</section>;
}

Hall.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Hall;
