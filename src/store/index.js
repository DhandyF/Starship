import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      searchStarshipHistory: [],
      searchPokemonHistory: []
    }
  },
  mutations: {
    addStarshipHistory(state, payload) {
      state.searchStarshipHistory.push(payload);
    },
    addPokemonHistory(state, payload) {
      state.searchPokemonHistory.push(payload);
    }
  },
  actions: {
    addStarshipHistory({ commit, state }, payload) {
      let find = state.searchStarshipHistory.find((his) => his === payload);

      if (find === undefined) {
        commit('addStarshipHistory', payload);
      }
    },
    addPokemonHistory({ commit }, payload) {
      commit('addPokemonHistory', payload);
    }
  },
  getters: {
    getStarshipHistory: (state) => state.searchStarshipHistory,
    getPokemonHistory: (state) => state.searchPokemonHistory
  }
})