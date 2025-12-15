
import { defineStore } from 'pinia';
import { searchMovies, getMovieDetail } from '../services/omdbApi.js';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchMovies(query) {
        if (!query || query.trim().length < 3) {
            this.movies = [];
            this.error = "Veuillez entrer au moins 3 caractères pour la recherche.";
            return;
        }
        this.loading = true;

      try {
        const data = await searchMovies(query);
        this.movies = data.Search || [];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchMovieDetail(id) {
      this.loading = true;
      try {
        this.selectedMovie = await getMovieDetail(id);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
