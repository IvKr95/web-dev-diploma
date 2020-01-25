/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Отображает сеансы
// Переводит на конкретный сеанс при клике по нему
const MovieSeances = (props) => {
  const {
    seances,
    movieName,
    movieId,
  } = props;

  return (
    <>
      {seances.map((seance) => (
        <div key={seance[0]} className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">{seance[0]}</h3>
          <ul className="movie-seances__list">
            {seance[1].map((t) => (
              <li key={t.showId} className="movie-seances__time-block">
                <Link
                  className="movie-seances__time"
                  to={{
                    pathname: '/hall',
                    params: {
                      movieName,
                      movieId,
                      hall: seance[0],
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
  seances: PropTypes.arrayOf(
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
