import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MovieInfo from './MovieInfo';
import MovieSeances from './MovieSeances';
import withCrud from '../../../hoc/WithCrud';

const Movie = (props) => {
  const { show, get } = props;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getMovieByName',
        table: 'movies',
        param: show.movie,
      },
      parsify: false,
    }, setMovie);
  }, []);

  return (
    <section className="movie">
      <MovieInfo movie={movie} />
      <MovieSeances
        shows={show.shows}
        movieName={movie.name}
        movieId={movie.movieId}
      />
    </section>
  );
};

Movie.propTypes = {

};

export default withCrud(Movie);
