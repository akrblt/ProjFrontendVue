
<template>
  <div>
    <SearchBar />
    <div v-if="movieStore.loading">loading...</div>
    <div v-if="movieStore.error">{{ movieStore.error }}</div>
    <div class="movie-list">
      <MovieCard v-for="movie in movieStore.movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue';
import MovieCard from '../components/MovieCard.vue';
import { useMovieStore } from '../store/movieStore';

const movieStore = useMovieStore();
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

