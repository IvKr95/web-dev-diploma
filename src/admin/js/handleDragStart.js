/* eslint-disable linebreak-style */

const handleDragStart = (event) => {
  const element = event.target;
  element.classList.add('hold');

  setTimeout(() => element.classList.add('invisible'), 0);
};

export default handleDragStart;
