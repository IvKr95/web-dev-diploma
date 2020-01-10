/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

function AdminModule({ children }) {
  return (
    <section className="conf-step">
      {children}
    </section>
  );
}

AdminModule.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AdminModule;
