<template>
  <div class="page-content-wrapper">
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
/* Grille responsive pour la liste des films */
.movie-list {
  display: grid;
  /* Configuration du responsive :
    - auto-fit : Crée autant de colonnes que possible.
    - minmax(200px, 1fr) : Chaque colonne doit faire au moins 200px (taille minimale de la carte)
      et prendra au maximum 1 fraction de l'espace restant (pour l'égalité des largeurs).
  */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 45px; /* L'espace entre les cartes */
}

@media (max-width: 600px) {
  /* Ajustement du padding général pour les petits écrans */
  .page-content-wrapper {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
