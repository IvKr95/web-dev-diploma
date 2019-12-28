class Show {
  constructor(id, showData) {
    this.id = id;
    this.hall = showData.hall;
    this.date = showData.date;
    this.startTime = showData.time;
    this.movie = showData.movie;
    this.hallMap = showData.hallMap;
  }
}

export default Show;
