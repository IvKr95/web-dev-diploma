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
        url: process.env.REACT_APP_INDEX_URL,
        params: {
          action: 'getHalls',
          table: 'halls',
        },
        callback(data) {
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
        url: process.env.REACT_APP_INDEX_URL,
        params: {
          action: 'getMovies',
          table: 'movies',
        },
        callback(data) {
          setMovies(data);
        },
      });
    };

    const fetchShows = () => {
      list({
        url: process.env.REACT_APP_INDEX_URL,
        params: {
          action: 'getShows',
          table: 'shows',
          param: chosen,
        },
        callback(data) {
          setShows(data);
          setIsLoading(false);
        },
      });
    };

    const handleModal = (event, item) => {
      setActiveModal(!isModalActive);
      handleAction(event, item);
    };

    const handleAction = (event, item) => {
      let newAction;
      if (event) {
        newAction = event.currentTarget.dataset.action;
      } else {
        newAction = '';
      }
      setAction(newAction);

      if (newAction === 'deleteHall' || newAction === 'deleteShowTime') {
        setItemToDelete(item);
      }
    };

    const handleDelete = (event) => {
      event.preventDefault();

      if (action === 'deleteHall') {
        remove({
          url: process.env.REACT_APP_ADMIN_URL,
          params: {
            action: 'deleteShows',
            table: 'shows',
            target: itemToDelete,
          },
          callback: () => {
            remove({
              url: process.env.REACT_APP_ADMIN_URL,
              params: {
                action,
                table: 'halls',
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
            table: 'shows',
            target: itemToDelete.showId,
          },
          callback: () => {
            fetchShows();
          },
        });
      }

      setItemToDelete('');
      handleModal(event);
    };

    const openSales = (event) => {
      const data = {
        state: activeHall.isOpen === 'false' ? 'true' : 'false',
      };

      update({
        url: `${process.env.REACT_APP_INDEX_URL}/${activeHall.hallName}`,
        body: {
          action: event.target.dataset.action,
          table: 'halls',
          data,
        },
        callback: () => {
          fetchHalls();
        },
      });
    };

    const updatePrices = (data) => {
      update({
        url: `${process.env.REACT_APP_INDEX_URL}/${activeHall.hallName}`,
        body: {
          action: 'updatePrices',
          table: 'halls',
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
        url: `${process.env.REACT_APP_INDEX_URL}/${activeHall.hallName}`,
        body: {
          action: 'setHallMap',
          table: 'halls',
          data,
        },
        callback: () => {
          fetchHalls();
        },
      });
    };

    const handleHeader = (event) => {
      const { name } = event.currentTarget.dataset;

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

      add({
        url: process.env.REACT_APP_INDEX_URL,
        body: {
          action,
          table: 'shows',
          data: JSON.stringify(newShow),
        },
        callback() {
          fetchShows();
        },
      });
    };

    const addHall = (data) => {
      add({
        url: process.env.REACT_APP_INDEX_URL,
        body: {
          action,
          table: 'halls',
          data: JSON.stringify(data),
        },
        callback() {
          fetchHalls();
        },
      });
    };

    const addMovie = (data) => {
      add({
        url: process.env.REACT_APP_INDEX_URL,
        body: {
          action,
          table: 'movies',
          data: JSON.stringify(data),
          poster: data.poster,
        },
        callback() {
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
