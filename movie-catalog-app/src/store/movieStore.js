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
        }
    }
});