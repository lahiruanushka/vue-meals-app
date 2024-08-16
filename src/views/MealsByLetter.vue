<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-8">
      Meals Starting with "{{ route.params.letter }}"
    </h1>

    <div class="max-w-xl mx-auto mb-10">
      <!-- Letters Navigation -->
      <div class="flex gap-3 justify-center items-center flex-wrap mb-6">
        <router-link
          v-for="(letter, index) in letters"
          :key="index"
          :to="{ name: 'byLetter', params: { letter } }"
          class="text-lg font-medium text-gray-600 hover:text-blue-500 transition-colors duration-300 py-1 px-2"
        >
          {{ letter }}
        </router-link>
      </div>
    </div>

    <!-- Meals Grid -->
    <div
      class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
    >
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="col-span-full flex items-center justify-center"
      >
        <LoadingSpinner message="Loading meals..." />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!mealsByLetter"
        class="text-center col-span-full"
      >
        <p class="text-xl text-gray-700">No meals found with letter {{ route.params.letter }}</p>
      </div>

      <!-- Meals List -->
      <MealItem v-for="meal in mealsByLetter" :key="meal.idMeal" :meal="meal" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import MealItem from "../components/MealItem.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const store = useStore();
const route = useRoute();

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const mealsByLetter = computed(() => store.state.mealsByLetter.data);
const isLoading = computed(() => store.state.mealsByLetter.loading);

// Function to fetch meals based on the letter
const fetchMeals = (letter) => {
  store.dispatch("fetchMealsByLetter", letter);
};

// Watch for changes in route parameters
watch(
  () => route.params.letter,
  (newLetter) => {
    if (newLetter) {
      fetchMeals(newLetter);
    }
  },
  { immediate: true }
);

// Initial fetch if the route has a letter parameter
onMounted(() => {
  const letter = route.params.letter;
  if (letter) {
    fetchMeals(letter);
  }
});
</script>
