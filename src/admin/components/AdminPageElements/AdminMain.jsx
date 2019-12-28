import React from 'react';
import PropTypes from 'prop-types';

function AdminMain({ children }) {
  return (
    <main className="conf-steps">
      {children}
    </main>
  );
}

AdminMain.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AdminMain;
