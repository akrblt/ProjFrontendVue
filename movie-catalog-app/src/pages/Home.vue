<!--
  Page d'accueil de l'application.
  Affiche une barre de recherche, des options de tri/filtre et la liste des films.
  Peut également afficher une catégorie de films si une 'prop' est fournie par l'URL.
-->
<template>
  <div class="page-content-wrapper">
    <section class="welcome">
      <h1>Bienvenue 👋</h1>
      <p>Découvrez des films que vous allez adorer</p>
    </section>
    <div>
      <!-- Section pour trier et filtrer les résultats -->
      <div class="filters">
        <!-- Sélecteur pour le type de tri -->
        <select v-model="sortType" aria-label="Trier les films">
          <option value="---">---</option>
          <option value="az">Titre (A-Z)</option>
          <option value="za">Titre (Z-A)</option>
          <option value="oldest">Plus anciens</option>
          <option value="newest">Plus récents</option>
        </select>

        <!-- Champ pour filtrer les films par année -->
        <input
          v-model="yearFilter"
          placeholder="Filtrer par année (ex: 2023)"
          aria-label="Filtrer par année"
        />
      </div>

      <!-- Affiche un message de chargement pendant la récupération des données -->
      <div v-if="movieStore.loading" class="loading">Chargement en cours...<Loader /> </div>

      <!-- Affiche un message d'erreur si la récupération échoue -->
      <div v-else-if="movieStore.error" class="error">
        {{ movieStore.error }}
      </div>

      <!-- Affiche la liste des films si la récupération est réussie -->
      <div v-else class="movie-list">
        <MovieCard
          v-for="movie in sortedAndFilteredMovies"
          :key="movie.imdbID"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue';
import { useMovieStore } from '@/store/movieStore';
import { onMounted, watch, ref, computed } from 'vue';
import Loader from "@/components/Loader.vue";

const movieStore = useMovieStore();

// Définit les props que le composant peut recevoir (utilisé pour les catégories)
const props = defineProps({
  /** @type {string|undefined} Le type de catégorie à afficher (ex: 'action') */
  type: String
});

// États locaux pour les contrôles de tri et de filtre
const sortType = ref("---"); // Type de tri sélectionné
const yearFilter = ref(""); // Année entrée pour le filtre

/**
 * Propriété calculée qui retourne les films triés et filtrés.
 * @returns {Array} La liste des films prêts à être affichés.
 */
const sortedAndFilteredMovies = computed(() => {
  // Étape 1 : Dédoublonner les films en utilisant leur imdbID
  const uniqueMap = new Map();
  movieStore.movies.forEach(movie => {
    uniqueMap.set(movie.imdbID, movie);
  });
  let result = Array.from(uniqueMap.values());

  // Étape 2 : Filtrer par année si une valeur est entrée
  if (yearFilter.value) {
    const inputYear = Number(yearFilter.value);

    result = result.filter(movie => {
      const yearString = movie.Year;
      if (!yearString) return false;

      // Gère les plages d'années (ex: "2008–2013")
      if (yearString.includes("–")) {
        const [start, end] = yearString.split("–").map(y => Number(y.trim()));
        return inputYear >= start && (!end || inputYear <= end); // Gère les plages ouvertes (ex: "2020-")
      }

      // Gère les années uniques
      return Number(yearString) === inputYear;
    });
  }

  // Étape 3 : Trier le tableau résultant
  result.sort((a, b) => {
    if (sortType.value === "---") return 0; // Pas de tri

    // Tri alphabétique par titre
    if (sortType.value === "az") return a.Title.localeCompare(b.Title);
    if (sortType.value === "za") return b.Title.localeCompare(a.Title);

    // Pour le tri par année, on ne prend que l'année de début
    const yearA = Number(a.Year?.split("–")[0]);
    const yearB = Number(b.Year?.split("–")[0]);

    // Tri par année de sortie
    if (sortType.value === "oldest") return yearA - yearB;
    if (sortType.value === "newest") return yearB - yearA;

    return 0;
  });

  
  return result;
});

// Au montage du composant, si un type de catégorie est présent, lance la recherche
onMounted(() => {
  if (props.type) {
    movieStore.fetchMovies(props.type);
  }
  else {
    movieStore.fetchMovies('movie')
  }
});

// Surveille les changements de la prop 'type' et relance une recherche si elle change
watch(() => props.type, (newVal) => {
  if (newVal) {
    movieStore.fetchMovies(newVal);
  }
});
</script>

<style scoped>
.page-content-wrapper {
  padding: 0 32px;
}
.welcome {
  padding: 0px 32px 20px;
}

.welcome h1 {
  font-size: 32px;
  margin: 0;
}

.welcome p {
  margin-top: 6px;
  font-size: 16px;
  opacity: 0.8;
}

a {
  opacity: 0.8;
}
a:hover {
  opacity: 1;
}
/* Styles pour la section des filtres et du tri */
.filters {
  display: flex;
  gap: 12px;
  margin: 15px 0;
}

.filters select,
.filters input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* Styles pour les messages de chargement et d'erreur */
.loading {
  color: #444;
  font-style: italic;
  padding: 10px;
  text-align: center;
}

.error {
  background-color: #ffe6e6;
  color: #c50000;
  padding: 12px 18px;
  border-left: 4px solid #c50000;
  border-radius: 4px;
  margin: 10px 0;
  font-weight: 500;
}

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

/* écrans très petits */
@media (max-width: 600px) {
  /* Ajustement du padding général pour les petits écrans */
  .page-content-wrapper {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
