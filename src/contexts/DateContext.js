/* eslint-disable linebreak-style */
import React from 'react';
// Импортируем библиотеку moment (для работы с датами)
import moment from 'moment';

// Глобальный контекст даты
// Будет доступно всему приложению
const DateContext = React.createContext({
  chosen: moment().format('L'),
  setChosen: () => {},
});
DateContext.displayName = 'DateContext';

export default DateContext;
