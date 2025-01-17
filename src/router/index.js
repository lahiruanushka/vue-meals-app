import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MealsByLetter from "../views/MealsByLetter.vue";
import MealsByIngredient from "../views/MealsByIngredient.vue";
import Ingredients from "../views/Ingredients.vue";
import MealsByName from "../views/MealsByName.vue";
import MealDetails from "../views/MealDetails.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import GuestLayout from "../components/GuestLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "by-letter/:letter",
        name: "byLetter",
        component: MealsByLetter,
      },
      {
        path: "by-ingredient/:ingredient",
        name: "byIngredients",
        component: MealsByIngredient,
      },
      {
        path: "ingredient",
        name: "ingredients",
        component: Ingredients,
      },
      {
        path: "by-name",
        name: "byName",
        component: MealsByName,
      },
      {
        path: "meal/:id",
        name: "mealDetails",
        component: MealDetails,
      },
    ],
  },
  {
    path: "/guest",
    component: GuestLayout,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
