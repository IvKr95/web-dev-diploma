import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import ClientUI from '../ClientUI';
import ClientHeader from '../ClientHeader';
import ClientMain from '../ClientMain';
import ClientNav from '../ClientNav';

import MovieList from './MovieList';
import Movie from './Movie';
import withCrud from '../../../hoc/WithCrud';
import DateContext from '../../../contexts/DateContext';
import '../../css/client.css';

const HomePage = (props) => {
  const { list, setChosen } = props;
  const [shows, setShows] = useState([]);
  const context = useContext(DateContext);

  useEffect(() => {
    list({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getShowsByDate',
        table: 'shows',
        param: context,
      },
      callback: (data) => {
        setShows(data);
      },
    });
  }, [context]);

  return (
    <ClientUI>
      <ClientHeader />

      <ClientNav setChosen={setChosen} />

      <ClientMain>
        <MovieList>
          {shows.map((show) => <Movie key={`${context}_${show.movie}`} show={show} />)}
        </MovieList>
      </ClientMain>
    </ClientUI>
  );
};

HomePage.propTypes = {
  list: PropTypes.func.isRequired,
  setChosen: PropTypes.func.isRequired,
};

export default withCrud(HomePage);
