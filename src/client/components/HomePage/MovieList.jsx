/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

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
