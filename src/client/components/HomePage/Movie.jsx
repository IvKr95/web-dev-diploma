/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MovieInfo from './MovieInfo';
import MovieSeances from './MovieSeances';
import withCrud from '../../../hoc/WithCrud';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import styles from './css/HomePage.module.css';

// Для каждого фильма свой
// Совершает запросы чтобы получить информацию о фильме
// Есть загрузочный экран
const Movie = (props) => {
  const {
    movieShows,
    get,
    isLoading,
    setIsLoading,
  } = props;
  const [movie, setMovie] = useState({});
  const [shows, setShows] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMovie();
    setNewSeanses();
  }, []);

  const getMovie = () => {
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getMovieByName',
        table: 'movies',
        param: movieShows.movieName,
      },
      parsify: false,
      callback(data) {
        setMovie(data);
        setIsLoading(false);
      },
    });
  };

  const setNewSeanses = () => {
    const newShows = Object.entries(movieShows.shows);
    setShows(newShows);
  };

  return (
    <>
      <section className={styles.movie}>
        {isLoading && <LoadingScreen />}
        <MovieInfo movie={movie} />
        <MovieSeances
          shows={shows}
          movieName={movie.name}
          movieId={movie.movieId}
        />
      </section>
    </>
  );
};

Movie.propTypes = {
  movieShows: PropTypes.shape({
    movieName: PropTypes.string.isRequired,
    shows: PropTypes.object.isRequired,
  }).isRequired,
  get: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

// Оборачиваем в два HOC
// Один дает функции для работы с сервером
// Другой загрузочный экран
export default withCrud(withLoadingScreen(Movie));
