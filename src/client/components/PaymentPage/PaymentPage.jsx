/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import Header from '../../../shared-components/Header';
import Main from '../../../shared-components/Main';
import Payment from './Payment';
import Order from '../../models/Order';
import '../../css/client.css';

const PaymentPage = ({ location }) => {
  const { params, state } = location;
  const { tickets, data, hallMap } = params;

  const [order, setOrder] = useState({});
  const [totalPrice, setTotalPrice] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (state && state.fromHallPage) {
      if (tickets.length !== 0) {
        createNewOrder();
        calcTotalPrice();
        incrementSeatNumber();
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

  const incrementSeatNumber = () => {
    const newSeats = tickets.map((ticket) => (
      { row: ticket.row + 1, seat: ticket.seat + 1 }
    ));
    setSeats(newSeats);
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
                seats={seats}
              />
            </Main>
          </ClientUI>
        ) : <Redirect />
      }
    </>
  );
};

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
