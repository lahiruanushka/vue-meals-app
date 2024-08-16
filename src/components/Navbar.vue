<template>
      <header class="bg-white shadow-md py-4">
       <div class="container mx-auto flex justify-between items-center px-4">
         <router-link to="/" class="text-2xl font-bold text-blue-600">
           Home
         </router-link>
 
         <nav class="space-x-4">
           <router-link 
             :to="{ name: 'byName' }" 
             class="text-lg text-gray-700 hover:text-blue-600 transition-colors"
           >
             Search Meals
           </router-link>
 
           <router-link 
             :to="{ name: 'byLetter', params: { letter: 'A' } }" 
             class="text-lg text-gray-700 hover:text-blue-600 transition-colors"
           >
             Meals by Letter
           </router-link>
 
           <router-link 
             :to="{ name: 'ingredients' }" 
             class="text-lg text-gray-700 hover:text-blue-600 transition-colors"
           >
             Meals by Ingredients
           </router-link>
         </nav>
       </div>
     </header>
</template>