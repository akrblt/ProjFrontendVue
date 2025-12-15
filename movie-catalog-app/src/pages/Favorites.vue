<template>
  <div>
    <h2>My Favorites</h2>

    <div class="movie-list">
      <MovieCard
        v-for="movie in store.favorites"
        :key="movie.imdbID"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "../store/movieStore";
import MovieCard from "../components/MovieCard.vue";

const store = useMovieStore();
</script>
