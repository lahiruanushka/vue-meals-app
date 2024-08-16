<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-gray-800 opacity-50" @click="close"></div>
      <div class="bg-white rounded-lg shadow-lg max-w-lg mx-4 p-6 z-10">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="close">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['update:isOpen']);
  
  const close = () => {
    emit('update:isOpen', false);
  };
  </script>
  