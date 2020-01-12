/* eslint-disable linebreak-style */
const handleDrop = (e) => {
  e.target.classList.remove('hold');
  handleModal(e);
};

export default handleDrop;
