import React from 'react';
import moment from 'moment';

const DateContext = React.createContext({
  chosen: moment().format('L'),
  setChosen: () => {},
});
DateContext.displayName = 'DateContext';

export default DateContext;
