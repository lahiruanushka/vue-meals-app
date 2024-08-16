<template>
    <div class="flex flex-col items-center justify-center w-full h-full">
      <svg
        class="animate-spin h-12 w-12 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      <p class="text-gray-600 mt-4">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    message: {
      type: String,
      default: 'Loading...',
    },
  });
  </script>
  