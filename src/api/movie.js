import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGFjNzI1MTA4Mjc2ZDkyM2RlMjQzOTE4NzUwNjJjNSIsInN1YiI6IjY1YjUwMjhhNGYzM2FkMDE3YTBiYTM1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DVikyztACIvDZrPSWL56RBOBtNnjH3jDZKwNSqkZN54',
  },
};

export const getMoviesDetails = id => {
  return instance.get(
    `/movie/${id}?language=en-US&api_key=d4ac725108276d923de24391875062c5`,
    options
  );
};

export const getMoviesCredits = id => {
  return instance.get(
    `/movie/${id}/credits?language=en-US&api_key=d4ac725108276d923de24391875062c5`,
    options
  );
};

export const getMoviesReviews = id => {
  return instance.get(
    `/movie/${id}/reviews?language=en-US&api_key=d4ac725108276d923de24391875062c5`,
    options
  );
};

export const searchMovies = (q, page = 1) => {
  return instance.get(
    `/search/movie?query=${q}&include_adult=false&language=en-US&page=${page}&api_key=d4ac725108276d923de24391875062c5`,
    options
  );
};