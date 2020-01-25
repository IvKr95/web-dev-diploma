/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import ModuleMovie from './ModuleMovie';

// Отображает все фильмы
function ModuleMovies({ movies }) {
  return (
    <div className="conf-step__movies">
      {movies.map((movie) => <ModuleMovie key={movie.movieId} movie={movie} />)}
    </div>
  );
}

ModuleMovies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

ModuleMovies.defaultProps = {
  movies: [],
};

export default ModuleMovies;
