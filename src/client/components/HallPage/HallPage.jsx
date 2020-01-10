import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientUI from '../ClientUI';
import ClientHeader from '../ClientHeader';
import ClientMain from '../ClientMain';
import Hall from './Hall';
import withCrud from '../../../hoc/WithCrud';
import '../../css/client.css';

const HallPage = (props) => {
  const { get } = props;
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
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getHallByName',
        table: 'halls',
        param: params.hall,
      },
      parsify: false,
    }, setHall);
  };

  const fetchShowData = () => {
    get({
      url: process.env.REACT_APP_INDEX_URL,
      body: {
        action: 'getHallMapByShowId',
        table: 'shows',
        param: params.time.showId,
      },
      parsify: true,
    }, setHallMap);
  };

  return (
    <>
      {
        state && state.fromHomePage ? (
          <ClientUI>
            <ClientHeader />

            <ClientMain>
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

export default withCrud(HallPage);
