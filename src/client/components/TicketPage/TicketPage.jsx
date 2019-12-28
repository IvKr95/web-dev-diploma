import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import ClientHeader from '../ClientHeader';
import ClientMain from '../ClientMain';
import Ticket from './Ticket';
import DateContext from '../../../contexts/DateContext';
import withCrud from '../../../hoc/WithCrud';
import Order from '../../models/Order';
import updateHallMap from '../../js/updateHallMap';
import '../../css/client.css';


const TicketPage = (props) => {
  const { add, update } = props;
  const { state } = props.location;

  const [qr, setQr] = useState('');
  const dateContext = useContext(DateContext);

  const updateHall = (id, map) => {
    update({
      url: `${process.env.REACT_APP_INDEX_URL}/${id}`,
      body: JSON.stringify({
        action: 'updateHall',
        hall: JSON.stringify(updateHallMap(map)),
      }),
    });
  };

  useEffect(() => {
    if (state && state.fromDisplayPayment) {
      const { data, newOrder, hallMap } = state;
      addOrder(data, newOrder, hallMap);
    }
  }, []);

  const addOrder = (data, order, hallMap) => {
    add({
      url: `${process.env.REACT_APP_INDEX_URL}/orders`,
      body: JSON.stringify({
        date: dateContext,
        hall: data.hall,
        movieId: data.movieId,
        time: data.time.time,
        orderId: order.id,
        tickets: JSON.stringify(order.tickets),
      }),
      callback: (src) => {
        updateHall(data.time.showId, hallMap);
        setQr(src);
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
              <Ticket data={state.data} qr={qr} />
            </ClientMain>
          </ClientUI>
        ) : <Redirect />
      }
    </>
  );
};

TicketPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  newOrder: PropTypes.instanceOf(Order).isRequired,
  hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};


export default withCrud(TicketPage);
