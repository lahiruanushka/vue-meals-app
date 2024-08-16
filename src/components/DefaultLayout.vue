<template>
    <div class="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-1">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  import Navbar from './Navbar.vue';
  </script>
  