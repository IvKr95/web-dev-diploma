/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Order from '../../models/Order';
import Seats from './Seats';

const Payment = (props) => {
  const {
    data,
    hallMap,
    newOrder,
    totalPrice,
    seats,
  } = props;
  const { movieName, hall, time } = data;

  return (
    <section className="ticket">

      <header className="tichet__check">
        <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
      </header>

      <div className="ticket__info-wrapper">
        <p className="ticket__info">
На фильм:
          {' '}
          <span className="ticket__details ticket__title">{movieName}</span>
        </p>
        <p className="ticket__info">
Места:
          {' '}
          {seats.map((s) => <Seats key={`${s.row}_${s.seat}`} row={s.row} seat={s.seat} />)}
        </p>
        <p className="ticket__info">
В зале:
          {' '}
          <span className="ticket__details ticket__hall">{hall}</span>
        </p>
        <p className="ticket__info">
Начало сеанса:
          {' '}
          <span className="ticket__details ticket__start">{time.time}</span>
        </p>
        <p className="ticket__info">
Стоимость:
          {' '}
          <span className="ticket__details ticket__cost">{totalPrice}</span>
рублей
        </p>

        <Link
          className="acceptin-button"
          to={{
            pathname: '/ticket',
            state: {
              fromDisplayPayment: true,
              newOrder,
              data,
              hallMap,
              seats,
            },
          }}
          role="button"
        >
Получить код бронирования
        </Link>

        <p className="ticket__hint">
После оплаты билет будет доступен в этом окне, а также придёт вам на почту.
Покажите QR-код нашему контроллёру у входа в зал.
        </p>
        <p className="ticket__hint">
Приятного просмотра!
        </p>
      </div>
    </section>
  );
};

Payment.propTypes = {
  data: PropTypes.shape({
    hall: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
  }).isRequired,
  newOrder: PropTypes.instanceOf(Order).isRequired,
  hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  totalPrice: PropTypes.number,
  seats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Payment.defaultProps = {
  totalPrice: 0,
};

export default Payment;
