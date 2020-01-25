/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import Header from '../../../shared-components/Header';
import Main from '../../../shared-components/Main';
import Hall from './Hall';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import withCrud from '../../../hoc/WithCrud';
import HallInfo from './HallInfo';
import HallSchema from './HallSchema';
import HallSchemaLegend from './HallSchemaLegend';
import '../../css/client.css';

import Modal from '../../../shared-components/Modal/Modal';
import ModalBody from '../../../shared-components/Modal/ModalBody';
import ModalHeader from '../../../shared-components/Modal/ModalHeader';

const ACTIVE_BUTTON_CSS = {
  pointerEvents: 'auto',
  backgroundColor: '#16A6AF',
};

const INACTIVE_BUTTON_CSS = {
  pointerEvents: 'none',
  backgroundColor: 'grey',
};

const DEFAULT_EMAIL = '';

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
  const [isModalActive, setIsModalActive] = useState(false);
  // Этот адресс будет потом использоваться для отправки QR кода
  const [email, setEmail] = useState(DEFAULT_EMAIL);

  useEffect(() => {
    if (tickets.length > 0) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [tickets.length]);

  useEffect(() => {
    // Если переходим с домашней страницы то получаем данные
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

  const handleClick = () => {
    setIsModalActive(true);
  };

  const handleClose = () => {
    setIsModalActive(!isModalActive);
    // handleAction(event, item);
  };

  return (
    <>
      {/* Если модальное окно активно, то показываем его */}
      {/* Вот тут-то я и подвис */}
      {isModalActive && (
        <Modal isModalActive={isModalActive}>
          <ModalHeader action="Оформление заказа" onClose={handleClose} />
          <ModalBody
            email={email}
            setEmail={setEmail}
            action="addContacts"
            onClose={handleClose}
          >
            <Link
              className="acceptin-button"
              style={isButtonActive ? ACTIVE_BUTTON_CSS : INACTIVE_BUTTON_CSS}
              to={{
                pathname: '/payment',
                params: {
                  email,
                  tickets,
                  data: params,
                  hallMap,
                  setHallMap,
                },
                state: {
                  fromHallPage: true,
                },
              }}
              role="button"
            >
Далее
            </Link>
          </ModalBody>
        </Modal>
      )}
      {
        // Если переходим с домашней, то отображаем страницу
        state && state.fromHomePage
          ? (
            <ClientUI>
              <Header />
              <Main>
                {isLoading && <LoadingScreen />}

                <Hall
                  hallMap={hallMap}
                  setHallMap={setHallMap}
                >
                  <HallInfo data={params} />
                  <HallSchema
                    hallMap={hallMap}
                    setHallMap={setHallMap}
                    hall={hall}
                    setTickets={setTickets}
                  >
                    <HallSchemaLegend hall={hall} />
                  </HallSchema>
                  <button
                    type="button"
                    className="acceptin-button"
                    style={isButtonActive ? ACTIVE_BUTTON_CSS : INACTIVE_BUTTON_CSS}
                    onClick={handleClick}
                  >
Забронировать
                  </button>
                </Hall>
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
