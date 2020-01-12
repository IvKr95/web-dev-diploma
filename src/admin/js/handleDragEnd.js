/* eslint-disable linebreak-style */
const handleDragEnd = (e) => {
  e.target.classList.remove('hold');
  e.target.classList.remove('invisible');
};

export default handleDragEnd;
