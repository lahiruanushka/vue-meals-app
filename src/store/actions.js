import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;

export default {
  async searchMeals({ commit }, keyword) {
    commit("SET_SEARCHED_MEALS", { loading: true, data: [] });

    try {
      const response = await axios.get(`${api}/search.php?s=${keyword}`);
      commit("SET_SEARCHED_MEALS", {
        loading: false,
        data: response.data.meals,
      });
    } catch (error) {
      console.error("Failed to fetch searched meals:", error);
      commit("SET_SEARCHED_MEALS", { loading: false, data: [] });
    }
  },

  async fetchMealsByLetter({ commit }, letter) {
    commit("SET_MEALS_BY_LETTER", { loading: true, data: [] });

    try {
      const response = await axios.get(`${api}/search.php?f=${letter}`);
      commit("SET_MEALS_BY_LETTER", {
        loading: false,
        data: response.data.meals,
      });
    } catch (error) {
      console.error("Failed to fetch meals by letter:", error);
      commit("SET_MEALS_BY_LETTER", { loading: false, data: [] });
    }
  },

  async fetchMealsByIngredient({ commit }, ingredient) {
    commit("SET_MEALS_BY_INGREDIENT", { loading: true, data: [] });

    try {
      const response = await axios.get(`${api}/filter.php?i=${ingredient}`);
      commit("SET_MEALS_BY_INGREDIENT", {
        loading: false,
        data: response.data.meals,
      });
    } catch (error) {
      console.error("Failed to fetch meals by ingredient:", error);
      commit("SET_MEALS_BY_INGREDIENT", { loading: false, data: [] });
    }
  },

  async fetchMealDetails({ commit }, mealId) {
    commit("SET_MEAL_DETAILS", { loading: true, data: {} });

    try {
      const response = await fetch(`${api}/lookup.php?i=${mealId}`);
      const data = await response.json();
      if (data.meals && data.meals.length) {
        commit("SET_MEAL_DETAILS", { loading: false, data: data.meals[0] });
      } else {
        commit("SET_MEAL_DETAILS", { loading: false, data: {} }); // Handle case where meal is not found
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
      commit("SET_MEAL_DETAILS", { loading: false, data: {} }); // Handle error
    }
  },
};
