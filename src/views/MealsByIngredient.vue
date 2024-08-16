<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Meals By Ingredient: {{ route.params.ingredient }}
      </h1>
    </div>

    <!-- Meals Grid -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center col-span-full">
        <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <p class="text-gray-600 mt-4">Searching for meals...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="(mealsByIngredient.length === 0)" class="text-center col-span-full">
        <p class="text-xl text-gray-700">No meals found.</p>
      </div>

      <!-- Meals List -->
      <MealItem 
        v-for="meal in mealsByIngredient" 
        :key="meal.idMeal" 
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import MealItem from '../components/MealItem.vue';

const store = useStore();
const route = useRoute();

const mealsByIngredient = computed(() => store.state.mealsByIngredient.data);
const isLoading = computed(() => store.state.mealsByIngredient.loading);

onMounted(() => {
  store.dispatch('fetchMealsByIngredient', route.params.ingredient);
});
</script>
