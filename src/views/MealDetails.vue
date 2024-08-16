<template>
  <div class="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
    <div class="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div v-if="isLoading" class="p-6 text-center">
        <p>Loading...</p>
      </div>
      <div v-else class="p-6">
        <!-- Back Button -->
        <button @click="goBack" class="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Back to Meals
        </button>

        <!-- Meal Image -->
        <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-64 object-cover mb-6 rounded-lg">

        <!-- Meal Name -->
        <h1 class="text-3xl font-bold mb-4">{{ meal.strMeal }}</h1>

        <!-- Meal Category and Area -->
        <p class="text-gray-700 mb-2"><strong>Category:</strong> {{ meal.strCategory }}</p>
        <p class="text-gray-700 mb-4"><strong>Area:</strong> {{ meal.strArea }}</p>

        <!-- Ingredients and Measurements -->
        <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul class="list-disc list-inside mb-6">
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>

        <!-- Instructions -->
        <h2 class="text-2xl font-semibold mb-2">Instructions</h2>
        <p class="text-gray-700 mb-6">{{ meal.strInstructions }}</p>

        <!-- YouTube Video -->
        <div v-if="meal.strYoutube">
          <h2 class="text-2xl font-semibold mb-2">Video Tutorial</h2>
          <a :href="meal.strYoutube" target="_blank" class="text-blue-500 hover:underline">
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();

const meal = computed(() => store.state.mealDetails.data);
const isLoading = computed(() => store.state.mealDetails.loading);

const goBack = () => {
  router.push('/');
};

const ingredients = computed(() => {
  return Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal.value[`strIngredient${i + 1}`];
    const measure = meal.value[`strMeasure${i + 1}`];
    return ingredient ? `${measure} ${ingredient}` : null;
  }).filter(Boolean);
});

onMounted(() => {
  store.dispatch('fetchMealDetails', route.params.id);
});
</script>
