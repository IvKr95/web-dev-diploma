/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

const SHOW_MOVIE_CSS = {
  width: '60px',
  backgroundColor: 'rgb(133, 255, 137)',
};

// Компонент для одного сеанса
function ModuleShow(props) {
  const {
    show,
    hallName,
    onClick: handleModal,
  } = props;
  // Разбиваем минуты и секунда в массив
  // И испльзуем значения для отступа от левого края
  // Расчитывается по формуле ниже
  const [mm, ss] = show.time.split(':');
  // Вот формула
  const leftPos = (mm * 30) + ((ss * 30) / 60);

  return (
    show.hall === hallName
        && (
        <div
          className="conf-step__seances-movie"
          style={{ ...SHOW_MOVIE_CSS, left: `${leftPos}px` }}
        >
          <button
            type="button"
            className="conf-step__seances-movie__dismiss"
            data-action="deleteShowTime"
            onClick={(e) => handleModal(e, show)}
          >
            <span>&times;</span>
          </button>
          <p className="conf-step__seances-movie-title">{show.movieName}</p>
          <p className="conf-step__seances-movie-start">{show.time}</p>
        </div>
        )
  );
}

ModuleShow.propTypes = {
  show: PropTypes.shape({
    hall: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  hallName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ModuleShow;
