import { defineStore } from 'pinia';
import { searchMovies, getMovieDetail } from '../services/omdbApi';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,

    
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    history: JSON.parse(localStorage.getItem('history')) || [],
  }),

  actions: {
    async fetchMovies(query) {
      this.loading = true;
      this.error = null;
      this.movies = [];

      try {
        const data = await searchMovies(query);

        if (!data.Search) {
          this.error = "Film n'a pas été trouvé";
        } else {
          this.movies = data.Search;

          
          if (!this.history.includes(query)) {
            this.history.unshift(query);
            localStorage.setItem('history', JSON.stringify(this.history));
          }
        }
      } catch (e) {
        this.error = "Error d'API";
      }

      this.loading = false;
    },

    async fetchMovieDetail(id) {
      this.loading = true;
      try {
        this.selectedMovie = await getMovieDetail(id);
      } catch (e) {
        this.error = "Error details";
      }
      this.loading = false;
    },

    
    toggleFavorite(movie) {
      const index = this.favorites.findIndex(
        fav => fav.imdbID === movie.imdbID
      );

      if (index === -1) {
        this.favorites.push(movie);
      } else {
        this.favorites.splice(index, 1);
      }

      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },

    isFavorite(id) {
      return this.favorites.some(fav => fav.imdbID === id);
    }
,
    clearHistory() {
  this.history = [];
  localStorage.removeItem("history");
}

  }
});
