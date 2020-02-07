/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import ClientUI from '../ClientUI';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import Header from '../../../shared-components/Header/Header';
import Main from '../../../shared-components/Main/Main';
import Nav from '../../../shared-components/Nav/Nav';

import MovieList from './MovieList';
import Movie from './Movie';
import withCrud from '../../../hoc/WithCrud';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import DateContext from '../../../contexts/DateContext';

// Главная страница приложения
// Принимает загрузочные экран
// Контекст даты
// Содержит массив сеансов
const HomePage = (props) => {
  const { list, isLoading, setIsLoading } = props;
  const [allMoviesShows, setAllMoviesShows] = useState([]);
  const { chosen } = useContext(DateContext);

  useEffect(() => {
    setIsLoading(true);
    getShows();
  }, [chosen]);

  const getShows = () => {
    list({
      url: process.env.REACT_APP_INDEX_URL,
      params: {
        action: 'getShowsByDate',
        table: 'shows',
        param: chosen,
      },
      callback(data) {
        setAllMoviesShows(data);
        setIsLoading(false);
      },
    });
  };

  return (
    <ClientUI>
      <Header />
      <Nav isHomePage />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Main>
          {allMoviesShows.length > 0 && (
          <MovieList>
            {allMoviesShows.map((movieShows) => <Movie key={`${chosen}_${movieShows.movieName}`} movieShows={movieShows} />)}
          </MovieList>
          )}
        </Main>
      )}
    </ClientUI>
  );
};

HomePage.propTypes = {
  list: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

// Оборачиваем в два HOC
// Один дает функции для работы с сервером
// Другой загрузочный экран
export default withCrud(withLoadingScreen(HomePage));
