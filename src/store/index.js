import { createStore } from "vuex";
import state from './state' // Import the default export directly
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const store = createStore({
    state,
    actions,
    mutations,
    getters,
});

export default store; // Export the store, not the state
