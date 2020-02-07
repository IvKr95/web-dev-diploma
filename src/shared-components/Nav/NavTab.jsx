/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateContext from '../../contexts/DateContext';
import styles from './css/nav.module.css';

// Класс применяемый к текущей дате
const NAV_TODAY = styles['page-nav__day_today'];
// Класс применяемый к выбранной дате
const NAV_CHOSEN = styles['page-nav__day_chosen'];
// Класс применяемый к выходному дню
const NAV_WEEKEND = styles['page-nav__day_weekend'];

// Отображает один блок даты в навигации по датам
function NavTab(props) {
  // Используем контекст даты
  const { chosen } = useContext(DateContext);
  const {
    date,
    onChoose: handleChoose,
  } = props;

  // Решаем какие классы буду применены к блоку даты
  const todayClass = date.format('L') === moment().format('L') ? NAV_TODAY : '';
  const chosenClass = date.format('L') === chosen ? NAV_CHOSEN : '';
  const weekendClass = ['сб', 'вс'].includes(date.format('dd')) ? NAV_WEEKEND : '';

  return (
    <button
      type="button"
      className={`${styles['page-nav__day']} ${todayClass} ${chosenClass} ${weekendClass}`}
      onClick={handleChoose}
      data-date={date.format('L')}
    >
      <span className={styles['page-nav__day-week']}>{date.format('dd').toUpperCase()}</span>
      <span className={styles['page-nav__day-number']}>{date.format('DD')}</span>
    </button>
  );
}

NavTab.propTypes = {
  // Объект даты
  date: PropTypes.object.isRequired,
  // Переключаемся между датами
  onChoose: PropTypes.func.isRequired,
};

export default NavTab;
