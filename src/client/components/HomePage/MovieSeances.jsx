/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './css/HomePage.module.css';

// Отображает сеансы
// Переводит на конкретный сеанс при клике по нему
const MovieSeances = (props) => {
  const {
    shows,
    movieName,
    movieId,
  } = props;

  return (
    <>
      {shows.map((show) => (
        <div key={show[0]} className={styles['movie-seances__hall']}>
          <h3 className={styles['movie-seances__hall-title']}>{show[0]}</h3>
          <ul className={styles['movie-seances__list']}>
            {show[1].map((t) => (
              <li key={t.showId} className={styles['movie-seances__time-block']}>
                <Link
                  className={styles['movie-seances__time']}
                  to={{
                    pathname: '/hall',
                    params: {
                      movieName,
                      movieId,
                      hall: show[0],
                      time: t,
                    },
                    state: {
                      fromHomePage: true,
                    },
                  }}
                >
                  {t.time}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

MovieSeances.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  ).isRequired,
  movieName: PropTypes.string,
  movieId: PropTypes.string,
};

MovieSeances.defaultProps = {
  movieName: '',
  movieId: '',
};

export default MovieSeances;
