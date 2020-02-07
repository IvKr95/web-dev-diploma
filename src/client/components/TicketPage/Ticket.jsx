/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Seats from '../../../shared-components/Seats';
import AddContacts from '../../forms/AddContacts';
import withCrud from '../../../hoc/WithCrud';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import styles from '../PaymentPage/css/PaymentPage.module.css';

// Просто отображает билет
function Ticket(props) {
  const {
    data,
    orderId,
    tickets,
    qr,
    isLoading,
    setIsLoading,
    add,
  } = props;
  const { movieName, hall, time } = data;

  const addEmail = (email) => {
    setIsLoading(true);
    add({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'addEmail',
        data: JSON.stringify({
          time,
          hall,
          orderId,
          movieName,
          tickets,
          email,
        }),
      },
      callback() {
        setIsLoading(false);
      },
    });
  };

  return (
    <section className={styles.ticket}>

      <header className={styles.tichet__check}>
        <h2 className={styles['ticket__check-title']}>Электронный билет</h2>
      </header>

      <div className={styles['ticket__info-wrapper']}>
        <p className={styles.ticket__info}>
На фильм:
          {' '}
          <span className={`${styles.ticket__details} ${styles.ticket__title}`}>{movieName}</span>
        </p>
        <p className={styles.ticket__info}>
Места:
          {' '}
          {tickets.map((t) => <Seats key={`${t.row}_${t.seat}`} row={t.row} seat={t.seat} />)}
        </p>
        <p className={styles.ticket__info}>
В зале:
          {' '}
          <span className={`${styles.ticket__details} ${styles.ticket__hall}`}>{hall}</span>
        </p>
        <p className={styles.ticket__info}>
Начало сеанса:
          {' '}
          <span className={`${styles.ticket__details} ${styles.ticket__start}`}>{time.time}</span>
        </p>

        <img className={styles.ticket__qr} src={qr} alt="qr-code" />
        <AddContacts onAddEmail={addEmail} />
        <p className={styles.ticket__hint}>Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
        <p className={styles.ticket__hint}>Приятного просмотра!</p>
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
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  qr: PropTypes.string.isRequired,
};

export default withCrud(withLoadingScreen(Ticket));
