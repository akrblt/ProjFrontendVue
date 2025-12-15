<!--
  Composant carte pour afficher un aperçu d'un film dans une liste.
  Permet de naviguer vers la page de détail et d'ajouter/retirer des favoris.
-->
<template>
  <div class="movie-card">

    <!-- Contenu principal de la carte, cliquable pour voir les détails -->
    <div class="card-content" @click="goToDetail" @keyup.enter="goToDetail" tabindex="0" role="link">
      <img :src="movie.Poster" :alt="`Affiche de ${movie.Title}`" class="poster" />
      <h3>{{ movie.Title }}</h3>
      <p>{{ movie.Year }}</p>
    </div>

    <!-- Bouton pour ajouter ou retirer le film des favoris -->
    <button class="fav-btn" @click.stop="toggleFav">
      {{ isFav ? "🤍 Retirer des favoris" : "❤️ Ajouter aux favoris" }}
    </button>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/store/movieStore';
import { computed } from 'vue';

// Définit les props que le composant reçoit.
const props = defineProps({
  /** @type {object} L'objet film contenant les informations à afficher (Title, Year, Poster, imdbID). */
  movie: Object
});

const router = useRouter();
const store = useMovieStore();

/**
 * Navigue vers la page de détail du film correspondant.
 */
const goToDetail = () => {
  router.push(`/movie/${props.movie.imdbID}`);
};

/**
 * Propriété calculée pour vérifier si le film est actuellement dans les favoris.
 * @returns {boolean} - True si le film est un favori, sinon false.
 */
const isFav = computed(() =>
  store.isFavorite(props.movie.imdbID)
);

/**
 * Appelle l'action du store pour ajouter ou retirer le film des favoris.
 * L'événement de clic est stoppé (@click.stop) pour ne pas déclencher la navigation.
 */
const toggleFav = () => {
  store.toggleFavorite(props.movie);
};
</script>

<style scoped>
/* Style principal de la carte de film */
.movie-card {
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
  text-align: center;
  cursor:pointer;
  transition: transform 0.2s ease;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.movie-card {
  transform: scale(1.08);
}
.poster {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Le contenu cliquable de la carte */
.card-content {
  cursor: pointer;
  outline: none; /* Supprime le contour de focus par défaut, mais assurez-vous de la visibilité au focus */
}

/* Style au focus pour l'accessibilité */
.card-content:focus-visible {
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.5);
  border-radius: 8px;
}

.movie-card h3 {
  font-size: 1rem;
  margin: 10px 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-card p {
  margin: 0;
  color: #666;
}

/* Bouton pour les favoris */
.fav-btn {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.2s, color 0.2s;
}

.fav-btn:hover {
  background-color: #e50914;
  color: white;
  border-color: #e50914;
}
img {
  width: 100%;
  border-radius: 4px;
}

p {
  margin-top: 6px;
  font-size: 14px;
}
</style>
