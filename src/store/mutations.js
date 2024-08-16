export default {
    SET_SEARCHED_MEALS(state, payload) {
      state.searchedMeals.loading = payload.loading;
      state.searchedMeals.data = payload.data;
    },
    SET_MEALS_BY_LETTER(state, payload) {
      state.mealsByLetter.loading = payload.loading;
      state.mealsByLetter.data = payload.data;
    },
    SET_MEALS_BY_INGREDIENT(state, payload) {
      state.mealsByIngredient.loading = payload.loading;
      state.mealsByIngredient.data = payload.data;
    },
    SET_MEAL_DETAILS(state, payload) {
      state.mealDetails.loading = payload.loading;
      state.mealDetails.data = payload.data;
    }
  };
  