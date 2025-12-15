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

<style scoped>

.movie-list {
  padding: 50px;
  margin: 10px;
   background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}



</style>