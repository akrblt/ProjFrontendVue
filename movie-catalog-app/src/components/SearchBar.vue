<!--
  Composant réutilisable contenant la barre de recherche
  et la gestion de l'historique des recherches.
-->
<template>
  <div class="search-container">
    <!-- Section de la barre de recherche -->
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        placeholder="Rechercher un film..."
        @keyup.enter="onSearch"
        class="input"
        aria-label="Barre de recherche de film"
      />
      <button @click="onSearch" class="btn">Rechercher</button>
    </div>

    <!-- Section de l'historique des recherches -->
    <div class="history-section">
      <button @click="toggleHistory" class="btn history-toggle">
        Recherches récentes
        <!-- Affiche une flèche différente selon l'état d'affichage -->
        <span v-if="showHistory">▲</span>
        <span v-else>▼</span>
      </button>

      <!--
        Le composant <transition> applique un effet de fondu
        lors de l'apparition/disparition de l'historique.
      -->
      <transition name="fade">
        <div v-if="showHistory && store.history.length" class="history">
          <ul>
            <li
              v-for="item in store.history"
              :key="item"
              @click="searchFromHistory(item)"
              tabindex="0"
              @keyup.enter="searchFromHistory(item)"
            >
              🔎 {{ item }}
            </li>
          </ul>
          <button @click="store.clearHistory" class="btn clear-btn">
            Effacer l'historique
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMovieStore } from '@/store/movieStore';

// État local pour le champ de recherche
const query = ref('');
// Récupération du store pour accéder à l'état et aux actions
const store = useMovieStore();
// État local pour contrôler la visibilité de l'historique
const showHistory = ref(false);

/**
 * Lance une recherche de films si la requête n'est pas vide.
 */
const onSearch = () => {
  if (query.value.trim()) {
    store.fetchMovies(query.value);
  }
};

/**
 * Lance une recherche à partir d'un élément de l'historique.
 * @param {string} item - Le terme de recherche de l'historique.
 */
const searchFromHistory = (item) => {
  query.value = item;
  store.fetchMovies(item);
};

/**
 * Affiche ou masque le panneau de l'historique.
 */
const toggleHistory = () => {
  showHistory.value = !showHistory.value;
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

/* Styles pour la barre de recherche */
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 18px;
  background-color: #e50914; /* Rouge Netflix-like */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #f40612;
}

/* Styles pour la section de l'historique */
.history-toggle {
  background-color: #555;
  margin-bottom: 5px;
}
.history-toggle:hover {
  background-color: #666;
}

.history {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #eee;
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}

.history li {
  cursor: pointer;
  padding: 6px 2px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.history li:hover {
  background-color: #eee;
}

.clear-btn {
  background-color: #aaa;
  font-size: 0.8rem;
  padding: 5px 10px;
}
.clear-btn:hover {
  background-color: #999;
}

/* Styles pour l'animation de transition (fondu) */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
