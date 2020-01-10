import React from 'react';
import PropTypes from 'prop-types';
import handleDragEnter from '../../js/handleDragEnter';
import handleDragLeave from '../../js/handleDragLeave';
import handleDragOver from '../../js/handleDragOver';

const css = {
  width: '60px',
  backgroundColor: 'rgb(133, 255, 137)',
};

function ConfStepSeances(props) {
  const { halls, shows, onClick: handleModal } = props;

  const handleDrop = (e) => {
    e.target.classList.remove('hold');
    handleModal(e);
  };

  return (
    <div className="conf-step__seances">
      {
        halls.map(
          (hall) => (
            <div className="conf-step__seances-hall" key={hall.hallName}>
              <h3 className="conf-step__seances-title">{hall.hallName}</h3>
              <div
                className="conf-step__seances-timeline"
                data-action="addShowTime"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {
                  shows.map((show) => {
                    const [mm, ss] = show.time.split(':');
                    const leftPos = (mm * 30) + ((ss * 30) / 60);

                    return (
                      show.hall === hall.hallName
                        && (
                          <div
                            className="conf-step__seances-movie"
                            key={show.showId}
                            style={{ ...css, left: `${leftPos}px` }}
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
                  })
                }
              </div>
            </div>
          ),
        )
      }
    </div>
  );
}

ConfStepSeances.propTypes = {
  halls: PropTypes.arrayOf(PropTypes.object).isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConfStepSeances;
