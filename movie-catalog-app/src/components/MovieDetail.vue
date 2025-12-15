<template>
  <h1>{{ movieStore.selectedMovie.Title }}</h1>
  <img :src="movieStore.selectedMovie.Poster" alt="Poster" />
  <p><strong>Year:</strong> {{ movieStore.selectedMovie.Year }}</p>
  <p><strong>Genre:</strong> {{ movieStore.selectedMovie.Genre }}</p>
  <p><strong>Decsription:</strong> {{ movieStore.selectedMovie.Plot }}</p>
</template>
<script setup>
import {onMounted} from "vue";
import { useMovieStore } from '../store/movieStore';

const movieStore = useMovieStore();

onMounted(() => {
  movieStore.fetchMovieDetail(route.params.id);
});
</script>