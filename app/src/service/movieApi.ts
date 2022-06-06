import axios from 'axios';
import { MovieDto } from '../MovieDto';

const apiHost = import.meta.env.VITE_API_HOST;

function createOrUpdateMovie(movie: MovieDto) {
  if (movie.objectID) {
    return updateMovie(movie);
  }

  return createMovie(movie);
}

function createMovie(movie: MovieDto) {
  return axios.post(`${apiHost}/v1/movies`, movie, {
    validateStatus: function (status) {
      return status === 201;
    },
  });
}

function deleteMovie(objectID: any) {
  return axios.delete(`${apiHost}/v1/movies/${objectID}`, {
    validateStatus: function (status) {
      return status === 200;
    },
  });
}

async function updateMovie(movie: MovieDto) {
  return axios.put(`${apiHost}/v1/movies/${movie.objectID}`, movie, {
    validateStatus: function (status) {
      return status === 200;
    },
  });
}

export { createOrUpdateMovie, deleteMovie };