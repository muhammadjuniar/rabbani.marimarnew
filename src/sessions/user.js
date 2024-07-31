const state = { user: null, data:{} };
const getters = {
  authenticatedUser: (state) => !!state.user,
  stateUser: (state) => state.user,
  stateUserData: (state) => state.data,
};

const actions = {
  async loginUser({commit}, user) { await commit("setUser", user); },
  async logoutUser({ commit }) { commit("destroyUser"); },

  async setSession({commit}, data) { await commit("addSession", data); },
  async delSession({ commit }, key) { commit("removeSession", key); },
  async clearSession({ commit }) { commit("destroySession"); },
};

const mutations = {
  setUser(state, user) { state.user = user; },
  destroyUser(state) { state.user = null; },

  addSession(state, data) { state.data[`${data.key}`] = data.value; },
  removeSession(state, key) { delete state.data[`${key}`]; },
  destroySession(state) { state.data = {} },
};

export default { state, getters, actions, mutations};
