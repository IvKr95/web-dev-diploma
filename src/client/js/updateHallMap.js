/* eslint-disable linebreak-style */

// Обновляет зал
// Если кресло выбранно меняет объект кресла
// Заменяет на противоположные значения
const updateHallMap = (map) => {
  for (const row of map) {
    for (const seat of row) {
      if (seat.isSelected) {
        seat.isAvail = !seat.isAvail;
        seat.isTaken = !seat.isTaken;
        seat.isSelected = !seat.isSelected;
      }
    }
  }
  return map;
};

export default updateHallMap;
