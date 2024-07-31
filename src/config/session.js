import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "@/sessions/user";
import admin from "@/sessions/admin";
import general from "@/sessions/general";

// Create store
export default new Vuex.Store({
  modules: {user, admin, general},
  plugins: [createPersistedState()],
});