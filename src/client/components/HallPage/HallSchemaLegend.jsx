import React from 'react';
import PropTypes from 'prop-types';

// Легенда разметки зала
// Принимает объект зала
// Использует от туда цены для стандартных
// и вип кресел
function HallSchemaLegend({ hall }) {
  const { standardPrice, vipPrice } = hall;

  return (
    <div className="buying-scheme__legend">
      <div className="col">
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_standard" />
Свободно (
          <span className="buying-scheme__legend-value">{standardPrice}</span>
руб)
        </p>
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_vip" />
Свободно VIP (
          <span className="buying-scheme__legend-value">{vipPrice}</span>
руб)
        </p>
      </div>
      <div className="col">
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_taken" />
          {' '}
Занято (Недоступно)
        </p>
        <p className="buying-scheme__legend-price">
          <span className="buying-scheme__chair buying-scheme__chair_selected" />
          {' '}
Выбрано
        </p>
      </div>
    </div>
  );
}

HallSchemaLegend.propTypes = {
  hall: PropTypes.shape({
    standardPrice: PropTypes.number,
    vipPrice: PropTypes.number,
  }).isRequired,
};

export default HallSchemaLegend;
