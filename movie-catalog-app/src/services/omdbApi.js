import axios from 'axios';
import { reactive } from 'vue';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = import.meta.env.VITE_OMDB_BASE_URL;

const genreMap = {
  action: "Action",
  romance: "Romance",
  science: "Sci-Fi"
};

// -----------------------------
// SEARCH MOVIES (LIST)
// -----------------------------
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        s: query,
        apikey: apiKey
      }
    });

    // OMDb returns 200 even on error.
    if (response.data.Response === "False") {
      return {
        success: false,
        data: [],
        error: response.data.Error
      };
    }

    return {
      success: true,
      data: response.data.Search
    };

  } catch (error) {
    return {
      success: false,
      data: [],
      error: "Erreur réseau ou serveur."
    };
  }
};


// -----------------------------
// MOVIE DETAIL
// -----------------------------
export const getMovieDetail = async (id) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        i: id,
        apikey: apiKey
      }
    });

    if (response.data.Response === "False") {
      return {
        success: false,
        data: null,
        error: response.data.Error
      };
    }

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Erreur réseau ou serveur."
    };
  }
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
