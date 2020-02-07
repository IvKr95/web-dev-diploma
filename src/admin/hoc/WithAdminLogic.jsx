/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import DateContext from '../../contexts/DateContext';
import Show from '../models/Show';
import styles from '../css/admin.module.css';

// Здесь вся логика admin
const withAdminLogic = (Component) => {
  const WithAdminLogic = (props) => {
    // Миллион пропсов
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
      dragging,
      setDragging,
      droppedIn,
      setDroppedIn,
    } = props;

    const { chosen } = useContext(DateContext);

    useEffect(() => {
      document.body.classList.add(styles['admin-theme']);
      setIsLoading(true);
      fetchHalls();
      fetchMovies();
      return () => {
        document.body.classList.remove(styles['admin-theme']);
      };
    }, []);

    // Когда меняется дата, получаем сеансы по ней
    useEffect(() => {
      fetchShows();
    }, [chosen]);

    // Получаем залы
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

    // Получаем фильмы
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

    // Получаем сеансы
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

    // Открывает-закрывает модальные окна
    const handleModal = (event, item) => {
      setActiveModal(!isModalActive);
      handleAction(event, item);
    };

    // Устанавливает новое действие для модальных окон
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

    // Удаляем что-то, в зависимости от действия
    const handleDelete = (event) => {
      event.preventDefault();

      if (action === 'deleteHall') {
        deleteHall();
      } else {
        deleteShow();
      }

      setItemToDelete('');
      handleModal(event);
    };

    const deleteHall = () => {
      remove({
        url: process.env.REACT_APP_INDEX_URL,
        params: {
          action: 'deleteShows',
          table: 'shows',
          target: itemToDelete,
        },
        callback() {
          remove({
            url: process.env.REACT_APP_INDEX_URL,
            params: {
              action,
              table: 'halls',
              target: itemToDelete,
            },
            callback() {
              fetchHalls();
              fetchShows();
            },
          });
        },
      });
    };

    const deleteShow = () => {
      remove({
        url: process.env.REACT_APP_INDEX_URL,
        params: {
          action,
          table: 'shows',
          target: itemToDelete.showId,
        },
        callback() {
          fetchShows();
        },
      });
    };

    // Открываем зал для продаж
    const openSales = (event) => {
      const { isOpen, hallName } = activeHall;

      const data = {
        state: isOpen === 'false' ? 'true' : 'false',
      };

      update({
        url: `${process.env.REACT_APP_INDEX_URL}/${hallName}`,
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

    // Обновляем цены в зале
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

    // Обновляем разметку зала
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

    // Открывает или закрывает модули
    const handleHeader = (event) => {
      const { name } = event.currentTarget.dataset;

      setHeaders((prev) => {
        const copy = [...prev];
        prev.forEach((h, i) => {
          if (name === h.name) {
            copy[i].isOpen = !h.isOpen;
          }
        });
        return copy;
      });
    };

    // Генерирует новую разметку зала
    const generateHallMap = (hallName) => {
      const hallMap = [];
      let chosenHall;

      for (const hall of halls) {
        if (hall.hallName === hallName) {
          chosenHall = JSON.parse(hall.hallSchema);
          break;
        }
      }

      for (let row = 0; row < chosenHall.length; row++) {
        hallMap.push([]);

        for (let seat = 0; seat < chosenHall[row].length; seat++) {
          const seatObj = {
            type: chosenHall[row][seat],
            isTaken: false,
            isAvail: chosenHall[row][seat] !== 'disabled',
            isSelected: false,
          };

          hallMap[row].push(seatObj);
        }
      }
      return hallMap;
    };

    // Генерирует новый сеанс
    const generateNewShow = (show, hallMap) => {
      for (const movie of movies) {
        if (movie.name === show.name) {
          const showData = {
            date: show.date,
            hall: show.hall,
            time: show.startTime,
            movie: movie.name,
            hallMap: JSON.stringify(hallMap),
          };
          return new Show(nanoid(), showData);
        }
      }
    };

    // Добавляет сеанс
    const addShow = (show) => {
      const hallMap = generateHallMap(show.hall);
      const newShow = generateNewShow(show, hallMap);

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

    // Добавляет зал
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

    // Добавляет фильм
    const addMovie = (data) => {
      const body = new FormData();

      body.append('action', action);
      body.append('table', 'movies');
      body.append('data', JSON.stringify(data));
      body.append('poster', data.poster);

      add({
        url: process.env.REACT_APP_INDEX_URL,
        body,
        callback() {
          fetchMovies();
        },
      });
    };

    return (
      // Еще больше пропсов еее
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

        dragging={dragging}
        droppedIn={droppedIn}
        setDragging={setDragging}
        setDroppedIn={setDroppedIn}
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

// Как отображается имя в React DevTools
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withAdminLogic;
