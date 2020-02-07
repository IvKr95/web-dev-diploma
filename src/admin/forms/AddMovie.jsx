/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import Movie from '../models/Movie';
import styles from '../css/admin.module.css';
import ModuleBtns from '../components/Module/ModuleBtns';

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
    onClose: handleClose,
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
    handleClose();
  };

  return (
    <form id="add-movie" onSubmit={handleSubmit}>
      <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="name">
Название фильма
        <input
          id="name"
          className={styles['conf-step__input']}
          type="text"
          placeholder="Например, &laquo;Гражданин Кейн&raquo;"
          name="name"
          value={movieData.name}
          onChange={handleChange}
        />
      </label>
      <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="synopsis">
Описание фильма
        <input
          id="synopsis"
          className={styles['conf-step__input']}
          type="text"
          placeholder="Например, &laquo;Когда-то давно...&raquo;"
          name="synopsis"
          value={movieData.synopsis}
          onChange={handleChange}
        />
      </label>
      <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="duration">
Длительность фильма
        <input
          id="duration"
          className={styles['conf-step__input']}
          type="text"
          placeholder="Например, &laquo;130 минут&raquo;"
          name="duration"
          value={movieData.duration}
          onChange={handleChange}
        />
      </label>
      <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="origin">
Страна
        <input
          id="origin"
          className={styles['conf-step__input']}
          type="text"
          placeholder="Например, &laquo;Россия&raquo;"
          name="origin"
          value={movieData.origin}
          onChange={handleChange}
        />
      </label>
      <label className={`${styles['conf-step__label']} ${styles['conf-step__label-fullsize']}`} htmlFor="poster">
Загрузить постер
        <input
          id="poster"
          className={styles['conf-step__input']}
          type="file"
          name="poster"
          onChange={handleChange}
        />
      </label>
      <ModuleBtns
        form="add-movie"
        onReset={handleClose}
        action="Добавить фильм"
        isInModal
      />
    </form>
  );
};

AddMovieForm.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddMovieForm;
