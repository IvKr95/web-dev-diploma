import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DragContext from '../../../contexts/DragContext';

// Отображает отдельный фильм
function ModuleMovie({ movie }) {
  const {
    poster, name, duration,
  } = movie;

  // Используем контекст drag&drop
  // Устанавливаем элемент который драгаем
  const { setDragging } = useContext(DragContext);

  const handleDragStart = (event) => {
    const element = event.target;
    element.classList.add('hold');
    setDragging(name);
    setTimeout(() => element.classList.add('invisible'), 0);
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('hold');
    event.target.classList.remove('invisible');
  };

  return (
    <div
      className="conf-step__movie"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <img className="conf-step__movie-poster" src={poster} alt="poster" draggable="false" />
      <h3 className="conf-step__movie-title">{name}</h3>
      <p className="conf-step__movie-duration">{duration}</p>
    </div>
  );
}

ModuleMovie.propTypes = {
  movie: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModuleMovie;
