class Movie {
  constructor(id, movieData) {
    this.id = id;
    this.name = movieData.name;
    this.synopsis = movieData.synopsis;
    this.duration = movieData.duration;
    this.origin = movieData.origin;
    this.poster = movieData.poster;
  }
}

export default Movie;
