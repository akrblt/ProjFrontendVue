
import axios from 'axios';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = import.meta.env.VITE_OMDB_BASE_URL;

export const searchMovies = async (query) => {
  const response = await axios.get(baseURL, {
    params: {
      s: query,
      apikey: apiKey
    }
  });
  return response.data;
};

export const getMovieDetail = async (id) => {
  const response = await axios.get(baseURL, {
    params: {
      i: id,
      apikey: apiKey
    }
  });
  return response.data;
};
