/* eslint-disable linebreak-style */

// Обновляет зал
// Если кресло выбранно меняет объект кресла
// Заменяет на противоположные значения
const updateHallMap = (map) => {
  const mapCopy = [...map];

  for (const row of mapCopy) {
    for (const seat of row) {
      if (seat.isSelected) {
        seat.isAvail = !seat.isAvail;
        seat.isTaken = !seat.isTaken;
        seat.isSelected = !seat.isSelected;
      }
    }
  }

  return mapCopy;
};

export default updateHallMap;
