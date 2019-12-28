import React from 'react';
import PropTypes from 'prop-types';

function ClientMain({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}

ClientMain.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ClientMain;
