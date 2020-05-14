import Vue from 'vue';
import Vuex from 'vuex';
import Header from "./header";
import Catalog from "./catalog";
import General from './general';
import User from './user';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Header,
    Catalog,
    User,
    General
  }
});
