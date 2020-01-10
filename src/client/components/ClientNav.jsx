import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ClientNavTab from './ClientNavTab';
import 'moment/locale/ru';

function ClientNav(props) {
  const { chosen, setChosen } = props;

  const [days, setDays] = useState([
    moment(),
    moment().add(1, 'd'),
    moment().add(2, 'd'),
    moment().add(3, 'd'),
    moment().add(4, 'd'),
    moment().add(5, 'd'),
  ]);

  const handleChoose = (e) => {
    const newChosen = e.currentTarget.dataset.date;
    setChosen(newChosen);
  };

  const setPrevDay = () => {
    if (days[0].format('L') !== moment().format('L')) {
      setDays((prevDays) => {
        prevDays.pop();
        const prevDay = prevDays[0].clone().subtract(1, 'd');
        return [prevDay, ...prevDays];
      });
    }
  };

  const setNextDay = () => {
    setDays((prevDays) => {
      prevDays.shift();
      const nextDay = prevDays[prevDays.length - 1].clone().add(1, 'd');
      return [...prevDays, nextDay];
    });
  };

  return (
    <nav className="page-nav">
      <button type="button" className="page-nav__day page-nav__day_prev" onClick={setPrevDay} />
      {days.map((date) => (
        <ClientNavTab key={date.format('L')} date={date} onChoose={handleChoose} chosen={chosen} />
      ))}
      <button type="button" className="page-nav__day page-nav__day_next" onClick={setNextDay} />
    </nav>
  );
}

ClientNav.propTypes = {
  chosen: PropTypes.string.isRequired,
  setChosen: PropTypes.func.isRequired,
};

export default ClientNav;
