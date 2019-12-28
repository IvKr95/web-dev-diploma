import React from 'react';
import PropTypes from 'prop-types';

const HEADER_OPEN = 'conf-step__header conf-step__header_opened';
const HEADER_CLOSED = 'conf-step__header conf-step__header_closed';

function ConfStepHeader(props) {
  const { header, onClick: handleHeader } = props;

  return (
    <header
      className={
        header.isOpen ? HEADER_OPEN : HEADER_CLOSED
      }
      onClick={handleHeader}
      onKeyPress={handleHeader}
      role="tab"
      data-name={header.name}
      tabIndex={0}
    >
      <h2 className="conf-step__title">{header.name}</h2>
    </header>
  );
}

ConfStepHeader.propTypes = {
  header: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ConfStepHeader;
