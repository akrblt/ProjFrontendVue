import { defineStore } from 'pinia';
import { searchMovies, getMovieDetail } from '@/services/omdbApi';

/**
 * Store pour la gestion des données relatives aux films.
 * Gère l'état des films, la sélection, le chargement, les favoris et l'historique de recherche.
 */
export const useMovieStore = defineStore('movie', {
  /**
   * État initial du store.
   * @returns {object} L'état initial.
   */
  state: () => ({
    /** @type {Array} Liste des films résultant d'une recherche. */
    movies: [],
    /** @type {object|null} Le film actuellement sélectionné pour l'affichage détaillé. */
    selectedMovie: null,
    /** @type {boolean} Indicateur de chargement pour les appels API. */
    loading: false,
    /** @type {string|null} Message d'erreur en cas de problème lors d'un appel API. */
    error: null,
    /** @type {Array} Liste des films favoris, persistée dans le localStorage. */
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    /** @type {Array<string>} Historique des requêtes de recherche, persisté dans le localStorage. */
    history: JSON.parse(localStorage.getItem('history')) || [],
  }),

  actions: {
    /**
     * Recherche des films via l'API en utilisant une requête.
     * Met à jour l'état des films, du chargement et des erreurs.
     * @param {string} query - Le terme de recherche pour les films.
     */
    async fetchMovies(query) {
      this.loading = true;
      this.error = null;
      this.movies = [];

      try {
        const data = await searchMovies(query);

        if (!data.Search) {
          this.error = "Aucun film n'a été trouvé pour cette recherche.";
        } else {
          this.movies = data.Search;

          // Ajoute la requête à l'historique si elle n'y est pas déjà
          if (!this.history.includes(query)) {
            this.history.unshift(query);
            localStorage.setItem('history', JSON.stringify(this.history));
          }
        }
      } catch (e) {
        this.error = "Une erreur est survenue lors de la communication avec l'API.";
      }

      this.loading = false;
    },

    /**
     * Récupère les détails d'un film spécifique par son ID.
     * @param {string} id - L'ID IMDb du film à récupérer.
     */
    async fetchMovieDetail(id) {
      this.loading = true;
      this.selectedMovie = null;
      try {
        this.selectedMovie = await getMovieDetail(id);
      } catch (e) {
        this.error = "Impossible de récupérer les détails du film.";
      }
      this.loading = false;
    },

    /**
     * Ajoute ou supprime un film de la liste des favoris.
     * @param {object} movie - L'objet film à ajouter ou supprimer.
     */
    toggleFavorite(movie) {
      const index = this.favorites.findIndex(
        fav => fav.imdbID === movie.imdbID
      );

      if (index === -1) {
        // Ajoute le film aux favoris s'il n'y est pas
        this.favorites.push(movie);
      } else {
        // Supprime le film des favoris s'il y est déjà
        this.favorites.splice(index, 1);
      }

      // Met à jour le localStorage pour persister les favoris
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },

    /**
     * Vérifie si un film est déjà dans les favoris.
     * @param {string} id - L'ID IMDb du film à vérifier.
     * @returns {boolean} - True si le film est en favori, sinon false.
     */
    isFavorite(id) {
      return this.favorites.some(fav => fav.imdbID === id);
    },

    /**
     * Efface tout l'historique de recherche.
     */
    clearHistory() {
      this.history = [];
      localStorage.removeItem("history");
    }
  }
});

