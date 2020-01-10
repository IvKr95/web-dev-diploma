import React from 'react';
import PropTypes from 'prop-types';

function AdminConfStep({ children }) {
  return (
    <section className="conf-step">
      {children}
    </section>
  );
}

AdminConfStep.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AdminConfStep;
