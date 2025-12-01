
<template>
  <div>
    <SearchBar />
    <Loader v-if="movieStore.loading">loading...</Loader>
    <div v-else-if="movieStore.error" class="error">{{movieStore.error}}</div>
    <div v-else class="movie-list">
      <MovieCard v-for="movie in movieStore.movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../../../movie-catalog-app/src/components/SearchBar.vue';
import MovieCard from '../../../movie-catalog-app/src/components/MovieCard.vue';
import Loader from '../../../movie-catalog-app/src/components/Loader.vue';
import { useMovieStore } from '../store/movieStore';

const movieStore = useMovieStore();
</script>

<style scoped>
.loading {
  color: #444;
  font-style: italic;
  padding: 10px;
}
.error {
  background-color: #ffe6e6;
  color: #c50000;
  padding: 12px 18px;
  border-left: 4px solid #c50000;
  border-radius: 4px;
  margin: 10px 0;
  font-weight: 500;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
