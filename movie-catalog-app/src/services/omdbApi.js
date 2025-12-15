
import axios from 'axios';

// Récupération des informations de l'API depuis les variables d'environnement
const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = import.meta.env.VITE_OMDB_BASE_URL;

/**
 * Recherche des films par un terme de recherche (titre).
 * @param {string} query - Le titre ou une partie du titre du film à rechercher.
 * @returns {Promise<object>} - Une promesse qui résout avec les données de la réponse de l'API (contient la liste des films).
 */
export const searchMovies = async (query) => {
  const response = await axios.get(baseURL, {
    params: {
      s: query, // 's' est le paramètre pour la recherche par titre dans l'API OMDB
      apikey: apiKey
    }
  });
  return response.data;
};

/**
 * Récupère les détails complets d'un film en utilisant son ID IMDb.
 * @param {string} id - L'ID IMDb unique du film.
 * @returns {Promise<object>} - Une promesse qui résout avec l'objet complet des détails du film.
 */
export const getMovieDetail = async (id) => {
  const response = await axios.get(baseURL, {
    params: {
      i: id, // 'i' est le paramètre pour la recherche par ID dans l'API OMDB
      apikey: apiKey
    }
  });
  return response.data;
};

/**
 * Recherche des films basés sur un type de genre.
 * Fait correspondre un type simple (ex: 'action') à un mot-clé de recherche pour l'API.
 * @param {string} type - Le genre de film à rechercher (ex: 'action', 'science').
 * @returns {Promise<Array>} - Une promesse qui résout avec un tableau de 20 films maximum correspondant au genre.
 */
export const searchByGenre = async (type) => {
  // Mappe les types de genre de l'application aux mots-clés de recherche de l'API
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

  // Si la réponse ne contient pas de résultats, retourne un tableau vide
  if (!response.data.Search) return [];

  // Retourne seulement les 20 premiers résultats pour ne pas surcharger l'affichage
  return response.data.Search.slice(0, 20);
};
