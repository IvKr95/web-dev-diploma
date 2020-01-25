/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

// Здесь открываем или закрываем зал для продаж
function OpenSales(props) {
  const {
    onOpen: openSales,
    title,
  } = props;

  return (
    <>
      <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
      <button
        type="button"
        className="conf-step__button conf-step__button-accent"
        data-action="openSales"
        onClick={openSales}
      >
        {title}
      </button>
    </>
  );
}

OpenSales.propTypes = {
  onOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default OpenSales;
