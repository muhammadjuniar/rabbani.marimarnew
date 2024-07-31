const state = {};
const getters = {
  stateGeneral: (state) => state,
};

const actions = {
  async setSession({commit}, data) { await commit("addSession", data); },
  async delSession({ commit }, key) { commit("removeSession", key); },
  async clearSession({ commit }) { commit("destroySession"); },
  async clearCache({ commit }) { commit("destroyCache"); },
};

const mutations = {
  addSession(state, data) { state[`${data.key}`] = data.value; },
  removeSession(state, key) { delete state[`${key}`]; },
  destroySession(state) { state = {} },
  destroyCache(state) {
    window.localStorage.removeItem('vuex');
  },
};

export default { state, getters, actions, mutations};
