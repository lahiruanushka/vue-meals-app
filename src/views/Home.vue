<template>
    <div class="flex flex-col p-8 justify-center items-center space-y-6">
      <!-- Search Input -->
      <input 
        type="text" 
        class="rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-2 text-lg placeholder-gray-500" 
        placeholder="Search Meals"
      />
  
      <!-- Letters Navigation -->
      <div class="flex gap-2 justify-center items-center flex-wrap">
        <router-link 
          v-for="(letter, index) in letters" 
          :key="index" 
          :to="{ name: 'byLetter', params: {letter}}"
          class="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300"
        >
          {{ letter }}
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import store from '../store';
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  </script>
  