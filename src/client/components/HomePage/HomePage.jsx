/* eslint-disable linebreak-style */
import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import ClientUI from '../ClientUI';
import ClientHeader from '../../../shared-components/Header';
import ClientMain from '../../../shared-components/Main';
import ClientNav from '../../../shared-components/Nav';

import MovieList from './MovieList';
import Movie from './Movie';
import withCrud from '../../../hoc/WithCrud';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import DateContext from '../../../contexts/DateContext';
import '../../css/client.css';

const HomePage = (props) => {
  const { list, isLoading, setIsLoading } = props;
  const [shows, setShows] = useState([]);
  const { chosen } = useContext(DateContext);

  useEffect(() => {
    setIsLoading(true);
    list({
      url: process.env.REACT_APP_INDEX_URL,
      params: {
        action: 'getShowsByDate',
        table: 'shows',
        param: chosen,
      },
      callback: (data) => {
        setShows(data);
        setIsLoading(false);
      },
    });
  }, [chosen]);

  return (
    <ClientUI>
      <ClientHeader />

      <ClientNav />

      {isLoading ? (
        <div className="loading">
          <div className="loader" />
        </div>
      ) : (
        <ClientMain>
          <MovieList>
            {shows.map((show) => <Movie key={`${chosen}_${show.movie}`} show={show} />)}
          </MovieList>
        </ClientMain>
      )}
    </ClientUI>
  );
};

HomePage.propTypes = {
  list: PropTypes.func.isRequired,
};

export default withCrud(withLoadingScreen(HomePage));
