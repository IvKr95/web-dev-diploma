/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */


import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Ticket from '../../models/Ticket';

const DISABLED_SEAT = 'disabled';
const STANDARD_SEAT = 'standard';

const ACTIVE_LINK_CSS = {
  pointerEvents: 'auto',
  backgroundColor: '#16A6AF',
};

const INACTIVE_LINK_CSS = {
  pointerEvents: 'none',
  backgroundColor: 'grey',
};

const Hall = (props) => {
  const {
    data,
    hall,
    hallMap,
    setHallMap,
  } = props;

  const [tickets, setTickets] = useState([]);
  const [isLinkActive, setIsLinkActive] = useState(false);

  useEffect(() => {
    if (tickets.length > 0) {
      setIsLinkActive(true);
    } else {
      setIsLinkActive(false);
    }
  }, [tickets.length]);

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
    <section className="buying">
      <div className="buying__info">
        <div className="buying__info-description">
          <h2 className="buying__info-title">{data.movieName}</h2>
          <p className="buying__info-start">
Начало сеанса:
            {' '}
            {data.time.time}
          </p>
          <p className="buying__info-hall">{data.hall}</p>
        </div>
        <div className="buying__info-hint">
          <p>
Тапните дважды,
            <br />
чтобы увеличить
          </p>
        </div>
      </div>
      <div className="buying-scheme">
        <div className="buying-scheme__wrapper">
          {hallMap.map((row, r) => (

            <div
              key={`row_${r}`}
              className="buying-scheme__row"
              role="row"
            >

              {row.map((seat, s) => {
                if (seat.isTaken || !seat.isAvail) {
                  return (
                    <span
                      key={`_${s}`}
                      className={`buying-scheme__chair buying-scheme__chair_${seat.type} buying-scheme__chair_taken`}
                      role="cell"
                    />
                  );
                }
                return (
                  <span
                    key={`_${s}`}
                    className={`buying-scheme__chair buying-scheme__chair_${seat.type} ${seat.isSelected ? 'buying-scheme__chair_selected' : ''}`}
                    onClick={() => handleClick(r, s, seat)}
                    onKeyPress={() => handleClick(r, s, seat)}
                    role="cell"
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="buying-scheme__legend">
          <div className="col">
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_standard" />
Свободно (
              <span className="buying-scheme__legend-value">{hall.standardPrice}</span>
руб)
            </p>
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_vip" />
Свободно VIP (
              <span className="buying-scheme__legend-value">{hall.vipPrice}</span>
руб)
            </p>
          </div>
          <div className="col">
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_taken" />
              {' '}
Занято (Недоступно)
            </p>
            <p className="buying-scheme__legend-price">
              <span className="buying-scheme__chair buying-scheme__chair_selected" />
              {' '}
Выбрано
            </p>
          </div>
        </div>
      </div>

      <Link
        className="acceptin-button"
        style={isLinkActive ? ACTIVE_LINK_CSS : INACTIVE_LINK_CSS}
        to={{
          pathname: '/payment',
          params: {
            tickets, data, hallMap, setHallMap,
          },
          state: {
            fromHallPage: true,
          },
        }}
        role="button"
      >
Забронировать
      </Link>
    </section>
  );
};

Hall.propTypes = {

};

export default Hall;
