/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import Movie from '../admin/models/Movie';

const DEFAULT_MOVIE_DATA = {
  name: '',
  synopsis: '',
  duration: '',
  origin: '',
  poster: null,
};

// Форма добавления фильма
const AddMovieForm = (props) => {
  const {
    onAddMovie: addMovie,
    onClose: handleModal,
  } = props;

  const [movieData, setMovieData] = useState(DEFAULT_MOVIE_DATA);

  const handleChange = (event) => {
    const value = event.target.files ? event.target.files[0] : event.target.value;
    const { name } = event.target;

    setMovieData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const movie = new Movie(nanoid(), movieData);
    addMovie(movie);
    setMovieData(DEFAULT_MOVIE_DATA);
    handleModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
Название фильма
        <input
          id="name"
          className="conf-step__input"
          type="text"
          placeholder="Например, &laquo;Гражданин Кейн&raquo;"
          name="name"
          value={movieData.name}
          onChange={handleChange}
        />
      </label>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="synopsis">
Описание фильма
        <input
          id="synopsis"
          className="conf-step__input"
          type="text"
          placeholder="Например, &laquo;Когда-то давно...&raquo;"
          name="synopsis"
          value={movieData.synopsis}
          onChange={handleChange}
        />
      </label>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration">
Длительность фильма
        <input
          id="duration"
          className="conf-step__input"
          type="text"
          placeholder="Например, &laquo;130 минут&raquo;"
          name="duration"
          value={movieData.duration}
          onChange={handleChange}
        />
      </label>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="origin">
Страна
        <input
          id="origin"
          className="conf-step__input"
          type="text"
          placeholder="Например, &laquo;Россия&raquo;"
          name="origin"
          value={movieData.origin}
          onChange={handleChange}
        />
      </label>
      <label className="conf-step__label conf-step__label-fullsize" htmlFor="poster">
Загрузить постер
        <input
          id="poster"
          className="conf-step__input"
          type="file"
          name="poster"
          onChange={handleChange}
        />
      </label>
      <div className="conf-step__buttons text-center">
        <input
          type="submit"
          value="Добавить фильм"
          className="conf-step__button conf-step__button-accent"
        />
        <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleModal}>Отменить</button>
      </div>
    </form>
  );
};

AddMovieForm.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddMovieForm;
