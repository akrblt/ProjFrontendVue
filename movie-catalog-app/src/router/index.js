
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Detail from '@/pages/Detail.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  // Route pour la page d'accueil
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Route pour la page de détail d'un film, avec un paramètre dynamique 'id'
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: Detail
  },
  // Route pour afficher une catégorie de médias (ex: /category/movie), réutilise la page d'accueil
  {
    path: '/category/:type',
    name: 'Category',
    component: Home,
    props: true // Passe le paramètre 'type' comme une prop au composant Home
  },
  // Route pour la page des favoris, utilise le lazy loading pour optimiser le chargement initial
  {
    path: "/favorites",
    name: 'Favorites',
    component: () => import("@/pages/Favorites.vue")
  }
];

// Crée l'instance du routeur
const router = createRouter({
  // Utilise l'historique du navigateur pour une navigation sans '#' dans l'URL
  history: createWebHistory(),
  // Applique les routes définies ci-dessus
  routes
});

export default router;