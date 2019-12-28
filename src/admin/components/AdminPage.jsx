import React from 'react';
import PropTypes from 'prop-types';

import AdminHeader from './AdminPageElements/AdminHeader';
import AdminNav from './AdminPageElements/AdminNav';
import AdminMain from './AdminPageElements/AdminMain';
import AdminConfStep from './AdminPageElements/AdminConfStep';
import ConfStepHeader from './ConfSteps/ConfStepHeader';
import ConfStepBody from './ConfSteps/ConfStepBody';
import ConfStepMovies from './ConfSteps/ConfStepMovies';
import ConfStepSeances from './ConfSteps/ConfStepSeances';
import SetHallMap from './Halls/SetHallMap';

import Modal from './Modal/Modal';
import ModalHeader from './Modal/ModalHeader';
import ModalBody from './Modal/ModalBody';

import HallList from './Halls/HallList';
import ConfigHalls from './Halls/ConfigHalls';
import ConfigPrices from './Prices/ConfigPrices';
import HallsSwitcher from './Halls/HallsSwitcher';

import ConfigShows from './Shows/ConfigShows';
import OpenSales from './Sales/OpenSales';
import UpdatePricesForm from './Forms/UpdatePricesForm';

import '../css/admin.css';
import withCrud from '../../hoc/WithCrud';
import withAdminLogic from '../../hoc/WithAdminLogic';
import withAdminState from '../../hoc/WithAdminState';

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
    setChosen,
    halls,
    shows,
    movies,
    headers,
    action,
    activeHall,
    itemToDelete,
    isModalActive,
    activeHallMap,
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
      <AdminConfStep>
        <ConfStepHeader
          header={headers[0]}
          onClick={handleHeader}
        />
        <ConfStepBody>
          <HallList
            halls={halls}
            handleModal={handleModal}
          />
        </ConfStepBody>
      </AdminConfStep>

      <AdminConfStep>
        <ConfStepHeader
          header={headers[1]}
          onClick={handleHeader}
        />
        <ConfStepBody>
          <ConfigHalls>

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

          </ConfigHalls>
        </ConfStepBody>
      </AdminConfStep>

      <AdminConfStep>
        <ConfStepHeader
          header={headers[2]}
          onClick={handleHeader}
        />
        <ConfStepBody>
          <ConfigPrices>
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
          </ConfigPrices>
        </ConfStepBody>
      </AdminConfStep>

      <AdminConfStep>
        <ConfStepHeader
          header={headers[3]}
          onClick={handleHeader}
        />
        <ConfStepBody>
          <ConfigShows>
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
            <ConfStepMovies movies={movies} />
            <AdminNav
              setChosen={setChosen}
            />
            <ConfStepSeances
              halls={halls}
              shows={shows}
              onClick={handleModal}
            />
          </ConfigShows>
        </ConfStepBody>
      </AdminConfStep>

      <AdminConfStep>
        <ConfStepHeader
          header={activeHall.isOpen === 'false' ? headers[4] : headers[5]}
          onClick={handleHeader}
        />
        <ConfStepBody isCentered>
          <OpenSales
            onSubmit={openSales}
            title={activeHall.isOpen === 'false' ? 'Открыть продажу билетов' : 'Закрыть продажу билетов'}
          />
        </ConfStepBody>
      </AdminConfStep>
    </>
  );

  const NoHallsSlot = (
    <>
      <AdminConfStep>
        <ConfStepHeader
          header={headers[0]}
          onClick={handleHeader}
        />
        <ConfStepBody>
          <HallList
            halls={halls}
            handleModal={handleModal}
          />
        </ConfStepBody>
      </AdminConfStep>
    </>
  );


  return (
    <>
      {ModalSlot}
      <AdminHeader />
      <AdminMain>
        {halls.length === 0 ? NoHallsSlot : HasHallsSlot}
      </AdminMain>
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
  activeHallMap: PropTypes.array.isRequired,
  movies: PropTypes.arrayOf.isRequired,
  setChosen: PropTypes.func.isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  openSales: PropTypes.func.isRequired,
  handleHeader: PropTypes.func.isRequired,
  updatePrices: PropTypes.func.isRequired,
};


export default withCrud(withAdminState(withAdminLogic(AdminPage)));
