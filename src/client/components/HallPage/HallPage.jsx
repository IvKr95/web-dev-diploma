/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import Header from '../../../shared-components/Header';
import Main from '../../../shared-components/Main';
import Hall from './Hall';
import LoadingScreen from '../../../shared-components/LoadingScreen';
import withLoadingScreen from '../../../hoc/WithLoadingScreen';
import withCrud from '../../../hoc/WithCrud';
import HallInfo from './HallInfo';
import HallSchema from './HallSchema';
import HallSchemaLegend from './HallSchemaLegend';
import '../../css/client.css';

const ACTIVE_LINK_CSS = {
  pointerEvents: 'auto',
  backgroundColor: '#16A6AF',
};

const INACTIVE_LINK_CSS = {
  pointerEvents: 'none',
  backgroundColor: 'grey',
};


const HallPage = (props) => {
  const {
    get,
    isLoading,
    setIsLoading,
    location,
  } = props;
  const { params, state } = location;
  const [hall, setHall] = useState({});
  const [hallMap, setHallMap] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isLinkActive, setIsLinkActive] = useState(false);

  useEffect(() => {
    if (tickets.length > 0) {
      setIsLinkActive(true);
    } else {
      setIsLinkActive(false);
    }
  }, [tickets.length]);

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
      callback(newHall) {
        setIsLoading(false);
        setHall(newHall);
      },
    });
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
      callback(newHallMap) {
        setIsLoading(false);
        setHallMap(newHallMap);
      },
    });
  };

  return (
    <>
      {
        state && state.fromHomePage
          ? (
            <ClientUI>
              <Header />
              <Main>
                {isLoading && <LoadingScreen />}

                <Hall
                  hallMap={hallMap}
                  setHallMap={setHallMap}
                >
                  <HallInfo data={params} />
                  <HallSchema
                    hallMap={hallMap}
                    setHallMap={setHallMap}
                    hall={hall}
                    setTickets={setTickets}
                  >
                    <HallSchemaLegend hall={hall} />
                  </HallSchema>
                  <Link
                    className="acceptin-button"
                    style={isLinkActive ? ACTIVE_LINK_CSS : INACTIVE_LINK_CSS}
                    to={{
                      pathname: '/payment',
                      params: {
                        tickets,
                        data: params,
                        hallMap,
                        setHallMap,
                      },
                      state: {
                        fromHallPage: true,
                      },
                    }}
                    role="button"
                  >
Забронировать
                  </Link>
                </Hall>
              </Main>
            </ClientUI>
          ) : <Redirect to="/" />
      }
    </>
  );
};

HallPage.propTypes = {
  get: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  location: PropTypes.shape({
    params: PropTypes.shape({
      hall: PropTypes.string.isRequired,
      movieId: PropTypes.string.isRequired,
      movieName: PropTypes.string.isRequired,
      time: PropTypes.shape({
        showId: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    state: PropTypes.shape({
      fromHomePage: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withCrud(withLoadingScreen(HallPage));
