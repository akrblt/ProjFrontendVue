

// Importe les fonctions et modules nécessaires
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';

// Crée l'instance de l'application Vue à partir du composant racine App.vue
const app = createApp(App);

// Monte le routeur sur l'application pour gérer la navigation
app.use(router);

// Monte Pinia sur l'application pour la gestion de l'état global
app.use(createPinia());

// Monte l'application Vue sur l'élément du DOM avec l'ID '#app'
app.mount('#app');
