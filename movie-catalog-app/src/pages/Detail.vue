<template>
  <div class="detail">

    <!-- Geri Dön -->
    <button class="back" @click="goBack">
      ← Retour
    </button>

    <div v-if="movieStore.loading" class="loading">
      Chargement...
    </div>

    <div v-else-if="movieStore.selectedMovie" class="content">
      <img
        :src="movieStore.selectedMovie.Poster"
        alt="Poster"
        class="poster"
      />

      <div class="info">
        <h1>{{ movieStore.selectedMovie.Title }}</h1>

        <p class="meta">
          {{ movieStore.selectedMovie.Year }} •
          {{ movieStore.selectedMovie.Genre }}
        </p>

        <p class="plot">
          {{ movieStore.selectedMovie.Plot }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '../store/movieStore'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

const goBack = () => {
  router.back()
}

onMounted(() => {
  movieStore.fetchMovieDetail(route.params.id)
})
</script>

<style scoped>
.detail {
  padding: 40px;
  color: #e5e5e5;
}

.back {
  background: none;
  border: none;
  color: #e5e5e5;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  opacity: 0.8;
}

.back:hover {
  opacity: 1;
}

.loading {
  opacity: 0.7;
}

.content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.poster {
  width: 280px;
  border-radius: 6px;
}

.info {
  max-width: 600px;
}

.info h1 {
  margin: 0 0 10px;
  font-size: 32px;
}

.meta {
  opacity: 0.7;
  margin-bottom: 16px;
}

.plot {
  line-height: 1.6;
}

/* Mobil */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .poster {
    width: 100%;
    max-width: 320px;
  }
}
</style>
