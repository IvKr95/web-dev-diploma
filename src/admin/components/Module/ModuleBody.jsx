/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/admin.module.css';

const CENTERED = `${styles['conf-step__wrapper']} ${styles['text-center']}`;
const NOT_CENTERED = styles['conf-step__wrapper'];

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
