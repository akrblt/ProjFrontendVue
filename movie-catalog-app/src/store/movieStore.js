import { defineStore } from 'pinia';
import { searchMovies, getMovieDetail } from '../services/omdbApi';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchMovies(query) {
      this.loading = true;
      this.error = null;
      this.movies = [];
      try {
        const result = await searchMovies(query);

        if (!result.success || result.data.length === 0) {
          this.error = "Le film n'a pas été trouvé";
          return;
        }

        this.movies = result.data;
      } catch (err) {
        this.error = "Le film n'a pas été trouvé";
      } finally {
        this.loading = false;
      }
    },

    async fetchMovieDetail(id) {
      this.loading = true;
      this.error = null;
      this.selectedMovie = null;
      try {
        const result = await getMovieDetail(id);

        if (!result.success || !result.data) {
          this.error = "Le film n'a pas été trouvé";
          return;
        }

        this.selectedMovie = result.data;
      } catch (err) {
        this.error = "Le film n'a pas été trouvé";
      } finally {
        this.loading = false;
      }
    }
  }
});
