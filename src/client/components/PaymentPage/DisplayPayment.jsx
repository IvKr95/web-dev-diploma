import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Order from '../../models/Order';

const DisplayPayment = (props) => {
  const {
    data, hallMap, newOrder,
  } = props;

  const [totalPrice, setTotalPrice] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (newOrder && newOrder.tickets) {
      calcTotalPrice(newOrder);
      incrementSeatNumber(newOrder);
    }
  }, [newOrder]);

  const calcTotalPrice = (order) => {
    const newTotalPrice = order.tickets.reduce((acc, cur) => acc + cur.price, 0);
    setTotalPrice(newTotalPrice);
  };

  const incrementSeatNumber = (order) => {
    const newSeats = order.tickets.map((ticket) => (
      { row: ticket.row + 1, seat: ticket.seat + 1 }
    ));
    setSeats(newSeats);
  };

  return (
    <section className="ticket">

      <header className="tichet__check">
        <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
      </header>

      <div className="ticket__info-wrapper">
        <p className="ticket__info">
На фильм:
          <span className="ticket__details ticket__title">{data.movieName}</span>
        </p>
        <p className="ticket__info">
Места:
          {seats.map((s) => (
            <>
Ряд:
              {' '}
              <span className="ticket__details ticket__chairs">{s.row}</span>
Место:
              {' '}
              <span className="ticket__details ticket__chairs">{s.seat}</span>
            </>
          ))}
        </p>
        <p className="ticket__info">
В зале:
          <span className="ticket__details ticket__hall">{data.hall}</span>
        </p>
        <p className="ticket__info">
Начало сеанса:
          <span className="ticket__details ticket__start">{data.time.time}</span>
        </p>
        <p className="ticket__info">
Стоимость:
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

DisplayPayment.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  newOrder: PropTypes.instanceOf(Order).isRequired,
  hallMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};

export default DisplayPayment;
