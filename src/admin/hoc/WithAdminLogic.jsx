/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import DateContext from '../../contexts/DateContext';
import Show from '../models/Show';
import '../css/admin.css';

const withAdminLogic = (Component) => {
  const WithAdminLogic = (props) => {
    const {
      list, add, update, remove,
      isModalActive,
      action,
      itemToDelete,
      setItemToDelete,
      halls,
      setHalls,
      setMovies,
      setShows,
      setHeaders,
      headers,
      setActiveModal,
      setAction,
      activeHall,
      setActiveHall,
      setActiveHallMap,
      activeHallMap,
      movies,
      shows,
      setIsLoading,
    } = props;

    const { chosen } = useContext(DateContext);

    useEffect(() => {
      setIsLoading(true);
      fetchHalls();
      fetchMovies();
      fetchShows();
    }, []);

    useEffect(() => {
      fetchShows();
    }, [chosen]);

    const fetchHalls = () => {
      list({
        url: process.env.REACT_APP_ADMIN_URL,
        params: {
          table: 'halls',
        },
        callback: (data) => {
          if (data.length > 0) {
            setHalls(data);
            setActiveHall(data[0]);
            setActiveHallMap(JSON.parse(data[0].hallSchema));
          }
        },
      });
    };

    const fetchMovies = () => {
      list({
        url: process.env.REACT_APP_ADMIN_URL,
        params: {
          table: 'movies',
        },
        callback: (data) => {
          setMovies(data);
        },
      });
    };

    const fetchShows = () => {
      list({
        url: process.env.REACT_APP_ADMIN_URL,
        params: {
          table: 'shows',
          date: chosen,
        },
        callback: (data) => {
          setShows(data);
          setIsLoading(false);
        },
      });
    };

    const handleModal = (e, item) => {
      setActiveModal(!isModalActive);
      handleAction(e, item);
    };

    const handleAction = (e, item) => {
      let newAction;
      if (e) {
        newAction = e.currentTarget.dataset.action;
      } else {
        newAction = '';
      }
      setAction(newAction);

      if (newAction === 'deleteHall' || newAction === 'deleteShowTime') {
        setItemToDelete(item);
      }
    };

    const handleDelete = (e) => {
      e.preventDefault();

      if (action === 'deleteHall') {
        remove({
          url: process.env.REACT_APP_ADMIN_URL,
          params: {
            action: 'deleteShows',
            target: itemToDelete,
          },
          callback: () => {
            remove({
              url: process.env.REACT_APP_ADMIN_URL,
              params: {
                action,
                target: itemToDelete,
              },
              callback: () => {
                fetchHalls();
                fetchShows();
              },
            });
          },
        });
      } else {
        remove({
          url: process.env.REACT_APP_ADMIN_URL,
          params: {
            action,
            target: itemToDelete.showId,
          },
          callback: () => {
            fetchShows();
          },
        });
      }

      setItemToDelete('');
      handleModal(e);
    };

    const openSales = (e) => {
      const data = {
        state: activeHall.isOpen === 'false' ? 'true' : 'false',
      };

      update({
        url: `${process.env.REACT_APP_ADMIN_URL}/${activeHall.hallName}`,
        body: {
          action: e.target.dataset.action,
          data,
        },
        callback: () => {
          fetchHalls();
        },
      });
    };

    const updatePrices = ({ standardPrice, vipPrice }) => {
      const data = {
        standardPrice,
        vipPrice,
      };

      update({
        url: `${process.env.REACT_APP_ADMIN_URL}/${activeHall.hallName}`,
        body: {
          action: 'updatePrices',
          data,
        },
        callback: () => {
          fetchHalls();
        },
      });
    };

    const updateHall = ({ rows, maxSeatsInRow }) => {
      const data = {
        rows,
        maxSeatsInRow,
        activeHallMap: JSON.stringify(activeHallMap),
      };

      update({
        url: `${process.env.REACT_APP_ADMIN_URL}/${activeHall.hallName}`,
        body: {
          action: 'setHallMap',
          data,
        },
        callback: () => {
          fetchHalls();
        },
      });
    };

    const handleHeader = (e) => {
      const { name } = e.currentTarget.dataset;

      setHeaders((prev) => {
        prev.forEach((h) => {
          if (name === h.name) {
            h.isOpen = !h.isOpen;
          }
        });
        return [...prev];
      });
    };

    const addShow = (show) => {
      let newShow;
      const hallMap = [];
      const body = new FormData();

      for (let row = 0; row < activeHallMap.length; row++) {
        hallMap.push([]);

        for (let seat = 0; seat < activeHallMap[row].length; seat++) {
          const seatObj = {
            type: activeHallMap[row][seat],
            isTaken: false,
            isAvail: activeHallMap[row][seat] !== 'disabled',
            isSelected: false,
          };

          hallMap[row].push(seatObj);
        }
      }

      for (const movie of movies) {
        if (movie.name === show.name) {
          const showData = {
            date: show.date,
            hall: show.hall,
            time: show.startTime,
            movie: movie.name,
            hallMap: JSON.stringify(hallMap),
          };
          newShow = new Show(nanoid(), showData);
          break;
        }
      }

      body.append('action', action);
      body.append('data', JSON.stringify(newShow));

      add({
        url: `${process.env.REACT_APP_ADMIN_URL}/shows`,
        body,
        callback: () => {
          fetchShows();
        },
      });
    };

    const addHall = (data) => {
      const body = new FormData();
      body.append('action', action);
      body.append('data', JSON.stringify(data));

      add({
        url: process.env.REACT_APP_ADMIN_URL,
        body,
        callback: () => {
          fetchHalls();
        },
      });
    };

    const addMovie = (data) => {
      const body = new FormData();
      body.append('action', action);
      body.append('poster', data.poster);
      body.append('data', JSON.stringify(data));

      add({
        url: process.env.REACT_APP_ADMIN_URL,
        body,
        callback: () => {
          fetchMovies();
        },
      });
    };

    return (
      <Component
        updatePrices={updatePrices}
        handleHeader={handleHeader}
        isModalActive={isModalActive}
        action={action}
        onClose={handleModal}
        onAddShow={addShow}
        onAddMovie={addMovie}
        onAddHall={addHall}
        itemToDelete={itemToDelete}
        onDelete={handleDelete}
        halls={halls}
        headers={headers}
        activeHall={activeHall}
        setActiveHall={setActiveHall}
        setActiveHallMap={setActiveHallMap}
        onSubmit={updateHall}
        activeHallMap={activeHallMap}
        movies={movies}
        shows={shows}
        openSales={openSales}
        {...props}
      />
    );
  };

  WithAdminLogic.propTypes = {
    list: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  };

  WithAdminLogic.displayName = `WithAdminLogic(${getDisplayName(Component)})`;
  return WithAdminLogic;
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withAdminLogic;
