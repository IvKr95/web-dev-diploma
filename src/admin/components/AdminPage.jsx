/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React from 'react';
import PropTypes from 'prop-types';

import AdminHeader from '../../shared-components/Header/Header';
import AdminNav from '../../shared-components/Nav/Nav';
import AdminMain from '../../shared-components/Main/Main';
import LoadingScreen from '../../shared-components/LoadingScreen';
import AdminModule from './Module/AdminModule';
import ModuleHeader from './Module/ModuleHeader';
import ModuleBody from './Module/ModuleBody';
import ModuleMovies from './Module/ModuleMovies';
import ModuleSeances from './Module/ModuleSeances';
import SetHallMap from './Halls/HallMap';

import Modal from '../../shared-components/Modal/Modal';

import HallList from './Halls/HallList';
import HallsSwitcher from './Halls/HallSwitcher';

import OpenSales from './Sales/OpenSales';
import UpdatePricesForm from '../forms/UpdatePrices';

import withCrud from '../../hoc/WithCrud';
import withAdminLogic from '../hoc/WithAdminLogic';
import withAdminState from '../hoc/WithAdminState';
import withLoadingScreen from '../../hoc/WithLoadingScreen';
import DragContext from '../../contexts/DragContext';

import styles from '../css/admin.module.css';

const AdminPage = (props) => {
  // Опять невероятное количество пропсов
  // Которые глаз не радуют
  const {
    onClose: handleModal,
    onAddShow: addShow,
    onAddMovie: addMovie,
    onAddHall: addHall,
    onDelete: handleDelete,
    onSubmit: updateHall,
    setActiveHall,
    setActiveHallMap,
    openSales,
    handleHeader,
    updatePrices,
    halls,
    shows,
    movies,
    headers,
    action,
    activeHall,
    itemToDelete,
    isModalActive,
    activeHallMap,
    isLoading,
    dragging,
    setDragging,
    droppedIn,
    setDroppedIn,
  } = props;

  // Слот который отображается, если есть залы
  const HasHallsSlot = (
    <>
      <AdminModule>
        <ModuleHeader
          header={headers[0]}
          onClick={handleHeader}
        />
        <ModuleBody>
          <HallList
            halls={halls}
            handleModal={handleModal}
          />
        </ModuleBody>
      </AdminModule>

      <AdminModule>
        <ModuleHeader
          header={headers[1]}
          onClick={handleHeader}
        />
        <ModuleBody>
          <HallsSwitcher
            halls={halls}
            activeHall={activeHall}
            setActiveHall={setActiveHall}
            setActiveHallMap={setActiveHallMap}
          />

          <SetHallMap
            activeHall={activeHall}
            onSubmit={updateHall}
            activeHallMap={activeHallMap}
            setActiveHallMap={setActiveHallMap}
          />
        </ModuleBody>
      </AdminModule>

      <AdminModule>
        <ModuleHeader
          header={headers[2]}
          onClick={handleHeader}
        />
        <ModuleBody>
          <HallsSwitcher
            halls={halls}
            activeHall={activeHall}
            setActiveHall={setActiveHall}
            setActiveHallMap={setActiveHallMap}
          />
          <UpdatePricesForm
            activeHall={activeHall}
            onSubmit={updatePrices}
          />
        </ModuleBody>
      </AdminModule>

      <AdminModule>
        <ModuleHeader
          header={headers[3]}
          onClick={handleHeader}
        />
        <ModuleBody>
          <p className={styles['conf-step__paragraph']}>
            <button
              type="button"
              className={`${styles['conf-step__button']} ${styles['conf-step__button-accent']}`}
              data-action="addMovie"
              onClick={handleModal}
            >
Добавить фильм
            </button>
          </p>
          <ModuleMovies movies={movies} />
          <AdminNav />
          <ModuleSeances
            halls={halls}
            shows={shows}
            onClick={handleModal}
          />
        </ModuleBody>
      </AdminModule>

      <AdminModule>
        <ModuleHeader
          header={activeHall.isOpen === 'false' ? headers[4] : headers[5]}
          onClick={handleHeader}
        />
        <ModuleBody isCentered>
          <HallsSwitcher
            halls={halls}
            activeHall={activeHall}
            setActiveHall={setActiveHall}
            setActiveHallMap={setActiveHallMap}
          />
          <OpenSales
            onOpen={openSales}
            title={activeHall.isOpen === 'false' ? 'Открыть продажу билетов' : 'Закрыть продажу билетов'}
          />
        </ModuleBody>
      </AdminModule>
    </>
  );

  // Слот который отображается, если нет залов
  const NoHallsSlot = (
    <AdminModule>
      <ModuleHeader
        header={headers[0]}
        onClick={handleHeader}
      />
      <ModuleBody>
        <HallList
          halls={halls}
          handleModal={handleModal}
        />
      </ModuleBody>
    </AdminModule>
  );


  return (
    <div className={styles['admin-ui']}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <DragContext.Provider value={{
          dragging, setDragging, droppedIn, setDroppedIn,
        }}
        >
          <Modal
            isModalActive={isModalActive}
            action={action}
            onClose={handleModal}
            onAddShow={addShow}
            onAddMovie={addMovie}
            onAddHall={addHall}
            itemToDelete={itemToDelete}
            onDelete={handleDelete}
            halls={halls}
            shows={shows}
          />
          <AdminHeader isAdminPage />
          <AdminMain isAdminPage>
            {halls.length === 0 ? NoHallsSlot : HasHallsSlot}
          </AdminMain>
        </DragContext.Provider>
      )}
    </div>
  );
};

AdminPage.propTypes = {
  isModalActive: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddShow: PropTypes.func.isRequired,
  onAddMovie: PropTypes.func.isRequired,
  onAddHall: PropTypes.func.isRequired,
  itemToDelete: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  halls: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeHall: PropTypes.object.isRequired,
  setActiveHall: PropTypes.func.isRequired,
  setActiveHallMap: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  activeHallMap: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  openSales: PropTypes.func.isRequired,
  handleHeader: PropTypes.func.isRequired,
  updatePrices: PropTypes.func.isRequired,
};

// Навешиваем много HOC-ов, чтобы вообще ничего понятно не было
// withCrud дает нам возможность общаться с сервером (делать CRUD)
// withAdminState дает все состояния
// withLoadingScreen дает загрузочный экран
// withAdminLogic дает логику для рута admin
export default withCrud(withAdminState(withLoadingScreen(withAdminLogic(AdminPage))));
