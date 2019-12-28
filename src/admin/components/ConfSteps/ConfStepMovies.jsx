import React from 'react';
import PropTypes from 'prop-types';
import handleDragStart from '../../js/handleDragStart';
import handleDragEnd from '../../js/handleDragEnd';

function ConfStepMovies({ movies }) {
  return (
    <div className="conf-step__movies">
      {movies.map(
        (movie) => (
          <div
            className="conf-step__movie"
            key={movie.movieId}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <img className="conf-step__movie-poster" alt="poster" src={movie.poster} draggable="false" />
            <h3 className="conf-step__movie-title">{movie.name}</h3>
            <p className="conf-step__movie-duration">{movie.duration}</p>
          </div>
        ),
      )}
    </div>
  );
}

ConfStepMovies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

ConfStepMovies.defaultProps = {
  movies: [],
};

export default ConfStepMovies;
