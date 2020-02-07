/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import HallInfo from './HallInfo';
import HallSchema from './HallSchema';

import styles from './css/HallPage.module.css';

const ACTIVE_BUTTON_CSS = {
  pointerEvents: 'auto',
  backgroundColor: '#16A6AF',
};

const INACTIVE_BUTTON_CSS = {
  pointerEvents: 'none',
  backgroundColor: 'grey',
};

// Обертка для зала, где выбирать места
const Hall = (props) => {
  const {
    hall,
    data,
    hallMap,
    setHallMap,
    tickets,
    setTickets,
    isButtonActive,
  } = props;

  return (
    <section className={styles.buying}>
      <HallInfo data={data} />
      <HallSchema
        hall={hall}
        hallMap={hallMap}
        setHallMap={setHallMap}
        setTickets={setTickets}
      />
      <Link
        className={styles['acceptin-button']}
        style={isButtonActive ? ACTIVE_BUTTON_CSS : INACTIVE_BUTTON_CSS}
        to={{
          pathname: '/payment',
          params: {
            tickets,
            data,
            hallMap,
            setHallMap,
          },
          state: {
            fromHallPage: true,
          },
        }}
      >
Забронировать
      </Link>
    </section>
  );
};

Hall.propTypes = {
  data: PropTypes.shape({
    hall: PropTypes.string.isRequired,
    movieId: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    time: PropTypes.shape({
      showId: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  hall: PropTypes.string.isRequired,
  hallMap: PropTypes.arrayOf(PropTypes.array).isRequired,
  setHallMap: PropTypes.func.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTickets: PropTypes.func.isRequired,
  isButtonActive: PropTypes.bool.isRequired,
};

export default Hall;
