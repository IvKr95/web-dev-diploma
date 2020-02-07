import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/HallPage.module.css';

// Отображает отдельный ряд с местами
function HallMapRow({ children }) {
  return (
    <div className={styles['buying-scheme__row']} role="row">{children}</div>
  );
}

HallMapRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default HallMapRow;
