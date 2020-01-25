/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

// Содержит описание фильма
function MovieInfo({ movie }) {
  const {
    poster, name, synopsis, duration, origin,
  } = movie;

  return (
    <div className="movie__info">
      <div className="movie__poster">
        <img className="movie__poster-image" src={poster} alt={name} />
      </div>
      <div className="movie__description">
        <h2 className="movie__title">{name}</h2>
        <p className="movie__synopsis">{synopsis}</p>
        <p className="movie__data">
          <span className="movie__data-duration">{duration}</span>
          {' '}
          <span className="movie__data-origin">{origin}</span>
        </p>
      </div>
    </div>
  );
}

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    poster: PropTypes.string,
    name: PropTypes.string,
    synopsis: PropTypes.string,
    duration: PropTypes.string,
    origin: PropTypes.string,
  }).isRequired,
};

export default MovieInfo;
