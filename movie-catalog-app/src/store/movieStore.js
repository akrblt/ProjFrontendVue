import { defineStore } from 'pinia';
import { searchMovies, getMovieDetail } from '../services/omdbApi';
import { searchByGenre } from "../services/omdbApi";

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
                const data = await searchMovies(query);
                if (!data || data.Response === "False") {
                    this.error = "Le film n'a pas été trouvé";
                    return;
                }
                this.movies = data.Search || [];
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
                if (!result || result.Response === "False") {
                    this.error = "Le film n'a pas été trouvé";
                    return;
                }
                this.selectedMovie = result;
            } catch (err) {
                this.error = "Le film n'a pas été trouvé";
            } finally {
                this.loading = false;
            }
        },
       async fetchMoviesByCategory(category) {
  this.loading = true;
  this.error = null;

  try {
    const data = await searchMovies(category);

    if (!data || data.Response === "False") {
      this.movies = [];
      this.error = "Le film n'a pas été trouvé";
    } else {
      this.movies = data.Search;
    }

  } catch (e) {
    this.error = ".........";
  }

  this.loading = false;
}

        
    }
});