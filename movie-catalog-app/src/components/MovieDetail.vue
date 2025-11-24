<template>
  <div v-if="loading" class="loading">
    Loading...
  </div>

  <div v-else-if="error" class="error">
    {{ error }}
  </div>

  <div v-else class="movie-detail-container">
    <div class="poster-container">
      <img :src="movie.Poster" alt="Poster" class="poster" />
    </div>

    <div class="info-container">
      <h1>{{ movie.Title }}</h1>
      <p><strong>Year:</strong> {{ movie.Year }}</p>
      <p><strong>Genre:</strong> {{ movie.Genre }}</p>
      <p><strong>Director:</strong> {{ movie.Director }}</p>
      <p><strong>Actors:</strong> {{ movie.Actors }}</p>
      <p><strong>Plot:</strong> {{ movie.Plot }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '../store/movieStore';

const route = useRoute();
const movieStore = useMovieStore();

const movieId = route.params.id;

const movie = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    await movieStore.fetchMovieDetail(movieId);
    movie.value = movieStore.selectedMovie;
    error.value = movieStore.error;
  } catch (e) {
    error.value = "Film bilgisi yüklenemedi";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.movie-detail-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}

.poster-container {
  flex: 1 1 300px;
  text-align: center;
}

.poster {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.info-container {
  flex: 2 1 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.info-container h1 {
  margin-bottom: 15px;
  font-size: 2em;
}

.info-container p {
  margin-bottom: 10px;
  line-height: 1.5;
}

.loading, .error {
  text-align: center;
  font-size: 1.2em;
  margin-top: 50px;
  color: #333;
}

/* Responsive: mobilde alt alta */
@media (max-width: 768px) {
  .movie-detail-container {
    flex-direction: column;
    align-items: center;
  }

  .info-container {
    text-align: center;
  }
}
</style>
