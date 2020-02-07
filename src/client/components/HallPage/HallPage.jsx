/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import Header from '../../../shared-components/Header/Header';
import Main from '../../../shared-components/Main/Main';
import Hall from './Hall';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import withCrud from '../../../hoc/WithCrud';

// Главный компонент для рута hall
// Получает загрузочное окно
// Также функцию для получения данных с сервера
const HallPage = (props) => {
  const {
    get,
    isLoading,
    setIsLoading,
    location,
  } = props;
  const { params, state } = location;
  // Объект зала
  const [hall, setHall] = useState({});
  // Массив массивов рядов с объектами кресел
  const [hallMap, setHallMap] = useState([]);
  // Сюда подгружаются выбранные места
  const [tickets, setTickets] = useState([]);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(tickets.length > 0);
  }, [tickets.length]);

  useEffect(() => {
    // Если переходим с домашней страницы, то получаем данные
    if (state && state.fromHomePage) {
      fetchHall();
      fetchShowData();
    }
  }, []);

  const fetchHall = () => {
    setIsLoading(true);
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getHallByName',
        table: 'halls',
        param: params.hall,
      },
      parsify: false,
      callback(newHall) {
        setIsLoading(false);
        setHall(newHall);
      },
    });
  };

  const fetchShowData = () => {
    setIsLoading(true);
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getHallMapByShowId',
        table: 'shows',
        param: params.time.showId,
      },
      parsify: true,
      callback(newHallMap) {
        setIsLoading(false);
        setHallMap(newHallMap);
      },
    });
  };

  return (
    <>
      {
        // Если переходим с домашней, то отображаем страницу
        state && state.fromHomePage
          ? (
            <ClientUI>
              <Header />
              <Main>
                {isLoading && <LoadingScreen />}
                <Hall
                  data={params}
                  hall={hall}
                  hallMap={hallMap}
                  setHallMap={setHallMap}
                  isButtonActive={isButtonActive}
                  tickets={tickets}
                  setTickets={setTickets}
                />
              </Main>
            </ClientUI>
            // Если нет, то переводим обратно на главную
          ) : <Redirect to="/" />
      }
    </>
  );
};

HallPage.propTypes = {
  get: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  location: PropTypes.shape({
    params: PropTypes.shape({
      hall: PropTypes.string.isRequired,
      movieId: PropTypes.string.isRequired,
      movieName: PropTypes.string.isRequired,
      time: PropTypes.shape({
        showId: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    state: PropTypes.shape({
      fromHomePage: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withCrud(withLoadingScreen(HallPage));
