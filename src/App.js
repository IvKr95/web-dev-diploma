/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import ErrorPage from './client/components/ErrorPage/ErrorPage';
import HallPage from './client/components/HallPage/HallPage';
import HomePage from './client/components/HomePage/HomePage';
import PaymentPage from './client/components/PaymentPage/PaymentPage';
import TicketPage from './client/components/TicketPage/TicketPage';
import LoginPage from './login/LoginPage';
import AdminPage from './admin/components/AdminPage';

import DateContext from './contexts/DateContext';
import LoginContext from './contexts/LoginContext';
import withAuthorization from './hoc/WithAuthorization';
import './App.css';

const App = ({ fetch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chosen, setChosen] = useState(moment().format('L'));

  useEffect(() => {
    fetch(setIsLoggedIn);
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <DateContext.Provider value={{ chosen, setChosen }}>
        <Router>
          <Switch>
            <Route path="/admin" exact strict>
              {isLoggedIn ? <AdminPage /> : <Redirect to="/" />}
            </Route>

            <Route path="/hall" component={HallPage} />

            <Route path="/payment" component={PaymentPage} />

            <Route path="/ticket" component={TicketPage} />

            <Route path="/login">
              {isLoggedIn ? <Redirect to="admin" /> : <LoginPage />}
            </Route>

            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </DateContext.Provider>
    </LoginContext.Provider>
  );
};

App.propTypes = {
  fetch: PropTypes.func.isRequired,
};

export default withAuthorization(App, process.env.REACT_APP_AUTH_URL);
