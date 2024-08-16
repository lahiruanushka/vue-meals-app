<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-8">Ingredients List</h1>
      
      <!-- Search Input -->
      <div class="max-w-xl mx-auto mb-10">
        <input 
          type="text" 
          class="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-4 text-lg placeholder-gray-500 transition-all duration-300" 
          placeholder="Search for ingredients..."
          v-model="searchQuery"
        />
      </div>
      
            <!-- Loading State -->
            <div v-if="isLoading" class="col-span-full flex items-center justify-center">
        <LoadingSpinner message="Loading ingredients..." />
      </div>


      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Display ingredients -->
        <div 
          v-for="ingredient in filteredIngredients" 
          :key="ingredient.idIngredient" 
          class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <router-link 
            :to="{ name: 'byIngredients', params: { ingredient: ingredient.strIngredient } }"
            class="block text-blue-500 hover:text-blue-600 text-lg font-semibold mb-2"
          >
            {{ ingredient.strIngredient }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const api = import.meta.env.VITE_API_BASE_URL;
const ingredients = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');

// Fetch ingredients on component mount
onMounted(() => {
  fetchIngredients();
});

// Fetch ingredients data from API
async function fetchIngredients() {
  try {
    isLoading.value = true;
    const response = await axios.get(`${api}/list.php?i=list`);
    ingredients.value = response.data.meals;
  } catch (error) {
    console.error("Failed to fetch ingredients:", error);
  } finally {
    isLoading.value = false;
  }
}

// Computed property to filter ingredients based on search query
const filteredIngredients = computed(() => {
  return ingredients.value.filter(ingredient =>
    ingredient.strIngredient.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
