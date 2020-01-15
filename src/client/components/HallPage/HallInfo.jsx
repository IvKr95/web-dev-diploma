import React from 'react';
import PropTypes from 'prop-types';

function HallInfo({ data }) {
  const { movieName, time, hall } = data;

  return (
    <div className="buying__info">
      <div className="buying__info-description">
        <h2 className="buying__info-title">{movieName}</h2>
        <p className="buying__info-start">
Начало сеанса:
          {' '}
          {time.time}
        </p>
        <p className="buying__info-hall">{hall}</p>
      </div>
      <div className="buying__info-hint">
        <p>
Тапните дважды,
          <br />
чтобы увеличить
        </p>
      </div>
    </div>
  );
}

HallInfo.propTypes = {
  data: PropTypes.shape({
    movieName: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
    hall: PropTypes.string.isRequired,
  }).isRequired,
};

export default HallInfo;
