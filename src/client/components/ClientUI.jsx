import React from 'react';
import PropTypes from 'prop-types';
import '../css/client.css';

function ClientUI(props) {
  const { children } = props;

  return (
    <div className="client-ui">
      {children}
    </div>
  );
}

ClientUI.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ClientUI;
