
import axios from 'axios';
import { reactive } from 'vue';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = import.meta.env.VITE_OMDB_BASE_URL;

const genreMap = {
  action: "Action",
  romance: "Romance",
  science: "Sci-Fi"
};

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

export const searchByGenre = async (type) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const baseURL = import.meta.env.VITE_OMDB_BASE_URL;

  const keywordMap = {
    action: "action",
  
    science: "sci-fi"
  };

  const keyword = keywordMap[type] || type;

  const response = await axios.get(baseURL, {
    params: {
      s: keyword,
      apikey: apiKey
    }
  });

  if (!response.data.Search) return [];

  
  return response.data.Search.slice(0, 20); 
};
