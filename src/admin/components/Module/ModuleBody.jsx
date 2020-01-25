/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

const CENTERED = 'conf-step__wrapper text-center';
const NOT_CENTERED = 'conf-step__wrapper';

// Обертка для тела модуля
// Также решаем должен ли текст разполагаться по центру
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
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isCentered: PropTypes.bool,
};

ModuleBody.defaultProps = {
  isCentered: false,
};

export default ModuleBody;
