import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../admin/css/admin.css';

const withAdminState = (Component) => {
  const WithAdminState = (props) => {
    const [halls, setHalls] = useState([]);
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [activeHall, setActiveHall] = useState('');
    const [activeHallMap, setActiveHallMap] = useState([]);

    const [headers, setHeaders] = useState([
      {
        name: 'Управление залами',
        isOpen: false,
      },
      {
        name: 'Конфигурация залов',
        isOpen: false,
      },
      {
        name: 'Конфигурация цен',
        isOpen: false,
      },
      {
        name: 'Конфигурация сеансов',
        isOpen: false,
      },
      {
        name: 'Открыть продажи',
        isOpen: false,
      },
      {
        name: 'Закрыть продажи',
        isOpen: false,
      },
    ]);
    const [isModalActive, setActiveModal] = useState(false);
    const [action, setAction] = useState('');
    const [itemToDelete, setItemToDelete] = useState('');

    return (
      <Component
        isModalActive={isModalActive}
        action={action}
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        halls={halls}
        setHalls={setHalls}
        setMovies={setMovies}
        setShows={setShows}
        setHeaders={setHeaders}
        headers={headers}
        setActiveModal={setActiveModal}
        setAction={setAction}
        activeHall={activeHall}
        setActiveHall={setActiveHall}
        setActiveHallMap={setActiveHallMap}
        activeHallMap={activeHallMap}
        movies={movies}
        shows={shows}
        {...props}
      />
    );
  };

  WithAdminState.propTypes = {
    list: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  };

  WithAdminState.displayName = `WithAdminState(${getDisplayName(Component)})`;
  return WithAdminState;
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withAdminState;
