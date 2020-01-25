/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// Импорт nanoid для создания уникальных id
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import Header from '../../../shared-components/Header';
import Main from '../../../shared-components/Main';
import Payment from './Payment';
import Order from '../../models/Order';
import '../../css/client.css';

// Главная для оплаты билета
// Здесь формируется заказ
// И подсчитывается цена заказа
const PaymentPage = ({ location }) => {
  const { params, state } = location;
  const {
    tickets, data, hallMap, email,
  } = params;

  const [order, setOrder] = useState({});
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    if (state && state.fromHallPage) {
      if (tickets.length !== 0) {
        createNewOrder();
        calcTotalPrice();
      }
    }
  }, []);

  const createNewOrder = () => {
    const newOrder = new Order({
      id: nanoid(),
      tickets,
    });
    setOrder(newOrder);
  };

  const calcTotalPrice = () => {
    const newTotalPrice = tickets.reduce((acc, cur) => acc + cur.price, 0);
    setTotalPrice(newTotalPrice);
  };

  return (
    <>
      {
        state && state.fromHallPage && tickets.length > 0 ? (
          <ClientUI>
            <Header />

            <Main>
              <Payment
                data={data}
                hallMap={hallMap}
                newOrder={order}
                totalPrice={totalPrice}
                tickets={tickets}
                email={email}
              />
            </Main>
          </ClientUI>
        ) : <Redirect />
      }
    </>
  );
};

// Опять куча проверок
PaymentPage.propTypes = {
  location: PropTypes.shape({
    params: PropTypes.shape({
      tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
      data: PropTypes.shape({
        hall: PropTypes.string.isRequired,
        movieName: PropTypes.string.isRequired,
        time: PropTypes.object.isRequired,
      }).isRequired,
      hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    }).isRequired,
    state: PropTypes.shape({
      fromHallPage: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PaymentPage;
