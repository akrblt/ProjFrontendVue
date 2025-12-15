
<template>
  <div>
    <SearchBar />
    <Loader v-if="loading">loading...</Loader>
    <div v-if="error">{{ movieStore.error }}</div>
    <div v-else-if=" movies && movies.length" class="movie-list">
      <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../../../movie-catalog-app/src/components/SearchBar.vue';
import MovieCard from '../../../movie-catalog-app/src/components/MovieCard.vue';
import Loader from '../../../movie-catalog-app/src/components/Loader.vue';
import { useMovieStore } from '../store/movieStore';
import { toRefs} from 'vue';

const movieStore = useMovieStore();

const { movies, loading, error} = toRefs(movieStore)
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

