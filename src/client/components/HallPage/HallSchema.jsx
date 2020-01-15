/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import Ticket from '../../models/Ticket';
import HallMapRow from './HallMapRow';
import HallMapSeat from './HallMapSeat';

const DISABLED_SEAT = 'disabled';
const STANDARD_SEAT = 'standard';

function HallSchema(props) {
  const {
    hallMap, setHallMap, hall, children, setTickets,
  } = props;

  const handleClick = (row, seat, seatInfo) => {
    if (seatInfo.type !== DISABLED_SEAT) {
      const price = determinePrice(seatInfo.type);
      const newTicket = new Ticket(row, seat, seatInfo.type, price);

      selectSeat(row, seat);
      handleTickets(newTicket);
    }
  };

  const determinePrice = (seatType) => (
    seatType === STANDARD_SEAT ? hall.standardPrice : hall.vipPrice
  );

  const selectSeat = (row, seat) => {
    setHallMap((prevMap) => {
      const seatObj = prevMap[row][seat];
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
    <div className="buying-scheme">
      <div className="buying-scheme__wrapper">
        {hallMap.map((row, r) => (
          <HallMapRow key={`row_${r}`}>
            {row.map((seat, s) => (
              <HallMapSeat key={`seat_${s}`} onClick={handleClick} seat={seat} r={r} s={s} />
            ))}
          </HallMapRow>
        ))}
      </div>
      {children}
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
  hall: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  setTickets: PropTypes.func.isRequired,
};

export default HallSchema;
