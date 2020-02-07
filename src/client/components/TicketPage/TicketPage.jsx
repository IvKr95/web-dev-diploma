/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import Header from '../../../shared-components/Header/Header';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import Main from '../../../shared-components/Main/Main';
import Ticket from './Ticket';
import DateContext from '../../../contexts/DateContext';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import withCrud from '../../../hoc/WithCrud';
import Order from '../../models/Order';
import updateHallMap from '../../js/updateHallMap';

// Главная для страницы билета
// Принимает функции для работы с сервером
// Также принимает загрузочное окно
const TicketPage = (props) => {
  const {
    add,
    update,
    location,
    isLoading,
    setIsLoading,
  } = props;
  const { state } = location;

  const [qr, setQr] = useState('');
  const { chosen } = useContext(DateContext);

  useEffect(() => {
    // Если переход со страницы оплаты,то
    // Добавляем заказ
    if (state && state.fromDisplayPayment) {
      const { data, newOrder, hallMap } = state;
      addOrder(data, newOrder, hallMap);
    }
  }, []);

  const updateHall = (id, map) => {
    update({
      url: `${process.env.REACT_APP_INDEX_URL}/${id}`,
      body: {
        action: 'updateHall',
        table: 'shows',
        data: JSON.stringify(updateHallMap(map)),
      },
    });
  };

  const addOrder = (data, order, hallMap) => {
    const dataToSend = {
      date: chosen,
      hall: data.hall,
      movieName: data.movieName,
      time: data.time.time,
      orderId: order.id,
      tickets: JSON.stringify(order.tickets),
    };

    setIsLoading(true);
    add({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'addOrder',
        table: 'orders',
        data: JSON.stringify(dataToSend),
      },
      callback(src) {
        updateHall(data.time.showId, hallMap);
        setQr(src);
        setIsLoading(false);
      },
      responseType: 'blob',
    });
  };

  return (
    <>
      {
        // Если со страницы оплаты заказа то показываем разметку,
        // в противном случае возвращаем на главную?
        state && state.fromDisplayPayment ? (
          <ClientUI>
            <Header />
            <Main>
              {isLoading
                ? <LoadingScreen />
                : (
                  <Ticket
                    data={state.data}
                    tickets={state.tickets}
                    orderId={state.newOrder.id}
                    qr={qr}
                  />
                )}
            </Main>
          </ClientUI>
        ) : <Redirect to="/" />
      }
    </>
  );
};

// Куча проверок пропсов
// Нужно ли?
TicketPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      fromDisplayPayment: PropTypes.bool.isRequired,
      data: PropTypes.shape({
        hall: PropTypes.string.isRequired,
        movieName: PropTypes.string.isRequired,
        time: PropTypes.shape({
          showId: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
      newOrder: PropTypes.instanceOf(Order).isRequired,
      hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    }).isRequired,
  }).isRequired,
  add: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

// Оборачиваем в два HOC
// Один дает функции для работы с сервером
// Другой загрузочный экран
export default withCrud(withLoadingScreen(TicketPage));
