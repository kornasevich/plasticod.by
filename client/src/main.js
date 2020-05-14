import Vue from 'vue';
import App from './App.vue';
import store from './store';
import {router} from './router';
import vuetify from './plugins/vuetify';
import Vuetify from "vuetify";
import Lightbox from "vue-my-photos";
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSidebarMenu from "vue-sidebar-menu";
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

Vue.config.productionTip = false;
Vue.component('lightbox', Lightbox);
Vue.use(Vuetify);
Vue.use(Lightbox);
Vue.use(VueAxios, axios);
Vue.use(VueSidebarMenu);

new Vue({
  store,
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app');
