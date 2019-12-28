import React from 'react';
import moment from 'moment';

const DateContext = React.createContext(moment().format('L'));
DateContext.displayName = 'DateContext';

export default DateContext;
