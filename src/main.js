import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import axios from 'axios';
import { router } from './router/index';
import store from './store';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
//Vue.prototype.isLoggedIn = localStorage.getItem('token') != null;
Vue.use(BootstrapVue)
Vue.use(VueRouter);
axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('token');
axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401 || error.response.status === 403) {
  alert("Forbidden")
 }
 return error;
});
new Vue({
  render: h => h(App),
  router,
   store
}).$mount('#app')
