<template>
  <div class="flex flex-col p-12 justify-center items-center space-y-6">
    <button @click="openModalAndCelebrate" class="bg-blue-500 text-white px-4 py-2 rounded">
      Surprise Me!
    </button>

    <!-- Celebration Animation -->
    <div v-if="showConfetti" class="confetti">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <Modal v-model:isOpen="isModalOpen">
      <div v-if="randomMeal" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img :src="randomMeal.strMealThumb" alt="" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ randomMeal.strMeal }}
          </h3>
          <div class="flex justify-between items-center">
            <a
              :href="randomMeal.strYoutube"
              class="text-blue-500 hover:underline"
              target="_blank"
            >
              Watch on YouTube
            </a>
            <router-link
              :to="{ name: 'mealDetails', params: { id: randomMeal.idMeal } }"
              class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Meals Grid -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
      <!-- Loading State -->
      <div v-if="loading" class="col-span-full flex items-center justify-center">
        <LoadingSpinner message="Loading meals..." />
      </div>

      <!-- Meals List -->
      <MealItem v-for="meal in randomMeals" :key="meal.idMeal" :meal="meal" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MealItem from '../components/MealItem.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Modal from '../components/Modal.vue';

const isModalOpen = ref(false);
const randomMeal = ref(null);
const randomMeals = ref([]);
const loading = ref(false);
const showConfetti = ref(false);

const openModalAndCelebrate = async () => {
  await fetchRandomMeal();
  isModalOpen.value = true;
  showConfetti.value = true;

  // Hide confetti animation after a few seconds
  setTimeout(() => {
    showConfetti.value = false;
  }, 3000); // Duration of the confetti animation
};

const fetchRandomMeals = async () => {
  try {
    loading.value = true;
    randomMeals.value = []; // Clear previous meals
    for (let i = 0; i < 10; i++) {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/random.php`);
      randomMeals.value.push(response.data.meals[0]);
    }
  } catch (error) {
    console.error('Failed to fetch meals:', error);
  } finally {
    loading.value = false;
  }
};

const fetchRandomMeal = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/random.php`);
    randomMeal.value = response.data.meals[0];
  } catch (error) {
    console.error('Failed to fetch meal:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRandomMeals();
});
</script>

<style scoped>
/* Add CSS for confetti animation here */
/* styles.css */
@keyframes confetti {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

.confetti {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.confetti div {
  position: absolute;
  width: 5px;
  height: 20px;
  background: #ff0;
  opacity: 0;
  animation: confetti 2s linear infinite;
}

.confetti div:nth-child(1) { left: 10%; animation-delay: 0s; }
.confetti div:nth-child(2) { left: 30%; animation-delay: 0.2s; }
.confetti div:nth-child(3) { left: 50%; animation-delay: 0.4s; }
.confetti div:nth-child(4) { left: 70%; animation-delay: 0.6s; }
.confetti div:nth-child(5) { left: 90%; animation-delay: 0.8s; }

</style>
