const state = { admin: null, data: {} };
const getters = {
  authenticatedAdmin: (state) => !!state.admin,
  stateAdmin: (state) => state.admin,
  stateAdminData: (state) => state.data,
};

const actions = {
  async loginAdmin({commit}, admin) { await commit("setAdmin", admin); },
  async logoutAdmin({ commit }) { commit("destroyAdmin"); },

  async setSession({commit}, data) { await commit("addSession", data); },
  async delSession({ commit }, key) { commit("removeSession", key); },
  async clearSession({ commit }) { commit("destroySession"); },
};

const mutations = {
  setAdmin(state, admin) { state.admin = admin; },
  destroyAdmin(state) { state.admin = null; },

  addSession(state, data) { state.data[`${data.key}`] = data.value; },
  removeSession(state, key) { delete state.data[`${key}`]; },
  destroySession(state) { state.data = {} },
};

export default { state, getters, actions, mutations};
