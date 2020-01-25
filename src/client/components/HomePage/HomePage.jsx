/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import ClientUI from '../ClientUI';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import Header from '../../../shared-components/Header';
import Main from '../../../shared-components/Main';
import Nav from '../../../shared-components/Nav';

import MovieList from './MovieList';
import Movie from './Movie';
import withCrud from '../../../hoc/WithCrud';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import DateContext from '../../../contexts/DateContext';
import '../../css/client.css';

// Главная страница приложения
// Принимает загрузочные экран
// Контекст даты
// Содержит массив сеансов
const HomePage = (props) => {
  const { list, isLoading, setIsLoading } = props;
  const [shows, setShows] = useState([]);
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
        setShows(data);
        setIsLoading(false);
      },
    });
  };

  return (
    <ClientUI>
      <Header />
      <Nav />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Main>
          {shows.length > 0 && (
            <MovieList>
              {shows.map((show) => <Movie key={`${chosen}_${show.movieName}`} show={show} />)}
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
