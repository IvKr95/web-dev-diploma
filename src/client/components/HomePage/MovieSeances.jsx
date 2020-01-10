/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieSeances = (props) => {
  const {
    shows,
    movieName,
    movieId,
  } = props;
  const [showsList, setShowsList] = useState([]);

  useEffect(() => {
    if (shows) {
      setNewShows();
    }
  }, []);

  const setNewShows = () => {
    const newShows = Object.entries(shows);
    setShowsList(newShows);
  };

  return (
    <>
      {showsList.map((show) => (
        <div key={show[0]} className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">{show[0]}</h3>
          <ul className="movie-seances__list">
            {show[1].map((t) => (
              <li key={t.showId} className="movie-seances__time-block">
                <Link
                  className="movie-seances__time"
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
  shows: PropTypes.objectOf(PropTypes.array.isRequired).isRequired,
  movieName: PropTypes.string,
  movieId: PropTypes.string,
};

MovieSeances.defaultProps = {
  movieName: '',
  movieId: '',
};

export default MovieSeances;
