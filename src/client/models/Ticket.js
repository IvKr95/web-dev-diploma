/* eslint-disable linebreak-style */

// Класс для создания экземляра билета
class Ticket {
  constructor(row, seat, type, price) {
    this.row = row;
    this.seat = seat;
    this.seatType = type;
    this.price = price;
  }
}

export default Ticket;
