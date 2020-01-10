import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import moment from 'moment';

import ErrorPage from './client/components/ErrorPage/ErrorPage';
import HallPage from './client/components/HallPage/HallPage';
import HomePage from './client/components/HomePage/HomePage';
import PaymentPage from './client/components/PaymentPage/PaymentPage';
import TicketPage from './client/components/TicketPage/TicketPage';
import LoginPage from './login/LoginPage/LoginPage';
import AdminPage from './admin/components/AdminPage';

import DateContext from './contexts/DateContext';
import LoginContext from './contexts/LoginContext';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chosen, setChosen] = useState(moment().format('L'));

  return (
    <LoginContext.Provider value={isLoggedIn}>
      <DateContext.Provider value={chosen}>
        <Router>
          <Switch>
            <Route path="/admin" exact strict>
              <AdminPage setChosen={setChosen} />
            </Route>

            <Route path="/hall" component={HallPage} />

            <Route path="/payment" component={PaymentPage} />

            <Route path="/ticket" component={TicketPage} />

            <Route path="/login">
              <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>

            <Route path="/" exact>
              <HomePage setChosen={setChosen} />
            </Route>

            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </DateContext.Provider>
    </LoginContext.Provider>
  );
};

export default App;
