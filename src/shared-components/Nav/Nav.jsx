/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useContext } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DateContext from '../../contexts/DateContext';
import NavTab from './NavTab';
import styles from './css/nav.module.css';

const HOME_PAGE_NAV = {
  position: 'sticky',
  top: '2px',
  paddingBottom: '1rem',
};

// Навигация по датам
const Nav = ({ isHomePage }) => {
  const [dates, setDates] = useState([
    moment(),
    moment().add(1, 'd'),
    moment().add(2, 'd'),
    moment().add(3, 'd'),
    moment().add(4, 'd'),
    moment().add(5, 'd'),
  ]);
  // Используем контекст даты
  // Точнее функцию для выбора текущей даты
  const { setChosen } = useContext(DateContext);

  // Переключатель дат
  const handleChoose = (event) => {
    const newChosen = event.currentTarget.dataset.date;
    setChosen(newChosen);
  };

  // При нажатии на кнопку 'назад'
  // показывается предыдущая дата
  // Но не будет работать если крайний левый блок
  // является сегодняшней датой
  const setPrevDay = () => {
    const today = moment().format('L');

    if (dates[0].format('L') !== today) {
      setDates((prevDays) => {
        prevDays.pop();
        const prevDay = prevDays[0].clone().subtract(1, 'd');
        return [prevDay, ...prevDays];
      });
    }
  };

  // При нажатий на кнопку 'вперед'
  // показывается следующая дата
  // Лимита нет (Может стоит сделать?)
  const setNextDay = () => {
    setDates((prevDays) => {
      prevDays.shift();
      const nextDay = prevDays[prevDays.length - 1].clone().add(1, 'd');
      return [...prevDays, nextDay];
    });
  };

  return (
    <nav
      className={styles['page-nav']}
      style={isHomePage && HOME_PAGE_NAV}
    >
      <button
        type="button"
        className={`${styles['page-nav__day']} ${styles['page-nav__day_prev']}`}
        onClick={setPrevDay}
      />
      {dates.map((date) => (
        <NavTab key={date.format('L')} date={date} onChoose={handleChoose} />
      ))}
      <button
        type="button"
        className={`${styles['page-nav__day']} ${styles['page-nav__day_next']}`}
        onClick={setNextDay}
      />
    </nav>
  );
};

export default Nav;
