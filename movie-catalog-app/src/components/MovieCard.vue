<template>
  <div class="movie-card">

    
    <div class="card-content" @click="goToDetail">
      <img :src="movie.Poster" alt="Poster" class="poster" />
      <h3>{{ movie.Title }}</h3>
      <p>{{ movie.Year }}</p>
    </div>

    
    <button class="fav-btn" @click.stop="toggleFav">
      {{ isFav ? "🤍 Remove from favorites" : "❤️ Add to favorites" }}
    </button>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/store/movieStore';
import { computed } from 'vue';

const props = defineProps({ movie: Object });

const router = useRouter();
const store = useMovieStore();


const goToDetail = () => {
  router.push(`/movie/${props.movie.imdbID}`);
};


const isFav = computed(() =>
  store.isFavorite(props.movie.imdbID)
);


const toggleFav = () => {
  store.toggleFavorite(props.movie);
};
</script>

<style scoped>
.movie-card {
  width: 200px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.poster {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.card-content {
  cursor: pointer;
}

.fav-btn {
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
</style>
