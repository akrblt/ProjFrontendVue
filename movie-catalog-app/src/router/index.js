
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../../movie-catalog-app/src/pages/Home.vue';
import Detail from '../../../movie-catalog-app/src/pages/Detail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/movie/:id', component: Detail },
  {path: '/category/:type' , component : Home , props: true},
  {path: "/favorites" , component: () => import("../pages/Favorites.vue")}
];

const router= createRouter({
  history: createWebHistory(),
  routes
});

export default router;