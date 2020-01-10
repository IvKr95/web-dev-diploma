import React from 'react';
import PropTypes from 'prop-types';

function MovieInfo({ movie }) {
  return (
    <div className="movie__info">
      <div className="movie__poster">
        <img className="movie__poster-image" src={movie.poster} alt={movie.name} />
      </div>
      <div className="movie__description">
        <h2 className="movie__title">{movie.name}</h2>
        <p className="movie__synopsis">{movie.synopsis}</p>
        <p className="movie__data">
          <span className="movie__data-duration">{movie.duration}</span>
          <span className="movie__data-origin">{movie.origin}</span>
        </p>
      </div>
    </div>
  );
}

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieInfo;
