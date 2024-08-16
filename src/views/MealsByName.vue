<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-8">
      Meals By Name
    </h1>

    <!-- Search Input -->
    <div class="max-w-xl mx-auto mb-10">
      <input
        type="text"
        class="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-4 text-lg placeholder-gray-500 transition-all duration-300"
        placeholder="Search for meals..."
        v-model="keyword"
        @input="searchMeals"
      />
    </div>

    <!-- Meals Grid -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="col-span-full flex items-center justify-center">
        <LoadingSpinner message="Loading meals..." />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!keyword.trim() || (searchedMeals.data && searchedMeals.data.length === 0)"
        class="text-center col-span-full"
      >
        <p class="text-xl text-gray-700">No meals found.</p>
      </div>

      <!-- Meals List -->
      <MealItem
        v-for="meal in searchedMeals"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import MealItem from '../components/MealItem.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue'; // Import the LoadingSpinner component

const store = useStore();
const route = useRoute();
const keyword = ref('');
const searchedMeals = computed(() => store.state.searchedMeals.data);
const isLoading = computed(() => store.state.searchedMeals.loading);


function searchMeals() {
  const trimmedKeyword = keyword.value.trim();
  if (trimmedKeyword) {
    store.dispatch('searchMeals', trimmedKeyword);
  } else {
    store.commit('SET_SEARCHED_MEALS', { loading: false, data: [] }); // Clear previous search results
  }
}

onMounted(() => {
  keyword.value = route.params.name || '';
  if (keyword.value.trim()) {
    searchMeals();
  }
});
</script>
