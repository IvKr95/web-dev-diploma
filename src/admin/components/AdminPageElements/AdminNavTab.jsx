import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateContext from '../../../contexts/DateContext';

const NAV_TODAY = 'page-nav__day page-nav__day_today';
const NAV_CHOSEN = 'page-nav__day_chosen';
const NAV_WEEKEND = 'page-nav__day_weekend';

function AdminNavTab(props) {
  const context = useContext(DateContext);
  const { date, onChoose: handleChoose } = props;

  const todayClass = date.format('L') === moment().format('L') ? NAV_TODAY : '';
  const chosenClass = date.format('L') === context ? NAV_CHOSEN : '';
  const weekendClass = ['сб', 'вс'].includes(date.format('dd')) ? NAV_WEEKEND : '';

  return (
    <button
      type="button"
      className={`page-nav__day ${todayClass} ${chosenClass} ${weekendClass}`}
      onClick={handleChoose}
      data-date={date.format('L')}
    >
      <span className="page-nav__day-week">{date.format('dd').toUpperCase()}</span>
      <span className="page-nav__day-number">{date.format('DD')}</span>
    </button>
  );
}

AdminNavTab.propTypes = {
  date: PropTypes.object.isRequired,
  onChoose: PropTypes.func.isRequired,
};

export default AdminNavTab;
