/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

const CENTERED = 'conf-step__wrapper text-center';
const NOT_CENTERED = 'conf-step__wrapper';

function ModuleBody(props) {
  const {
    children,
    isCentered,
  } = props;

  return (
    <div className={isCentered ? CENTERED : NOT_CENTERED}>
      {children}
    </div>
  );
}

ModuleBody.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
  isCentered: PropTypes.bool,
};

ModuleBody.defaultProps = {
  isCentered: false,
};

export default ModuleBody;
