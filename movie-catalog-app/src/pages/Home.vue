<template>
  <div>
    <SearchBar />

    <!-- ✅ SPRINT 3: TRI & FILTRE -->
    <div class="filters">
      <select v-model="sortType">
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>

      <input
        v-model="yearFilter"
        type="number"
        placeholder="Filter by year ex: 2025"
      />
    </div>

    <div v-if="movieStore.loading" class="loading">loading...</div>

    <div v-else-if="movieStore.error" class="error">
      {{ movieStore.error }}
    </div>

    <div v-else class="movie-list">
      <MovieCard
        v-for="movie in sortedAndFilteredMovies"
        :key="movie.imdbID"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue';
import MovieCard from '../components/MovieCard.vue';
import { useMovieStore } from '../store/movieStore';
import { onMounted, watch, ref, computed } from 'vue';

const movieStore = useMovieStore();

const props = defineProps({
  type: String
});

/* SPRINT 3: TRI & FILTRE STATE */
const sortType = ref("az");
const yearFilter = ref("");

/*  SPRINT 3: TRI + FILTRE COMPUTED */
const sortedAndFilteredMovies = computed(() => {
  let result = [...movieStore.movies];

  if (yearFilter.value) {
    const inputYear = Number(yearFilter.value);

    result = result.filter(movie => {
      const yearString = movie.Year;

      
      if (yearString.includes("–")) {
        const [start, end] = yearString.split("–").map(y => Number(y));
        return inputYear >= start && inputYear <= end;
      }

      
      return Number(yearString) === inputYear;
    });
  }

  //  A-Z / Z-A TRIAGE
  result.sort((a, b) => {
    if (sortType.value === "az") {
      return a.Title.localeCompare(b.Title);
    } else {
      return b.Title.localeCompare(a.Title);
    }
  });

  return result;
});

onMounted(() => {
  if (props.type) {
    movieStore.fetchMovies(props.type);
  }
});

watch(() => props.type, (newVal) => {
  if (newVal) {
    movieStore.fetchMovies(newVal);
  }
});
</script>

<style scoped>
/*  SPRINT 3: FILTRE DESIGN */
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

/*  LOADING & ERROR */
.loading {
  color: #444;
  font-style: italic;
  padding: 10px;
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

/* SPRINT 3: RESPONSIVE GRID */
.movie-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* Tablet */
@media (max-width: 1024px) {
  .movie-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobil */
@media (max-width: 600px) {
  .movie-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
