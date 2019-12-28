import React from 'react';
import PropTypes from 'prop-types';

function Ticket(props) {
  const { data, qr } = props;

  return (
    <section className="ticket">

      <header className="tichet__check">
        <h2 className="ticket__check-title">Электронный билет</h2>
      </header>

      <div className="ticket__info-wrapper">
        <p className="ticket__info">
На фильм:
          {' '}
          <span className="ticket__details ticket__title">{data.movieName}</span>
        </p>
        <p className="ticket__info">
Места:
          {' '}
          <span className="ticket__details ticket__chairs">6, 7</span>
        </p>
        <p className="ticket__info">
В зале:
          {' '}
          <span className="ticket__details ticket__hall">{data.hall}</span>
        </p>
        <p className="ticket__info">
Начало сеанса:
          {' '}
          <span className="ticket__details ticket__start">{data.time.time}</span>
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
    movieName: PropTypes.string.isRequired,
    hall: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default Ticket;
