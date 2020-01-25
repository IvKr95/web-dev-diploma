/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

// Обертка для списка фильмов
function MovieList({ children }) {
  return (
    <div className="movies">
      {children}
    </div>
  );
}

MovieList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MovieList;
