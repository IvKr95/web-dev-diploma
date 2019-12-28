import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AdminNavTab from './AdminNavTab';
import 'moment/locale/ru';

const AdminNav = (props) => {
  const { setChosen } = props;
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
      <button
        type="button"
        className="page-nav__day page-nav__day_prev"
        onClick={setPrevDay}
      />

      {days.map((d) => (
        <AdminNavTab key={d.format('L')} date={d} onChoose={handleChoose} />
      ))}

      <button
        type="button"
        className="page-nav__day page-nav__day_next"
        onClick={setNextDay}
      />
    </nav>
  );
};

AdminNav.propTypes = {
  chosen: PropTypes.string.isRequired,
  setChosen: PropTypes.func.isRequired,
};

export default AdminNav;
