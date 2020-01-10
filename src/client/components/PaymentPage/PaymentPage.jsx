/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import ClientHeader from '../../../shared-components/Header';
import ClientMain from '../../../shared-components/Main';
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
            <ClientHeader />

            <ClientMain>
              <Payment
                data={data}
                hallMap={hallMap}
                newOrder={order}
                totalPrice={totalPrice}
                seats={seats}
              />
            </ClientMain>
          </ClientUI>
        ) : <Redirect />
      }
    </>
  );
};

PaymentPage.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};

export default PaymentPage;
