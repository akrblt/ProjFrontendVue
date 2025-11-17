
<template>
  <div>
    <SearchBar />
    <div v-if="movieStore.loading" class="loading">loading...</div>
    <div v-else-if="movieStore.error" class="error">{{movieStore.error}}</div>
    <div v-else class="movie-list">
      <MovieCard v-for="movie in movieStore.movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../../../movie-catalog-app/src/components/SearchBar.vue';
import MovieCard from '../../../movie-catalog-app/src/components/MovieCard.vue';
import { useMovieStore } from '../store/movieStore';

const movieStore = useMovieStore();
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
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
</style>

