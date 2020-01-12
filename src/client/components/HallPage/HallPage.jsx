/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import ClientHeader from '../../../shared-components/Header';
import ClientMain from '../../../shared-components/Main';
import Hall from './Hall';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import withCrud from '../../../hoc/WithCrud';
import '../../css/client.css';


const HallPage = (props) => {
  const { get, isLoading, setIsLoading } = props;
  const { params, state } = props.location;
  const [hall, setHall] = useState({});
  const [hallMap, setHallMap] = useState([]);

  useEffect(() => {
    if (state && state.fromHomePage) {
      fetchHall();
      fetchShowData();
    }
  }, []);

  const fetchHall = () => {
    setIsLoading(true);
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getHallByName',
        table: 'halls',
        param: params.hall,
      },
      parsify: false,
      callback() {
        setIsLoading(false);
      },
    }, setHall);
  };

  const fetchShowData = () => {
    setIsLoading(true);
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getHallMapByShowId',
        table: 'shows',
        param: params.time.showId,
      },
      parsify: true,
      callback() {
        setIsLoading(false);
      },
    }, setHallMap);
  };

  return (
    <>
      {
        state && state.fromHomePage
          ? (
            <ClientUI>
              <ClientHeader />

              <ClientMain>
                {isLoading && (
                <div className="loading">
                  <div className="loader" />
                </div>
                )}
                <Hall
                  data={params}
                  hall={hall}
                  hallMap={hallMap}
                  setHallMap={setHallMap}
                />
              </ClientMain>
            </ClientUI>
          ) : <Redirect to="/" />
      }
    </>
  );
};

HallPage.propTypes = {

};

export default withCrud(withLoadingScreen(HallPage));
