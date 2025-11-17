

<template>
  <div v-if="movieStore.loading">loading...</div>
  <div v-else-if="movieStore.selectedMovie">
    <h1>{{ movieStore.selectedMovie.Title }}</h1>
    <img :src="movieStore.selectedMovie.Poster" alt="Poster" />
    <p><strong>Year:</strong> {{ movieStore.selectedMovie.Year }}</p>
    <p><strong>Genre:</strong> {{ movieStore.selectedMovie.Genre }}</p>
    <p><strong>Decsription:</strong> {{ movieStore.selectedMovie.Plot }}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '../store/movieStore';

const route = useRoute();
const movieStore = useMovieStore();

onMounted(() => {
  movieStore.fetchMovieDetail(route.params.id);
});
</script>
