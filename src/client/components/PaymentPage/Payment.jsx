/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Order from '../../models/Order';
import Seats from '../../../shared-components/Seats';
import styles from './css/PaymentPage.module.css';
// Показывает что было выбранно
// Какие места, фильм и тд
// При клике на получить код бронирования
// Переводит на рут билета
const Payment = (props) => {
  const {
    data,
    hallMap,
    newOrder,
    totalPrice,
    tickets,
  } = props;
  const { movieName, hall, time } = data;

  return (
    <section className={styles.ticket}>

      <header className={styles.tichet__check}>
        <h2 className={styles['ticket__check-title']}>Вы выбрали билеты:</h2>
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
        <p className={styles.ticket__info}>
Стоимость:
          {' '}
          <span className={`${styles.ticket__details} ${styles.ticket__cost}`}>{totalPrice}</span>
рублей
        </p>
        {/* Как верно передавать пропсы через линк? */}
        {/* Стоит ли делать как снизу? */}
        <Link
          className={styles['acceptin-button']}
          to={{
            pathname: '/ticket',
            state: {
              fromDisplayPayment: true,
              newOrder,
              data,
              hallMap,
              tickets,
            },
          }}
          role="button"
        >
Получить код бронирования
        </Link>

        <p className={styles.ticket__hint}>
После оплаты билет будет доступен в этом окне, а также придёт вам на почту.
Покажите QR-код нашему контроллёру у входа в зал.
        </p>
        <p className={styles.ticket__hint}>
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
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Payment.defaultProps = {
  totalPrice: 0,
};

export default Payment;
