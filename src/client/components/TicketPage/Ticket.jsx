/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

function Ticket(props) {
  const { data, seats, qr } = props;
  const { movieName, hall, time } = data;

  return (
    <section className="ticket">

      <header className="tichet__check">
        <h2 className="ticket__check-title">Электронный билет</h2>
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
          {' '}
          <span className="ticket__details ticket__hall">{hall}</span>
        </p>
        <p className="ticket__info">
Начало сеанса:
          {' '}
          <span className="ticket__details ticket__start">{time.time}</span>
        </p>

        <img className="ticket__info-qr" src={qr} alt="qr-code" />
        <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
        <p className="ticket__hint">Приятного просмотра!</p>
      </div>
    </section>
  );
}

Ticket.propTypes = {
  data: PropTypes.shape({
    hall: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    time: PropTypes.shape({
      showId: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  seats: PropTypes.arrayOf(PropTypes.object).isRequired,
  qr: PropTypes.string.isRequired,
};

export default Ticket;
