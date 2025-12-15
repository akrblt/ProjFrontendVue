# Documentation de l'Architecture

Ce document décrit l'architecture et l'organisation des fichiers du projet "Media Explorer". L'objectif est de fournir une vue d'ensemble claire pour faciliter la maintenance et l'évolution de l'application.

## Structure globale des dossiers

Le code source de l'application se trouve dans le dossier `src/`. Il est organisé de la manière suivante :

```
src/
├── assets/         # Fichiers statiques (CSS, images, polices)
├── components/     # Composants Vue réutilisables
├── layouts/        # Composants de mise en page (ex: header, footer)
├── pages/          # Composants Vue correspondant aux pages de l'application
├── router/         # Configuration du routage (Vue Router)
├── services/       # Modules pour la communication avec les APIs externes
└── store/          # Gestion de l'état global (Pinia)
```

## Description des dossiers

### `src/assets`

Contient tous les actifs statiques qui sont importés directement dans les composants Vue ou les fichiers CSS.

*   **`styles/main.css`**: Fichier CSS global pour les styles de base de l'application.

### `src/components`

Ce répertoire contient des composants Vue "agnostiques" et réutilisables à travers l'application. Ils ne sont pas directement liés à une route spécifique mais servent de briques de base pour construire l'interface.

*   **`Loader.vue`**: Un indicateur de chargement affiché lors des appels API.
*   **`MovieCard.vue`**: Une carte pour afficher les informations de base d'un film dans une liste.
*   **`MovieDetail.vue`**: Affiche la vue détaillée d'un film.
*   **`SearchBar.vue`**: La barre de recherche utilisée sur la page d'accueil.

### `src/layouts`

Les layouts sont des composants qui enveloppent les pages. Ils permettent de définir une structure commune (par exemple, une barre de navigation et un pied de page) pour un ensemble de pages.

*   **`DefaultLayout.vue`**: La mise en page par défaut utilisée pour toutes les pages de l'application.

### `src/pages`

Les composants de ce dossier représentent les pages principales de l'application, directement associées à une route. Ils sont responsables de l'agencement des composants et de la récupération des données nécessaires à la page.

*   **`Home.vue`**: La page d'accueil, qui contient la barre de recherche et affiche la liste des résultats de films.
*   **`Detail.vue`**: La page qui affiche les détails complets d'un film sélectionné.

### `src/router`

Ce dossier configure la navigation de l'application à l'aide de Vue Router.

*   **`index.js`**: Définit toutes les routes de l'application, en associant un chemin (URL) à un composant de page (`src/pages`). C'est ici que l'on déclare quelle page s'affiche pour "/" ou "/movie/:id".

### `src/services`

Contient les modules qui gèrent la logique de communication avec les services externes, comme les API.

*   **`omdbApi.js`**: Centralise la logique des appels à l'API TMDB. Il utilise Axios pour effectuer les requêtes HTTP, gère la clé d'API et formate les URLs. (Note: Le nom du fichier est `omdbApi.js` mais il interroge l'API TMDB).

### `src/store`

Ce répertoire gère l'état global de l'application avec Pinia. Un "store" est un conteneur d'état qui peut être partagé entre plusieurs composants.

*   **`movieStore.js`**: Contient l'état lié aux films : la liste des films, le film sélectionné, l'état de chargement, les termes de recherche, etc. Il définit également les "actions" (fonctions) pour modifier cet état, par exemple en lançant une recherche de films.
