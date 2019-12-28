import React from 'react';
import PropTypes from 'prop-types';

function ConfStepBtns(props) {
  const { form, onReset: handleReset } = props;

  return (
    <fieldset className="conf-step__buttons text-center">
      <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleReset}>Отмена</button>
      <input className="conf-step__button conf-step__button-accent" type="submit" value="Сохранить" form={form} />
    </fieldset>
  );
}

ConfStepBtns.propTypes = {
  form: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ConfStepBtns;
