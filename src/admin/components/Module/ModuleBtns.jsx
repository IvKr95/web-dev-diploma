/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/admin.module.css';

// Кнопки формы
// Неуверен, что их вообще целесообразно выносить, но пока так
function ModuleBtns(props) {
  const {
    form,
    action,
    isInModal,
    onReset: handleReset,
  } = props;

  if (isInModal) {
    return (
      <div className={`${styles['conf-step__buttons']} ${styles['text-center']}`}>
        <button type="button" className={`${styles['conf-step__button']} ${styles['conf-step__button-regular']}`} onClick={handleReset}>Отмена</button>
        <input type="submit" className={`${styles['conf-step__button']} ${styles['conf-step__button-accent']}`} value={action} form={form} />
      </div>
    );
  }
  return (
    <fieldset className={`${styles['conf-step__buttons']} ${styles['text-center']}`}>
      <button type="button" className={`${styles['conf-step__button']} ${styles['conf-step__button-regular']}`} onClick={handleReset}>Отмена</button>
      <input type="submit" className={`${styles['conf-step__button']} ${styles['conf-step__button-accent']}`} value={action} form={form} />
    </fieldset>
  );
}

ModuleBtns.propTypes = {
  form: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ModuleBtns;
