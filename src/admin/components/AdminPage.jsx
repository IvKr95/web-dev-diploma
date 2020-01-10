/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React from 'react';
import PropTypes from 'prop-types';

import AdminHeader from '../../shared-components/Header';
import AdminNav from '../../shared-components/Nav';
import AdminMain from '../../shared-components/Main';
import AdminModule from './Module/AdminModule';
import ModuleHeader from './Module/ModuleHeader';
import ModuleBody from './Module/ModuleBody';
import ModuleMovies from './Module/ModuleMovies';
import ModuleSeances from './Module/ModuleSeances';
import SetHallMap from './Halls/SetHallMap';

import Modal from './Modal/Modal';
import ModalHeader from './Modal/ModalHeader';
import ModalBody from './Modal/ModalBody';

import HallList from './Halls/HallList';
import HallsSwitcher from './Halls/HallSwitcher';

import OpenSales from './Sales/OpenSales';
import UpdatePricesForm from './Forms/UpdatePrices';

import withCrud from '../../hoc/WithCrud';
import withAdminLogic from '../hoc/WithAdminLogic';
import withAdminState from '../hoc/WithAdminState';
import '../css/admin.css';
import withLoadingScreen from '../../hoc/WithLoadingScreen';

const AdminPage = (props) => {
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
  } = props;

  const ModalSlot = (
    <Modal isModalActive={isModalActive}>
      <ModalHeader action={action} onClose={handleModal} />

      <ModalBody
        action={action}
        onAddShow={addShow}
        onAddMovie={addMovie}
        onAddHall={addHall}
        onClose={handleModal}
        itemToDelete={itemToDelete}
        onDelete={handleDelete}
        halls={halls}
      />
    </Modal>
  );

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
          <p className="conf-step__paragraph">
            <button
              type="button"
              className="conf-step__button conf-step__button-accent"
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
          <OpenSales
            onOpen={openSales}
            title={activeHall.isOpen === 'false' ? 'Открыть продажу билетов' : 'Закрыть продажу билетов'}
          />
        </ModuleBody>
      </AdminModule>
    </>
  );

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
    <>
      {isLoading ? (
        <div className="loading">
          <div className="loader" />
        </div>
      ) : (
        <>
          {ModalSlot}
          <AdminHeader isAdminPage />
          <AdminMain isAdminPage>
            {halls.length === 0 ? NoHallsSlot : HasHallsSlot}
          </AdminMain>
        </>
      )}
    </>
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
  movies: PropTypes.arrayOf.isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  openSales: PropTypes.func.isRequired,
  handleHeader: PropTypes.func.isRequired,
  updatePrices: PropTypes.func.isRequired,
};


export default withCrud(withAdminState(withLoadingScreen(withAdminLogic(AdminPage))));
