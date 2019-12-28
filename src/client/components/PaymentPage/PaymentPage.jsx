import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import ClientHeader from '../ClientHeader';
import ClientMain from '../ClientMain';
import DisplayPayment from './DisplayPayment';
import Order from '../../models/Order';
import '../../css/client.css';

const PaymentPage = (props) => {
  const { params, state } = props.location;

  const [order, setOrder] = useState({});

  useEffect(() => {
    if (state && state.fromHallPage) {
      if (params.tickets.length !== 0) {
        const newOrder = new Order({
          id: nanoid(),
          tickets: params.tickets,
        });
        setOrder(newOrder);
      }
    }
  }, []);

  return (
    <>
      {
        state && state.fromHallPage ? (
          <ClientUI>
            <ClientHeader />

            <ClientMain>
              <DisplayPayment
                data={params.data}
                hallMap={params.hallMap}
                newOrder={order}
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
