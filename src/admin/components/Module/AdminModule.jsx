/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/admin.module.css';

// Самая наружняя обертка модуля
function AdminModule({ children }) {
  return (
    <section className={styles['conf-step']}>
      {children}
    </section>
  );
}

AdminModule.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AdminModule;
