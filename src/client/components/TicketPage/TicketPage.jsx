/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import ClientHeader from '../../../shared-components/Header';
import ClientMain from '../../../shared-components/Main';
import Ticket from './Ticket';
import DateContext from '../../../contexts/DateContext';
import withCrud from '../../../hoc/WithCrud';
import Order from '../../models/Order';
import updateHallMap from '../../js/updateHallMap';
import '../../css/client.css';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';


const TicketPage = (props) => {
  const {
    add, update, location, isLoading, setIsLoading,
  } = props;
  const { state } = location;

  const [qr, setQr] = useState('');
  const { chosen } = useContext(DateContext);

  useEffect(() => {
    if (state && state.fromDisplayPayment) {
      const { data, newOrder, hallMap } = state;
      addOrder(data, newOrder, hallMap);
    }
  }, []);

  const updateHall = (id, map) => {
    update({
      url: `${process.env.REACT_APP_INDEX_URL}/${id}`,
      body: JSON.stringify({
        action: 'updateHall',
        hall: JSON.stringify(updateHallMap(map)),
      }),
    });
  };

  const addOrder = (data, order, hallMap) => {
    setIsLoading(true);
    add({
      url: `${process.env.REACT_APP_INDEX_URL}/orders`,
      body: JSON.stringify({
        date: chosen,
        hall: data.hall,
        movieId: data.movieId,
        time: data.time.time,
        orderId: order.id,
        tickets: JSON.stringify(order.tickets),
      }),
      callback: (src) => {
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
        state && state.fromDisplayPayment ? (
          <ClientUI>
            <ClientHeader />
            <ClientMain>
              {isLoading ? (
                <div className="loading">
                  <div className="loader" />
                </div>
              ) : <Ticket data={state.data} seats={state.seats} qr={qr} />}

            </ClientMain>
          </ClientUI>
        ) : <Redirect />
      }
    </>
  );
};

TicketPage.propTypes = {
  location: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  newOrder: PropTypes.instanceOf(Order).isRequired,
  hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};


export default withCrud(withLoadingScreen(TicketPage));
