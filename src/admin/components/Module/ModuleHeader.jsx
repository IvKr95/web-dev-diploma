/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/admin.module.css';

const HEADER_OPEN = `${styles['conf-step__header']} ${styles['conf-step__header_opened']}`;
const HEADER_CLOSED = `${styles['conf-step__header']} ${styles['conf-step__header_closed']}`;

// Показывает хэдер модуля
function ModuleHeader(props) {
  const {
    header,
    onClick: handleHeader,
  } = props;

  return (
    <header
      // В зависимости открыт он или нет добавляем соответствующий класс
      className={
        header.isOpen ? HEADER_OPEN : HEADER_CLOSED
      }
      onClick={handleHeader}
      onKeyPress={handleHeader}
      role="tab"
      data-name={header.name}
      tabIndex={0}
    >
      <h2 className={styles['conf-step__title']}>{header.name}</h2>
    </header>
  );
}

ModuleHeader.propTypes = {
  header: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ModuleHeader;
