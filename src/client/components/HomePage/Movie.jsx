/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MovieInfo from './MovieInfo';
import MovieSeances from './MovieSeances';
import withCrud from '../../../hoc/WithCrud';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';

const Movie = (props) => {
  const {
    show, get, isLoading, setIsLoading,
  } = props;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setIsLoading(true);
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getMovieByName',
        table: 'movies',
        param: show.movie,
      },
      parsify: false,
      callback() {
        setIsLoading(false);
      },
    }, setMovie);
  }, []);

  return (
    <>
      {isLoading ? (
        <section className="movie">
          <div className="loading">
            <div className="loader" />
          </div>
          <MovieInfo movie={movie} />
          <MovieSeances
            shows={show.shows}
            movieName={movie.name}
            movieId={movie.movieId}
          />

        </section>
      ) : (
        <section className="movie">
          <MovieInfo movie={movie} />
          <MovieSeances
            shows={show.shows}
            movieName={movie.name}
            movieId={movie.movieId}
          />
        </section>
      )}
    </>
  );
};

Movie.propTypes = {

};

export default withCrud(withLoadingScreen(Movie));
