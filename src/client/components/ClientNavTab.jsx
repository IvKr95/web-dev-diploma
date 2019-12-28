import React, { useContext } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DateContext from '../../contexts/DateContext';

const TODAY = 'page-nav__day page-nav__day_today';
const CHOSEN = 'page-nav__day_chosen';
const WEEKEND = 'page-nav__day_weekend';

function ClientNavTab(props) {
  const { date, onChoose: handleChoose } = props;
  const context = useContext(DateContext);

  const todayClass = date.format('L') === moment().format('L') && TODAY;
  const chosenClass = date.format('L') === context && CHOSEN;
  const weekendClass = ['сб', 'вс'].includes(date.format('dd')) && WEEKEND;

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

ClientNavTab.propTypes = {
  date: PropTypes.object.isRequired,
  onChoose: PropTypes.func.isRequired,
};

export default ClientNavTab;
