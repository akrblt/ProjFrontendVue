
<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      placeholder="Search Movie"
      @keyup.enter="onSearch"
      class="input"
    />
    <button @click="onSearch" class="btn">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMovieStore } from '../store/movieStore';

const query = ref('');
const movieStore = useMovieStore();

const onSearch = () => {
  if (query.value.trim()) {
    movieStore.fetchMovies(query.value);
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.input {
  flex: 1;
  padding: 8px;
}
.btn {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
