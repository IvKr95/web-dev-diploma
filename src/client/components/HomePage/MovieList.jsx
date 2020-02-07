/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/HomePage.module.css';

// Обертка для списка фильмов
function MovieList({ children }) {
  return (
    <div className={styles.movies}>
      {children}
    </div>
  );
}

MovieList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MovieList;
