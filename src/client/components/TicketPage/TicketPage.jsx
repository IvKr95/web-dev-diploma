/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import ClientHeader from '../../../shared-components/Header';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import ClientMain from '../../../shared-components/Main';
import Ticket from './Ticket';
import DateContext from '../../../contexts/DateContext';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import withCrud from '../../../hoc/WithCrud';
import Order from '../../models/Order';
import updateHallMap from '../../js/updateHallMap';
import '../../css/client.css';


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
    if (state && state.fromDisplayPayment) {
      const { data, newOrder, hallMap } = state;
      addOrder(data, newOrder, hallMap);
    }
  }, []);

  const updateHall = (id, map) => {
    update({
      url: `${process.env.REACT_APP_INDEX_URL}/${id}`,
      body: assembleBodyForRequest('updateHall', 'shows', JSON.stringify(updateHallMap(map))),
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
      body: assembleBodyForRequest('addOrder', 'orders', JSON.stringify(dataToSend)),
      callback(src) {
        updateHall(data.time.showId, hallMap);
        setQr(src);
        setIsLoading(false);
      },
      responseType: 'blob',
    });
  };

  const assembleBodyForRequest = (action, table, data) => ({
    action,
    table,
    data,
  });

  return (
    <>
      {
        state && state.fromDisplayPayment ? (
          <ClientUI>
            <ClientHeader />
            <ClientMain>
              {isLoading
                ? <LoadingScreen />
                : <Ticket data={state.data} seats={state.seats} qr={qr} />}
            </ClientMain>
          </ClientUI>
        ) : <Redirect />
      }
    </>
  );
};

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
      seats: PropTypes.arrayOf(PropTypes.object).isRequired,
      newOrder: PropTypes.instanceOf(Order).isRequired,
      hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    }).isRequired,
  }).isRequired,
  add: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default withCrud(withLoadingScreen(TicketPage));
