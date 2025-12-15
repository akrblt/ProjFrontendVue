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

  <div>
    <button @click="toggleHistory" class="btn history-toggle">
      Recent Searches
      <span v-if="showHistory">▲</span>
      <span v-else>▼</span>
    </button>

    <transition name="fade">
      <div v-if="showHistory && store.history.length" class="history">
        <ul>
          <li
            v-for="item in store.history"
            :key="item"
            @click="searchFromHistory(item)"
          >
            🔎 {{ item }}
          </li>
        </ul>
        <button @click="store.clearHistory" class="btn clear-btn">
          Clear History
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMovieStore } from '../store/movieStore';

const query = ref('');
const store = useMovieStore();

const showHistory = ref(false); 

const onSearch = () => {
  if (query.value.trim()) {
    store.fetchMovies(query.value);
  }
};

const searchFromHistory = (item) => {
  query.value = item;
  store.fetchMovies(item);
};

const toggleHistory = () => {
  showHistory.value = !showHistory.value;
};
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
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
  border-radius: 4px;
}

.history-toggle {
  margin-bottom: 5px;
}

.history {
  background: #f8f8f8;
  padding: 10px;
  border-radius: 6px;
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}

.history li {
  cursor: pointer;
  padding: 4px 0;
}

.history li:hover {
  color: #007bff;
}

.clear-btn {
  background-color: #ff4d4f;
}


.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
