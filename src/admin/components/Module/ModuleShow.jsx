/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

const SHOW_MOVIE_CSS = {
  width: '60px',
  backgroundColor: 'rgb(133, 255, 137)',
};

function ModuleShow(props) {
  const {
    show,
    hallName,
    onClick: handleModal,
  } = props;
  const [mm, ss] = show.time.split(':');
  const leftPos = (mm * 30) + ((ss * 30) / 60);

  return (
    show.hall === hallName
        && (
        <div
          className="conf-step__seances-movie"
          key={show.showId}
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
          <p className="conf-step__seances-movie-title">{show.movie}</p>
          <p className="conf-step__seances-movie-start">{show.time}</p>
        </div>
        )
  );
}

ModuleShow.propTypes = {

};

export default ModuleShow;
