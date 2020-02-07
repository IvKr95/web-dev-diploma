/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */

import React from 'react';
import PropTypes from 'prop-types';
import Ticket from '../../models/Ticket';
import HallMapRow from './HallMapRow';
import HallMapSeat from './HallMapSeat';
import HallSchemaLegend from './HallSchemaLegend';
import styles from './css/HallPage.module.css';

const DISABLED_SEAT = 'disabled';
const STANDARD_SEAT = 'standard';

// Показывает разметку зала
function HallSchema(props) {
  const {
    hallMap,
    setHallMap,
    hall,
    setTickets,
  } = props;

  const handleDoubleClick = (event) => {
    event.currentTarget.classList.toggle(styles.zoomedin);
  };

  // Обрабатывает клик на кресло
  // Создает билет
  const handleClick = (row, seat, seatInfo) => {
    if (seatInfo.type !== DISABLED_SEAT) {
      const price = determinePrice(seatInfo.type);
      const newTicket = new Ticket(row, seat, seatInfo.type, price);

      selectSeat(row, seat);
      handleTickets(newTicket);
    }
  };

  // Определяет цену
  const determinePrice = (seatType) => (
    seatType === STANDARD_SEAT ? hall.standardPrice : hall.vipPrice
  );

  // Выбирает кресло
  const selectSeat = (row, seat) => {
    setHallMap((prevMap) => {
      const seatObj = prevMap[row - 1][seat - 1];
      seatObj.isSelected = !seatObj.isSelected;

      return [...prevMap];
    });
  };

  const handleTickets = (newTicket) => {
    setTickets((prevTickets) => {
      const alreadyExistingTicket = prevTickets.find(
        (ticket) => ticket.row === newTicket.row && ticket.seat === newTicket.seat,
      );

      if (alreadyExistingTicket) {
        for (let ticket = 0; ticket < prevTickets.length; ticket++) {
          const prevTicket = prevTickets[ticket];

          if (prevTicket.row === newTicket.row && prevTicket.seat === newTicket.seat) {
            prevTickets.splice(ticket, 1);
          }
        }
        return [...prevTickets];
      }
      return [...prevTickets, newTicket];
    });
  };

  return (
    <div className={styles['buying-scheme']} onDoubleClick={handleDoubleClick}>
      <div className={styles['buying-scheme__wrapper']}>
        {hallMap.map((row, r) => (
          <HallMapRow key={`row_${r}`}>
            {row.map((seat, s) => {
              const nRow = r + 1;
              const nSeat = s + 1;
              return (
                <HallMapSeat key={`seat_${s}`} onClick={handleClick} seat={seat} nRow={nRow} nSeat={nSeat} />
              );
            })}
          </HallMapRow>
        ))}
      </div>
      <HallSchemaLegend hall={hall} />
    </div>
  );
}

HallSchema.propTypes = {
  hallMap: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.object,
    ),
  ).isRequired,
  setHallMap: PropTypes.func.isRequired,
  hall: PropTypes.shape({
    standardPrice: PropTypes.number,
    vipPrice: PropTypes.number,
  }).isRequired,
  setTickets: PropTypes.func.isRequired,
};

export default HallSchema;
