<!--
  Le composant racine de l'application.
  Il contient la navigation principale et le point de montage pour les pages (via <router-view>).
-->
<template>
  <div>
    <!-- Barre de navigation principale -->
    <div class="menu">
      <span class="logo">MOVIES</span>
      <router-link to="/">Home</router-link>
      <router-link to="/category/action">Action</router-link>
      <router-link to="/category/science">Science</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </div>

    <!-- Barre de recherche pour trouver des films -->
    <SearchBar />

    <!--
      Le composant <router-view> affiche le composant de la page
      correspondant à la route actuelle.
    -->
    <router-view />
  </div>
</template>

<script setup>
// Ce bloc <script setup> est utilisé pour la Composition API de Vue 3.
// Pour ce composant racine, aucune logique JavaScript n'est nécessaire ici
// car la navigation est entièrement gérée par <router-link> et <router-view>.
import SearchBar from "@/components/SearchBar.vue";
</script>

<style>
/* Styles globaux pour l'ensemble de l'application */
body {
  margin: 0;
  background-color: #979191;
  color: #e5e5e5;
  font-family: Inter, Arial, sans-serif;
  padding: 20px;
  overflow-x: hidden;
}
a {
  color: inherit;
  text-decoration: none;
}

/* Styles pour la barre de navigation */
.logo {
  font-weight: 800;
  color: #e50914;
  letter-spacing: 1px;
}

.menu {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.menu a {
  text-decoration: none;
  font-weight: bold;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

/* Style pour le lien de la page active */
.menu a.router-link-active {
  color: white;
  background-color: #e50914;
}

.menu a:hover {
  background-color: #f0f0f0;
}
</style>
