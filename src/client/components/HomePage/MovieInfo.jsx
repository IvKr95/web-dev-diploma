/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/HomePage.module.css';

// Содержит описание фильма
function MovieInfo({ movie }) {
  const {
    poster,
    name,
    synopsis,
    duration,
    origin,
  } = movie;

  const handleClick = (event) => {
    event.target.parentNode.textContent = synopsis;
  };

  return (
    <div className={styles.movie__info}>
      <div className={styles.movie__poster}>
        <img className={styles['movie__poster-image']} src={poster} alt={name} />
      </div>
      <div className={styles.movie__description}>
        <h2 className={styles.movie__title}>{name}</h2>
        <p className={styles.movie__synopsis}>
          {synopsis && synopsis.substring(0, 210)}
          {synopsis && synopsis.length > 210 && (
          <span
            className={styles.ellipsis}
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
          >
...
          </span>
          )}
        </p>
        <p className={styles.movie__data}>
          <span className={styles['movie__data-duration']}>{duration}</span>
          {' '}
          <span className={styles['movie__data-origin']}>{origin}</span>
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

MovieInfo.defaultProps = {
};

export default MovieInfo;
