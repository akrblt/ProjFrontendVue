

<!--
  Page affichant les détails complets d'un film spécifique.
-->
<template>
  <div class="detail">

    <!-- Boutton retour -->
    <button class="back" @click="goBack">
      ← Retour
    </button>

    <!-- Affiche un message de chargement pendant la récupération des données -->
    <div v-if="movieStore.loading" class="loading-details">Chargement des détails...</div>

    <!-- Affiche les détails du film une fois qu'il est chargé -->
    <div v-else-if="movieStore.selectedMovie" class="movie-details-container">
      <h1>{{ movieStore.selectedMovie.Title }}</h1>
      <div class="details-content">
        <img :src="movieStore.selectedMovie.Poster" alt="Affiche du film" class="poster" />
        <div class="info">
          <p><strong>Année:</strong> {{ movieStore.selectedMovie.Year }}</p>
          <p><strong>Genre:</strong> {{ movieStore.selectedMovie.Genre }}</p>
          <p><strong>Synopsis:</strong> {{ movieStore.selectedMovie.Plot }}</p>
          <p><strong>Acteurs:</strong> {{ movieStore.selectedMovie.Actors }}</p>
          <p><strong>Note IMDb:</strong> {{ movieStore.selectedMovie.imdbRating }} / 10</p>
        </div>
      </div>
    </div>

    <!-- Affiche un message si aucun film n'est trouvé -->
    <div v-else class="error">
      Impossible de charger les informations pour ce film.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/store/movieStore';

// Récupère l'instance de la route actuelle pour accéder aux paramètres de l'URL
const route = useRoute();
//
const router = useRouter()
// Récupère l'instance du store Pinia pour accéder à l'état et aux actions
const movieStore = useMovieStore();

/**
 * Au moment où le composant est monté dans le DOM,
 * on lance la récupération des détails du film en utilisant l'ID
 * présent dans les paramètres de l'URL (route.params.id).
 */
onMounted(() => {
  movieStore.fetchMovieDetail(route.params.id);
});

const goBack = () => {
  router.back()
}
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

.loading-details, .error {
  text-align: center;
  font-size: 1.2rem;
  padding: 40px;
  color: #555;
}

.error {
  color: #c50000;
}

.movie-details-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.details-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.poster {
  max-width: 300px;
  height: auto;
  border-radius: 8px;
}

.info {
  flex: 1;
}

.info p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.info strong {
  color: #333;
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
