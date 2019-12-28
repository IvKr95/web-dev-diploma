import React from 'react';
import PropTypes from 'prop-types';

function OpenSales(props) {
  const { onSubmit: openSales, title } = props;

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
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default OpenSales;
