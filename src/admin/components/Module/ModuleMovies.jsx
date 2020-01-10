/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import handleDragStart from '../../js/handleDragStart';
import handleDragEnd from '../../js/handleDragEnd';

function ModuleMovies({ movies }) {
  return (
    <div className="conf-step__movies">
      {movies.map(
        (movie) => {
          const {
            movieId, poster, name, duration,
          } = movie;

          return (
            <div
              className="conf-step__movie"
              key={movieId}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <img className="conf-step__movie-poster" alt="poster" src={poster} draggable="false" />
              <h3 className="conf-step__movie-title">{name}</h3>
              <p className="conf-step__movie-duration">{duration}</p>
            </div>
          );
        },
      )}
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
