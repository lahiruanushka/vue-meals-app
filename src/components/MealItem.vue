<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img :src="meal.strMealThumb" alt="" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">
        {{ meal.strMeal }}
      </h3>
      <div class="flex justify-between items-center">
        <a
          :href="meal.strYoutube"
          class="text-blue-500 hover:underline"
          target="_blank"
        >
          Watch on YouTube
        </a>
        <router-link
          :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
          class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import store from "../store";

const { meal } = defineProps({
  meal: Object,
});

const route = useRoute();

onMounted(() => {
  store.dispatch;
});
</script>
