
<template>
  <div class="movie-card" @click="goToDetail">
    <img :src="movie.Poster" alt="Poster" class="poster" />
    <h3>{{ movie.Title }}</h3>
    <p>{{ movie.Year }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  movie: Object
});
const router = useRouter();

const goToDetail = () => {
  router.push(`/movie/${props.movie.imdbID}`);
};
</script>

<style scoped>
.movie-card {
  width: 200px;
  cursor: pointer;
  text-align: center;
}
.poster {
  width: 100%;
  height: auto;
}
</style>
