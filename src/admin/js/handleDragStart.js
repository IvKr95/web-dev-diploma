/* eslint-disable linebreak-style */
const handleDragStart = (e) => {
  const el = e.target;
  el.classList.add('hold');

  setTimeout(() => el.classList.add('invisible'), 0);
};

export default handleDragStart;
