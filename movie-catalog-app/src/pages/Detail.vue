<template>
  <SearchBar></SearchBar>
  <Loader v-if="movieStore.loading">loading...</Loader>
  <MovieDetail v-else-if="movieStore.selectedMovie"></MovieDetail>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '../store/movieStore';
import SearchBar from "@/components/SearchBar.vue";
import Loader from "@/components/Loader.vue";
import MovieDetail from "@/components/MovieDetail.vue";

const route = useRoute();
const movieStore = useMovieStore();

onMounted(() => {
  movieStore.fetchMovieDetail(route.params.id);
});
</script>
