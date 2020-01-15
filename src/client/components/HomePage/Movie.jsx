/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MovieInfo from './MovieInfo';
import MovieSeances from './MovieSeances';
import withCrud from '../../../hoc/WithCrud';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import LoadingScreen from '../../../shared-components/LoadingScreen';

const Movie = (props) => {
  const {
    show, get, isLoading, setIsLoading,
  } = props;
  const [movie, setMovie] = useState({});
  const [seanses, setSeanses] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getMovieByName',
        table: 'movies',
        param: show.movieName,
      },
      parsify: false,
      callback(data) {
        setMovie(data);
        setIsLoading(false);
      },
    });
    setNewSeanses();
  }, []);

  const setNewSeanses = () => {
    const newSeanses = Object.entries(show.shows);
    setSeanses(newSeanses);
  };

  return (
    <>
      <section className="movie">
        {isLoading && <LoadingScreen />}
        <MovieInfo movie={movie} />
        <MovieSeances
          seanses={seanses}
          movieName={movie.name}
          movieId={movie.movieId}
        />
      </section>
    </>
  );
};

Movie.propTypes = {
  show: PropTypes.shape({
    movieName: PropTypes.string.isRequired,
    shows: PropTypes.object.isRequired,
  }).isRequired,
  get: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default withCrud(withLoadingScreen(Movie));
