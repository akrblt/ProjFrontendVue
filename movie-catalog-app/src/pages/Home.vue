
<template>
  <div>
    <SearchBar />
    <Loader v-if="movieStore.loading">loading...</Loader>
    <div v-if="movieStore.error">{{ movieStore.error }}</div>
    <div class="movie-list">
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
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

