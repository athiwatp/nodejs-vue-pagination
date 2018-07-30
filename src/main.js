import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuetify from 'vuetify'
Vue.use(Vuetify)
Vue.use(VueAxios,axios);
 
//import template vuejs
import App from './App.vue';
import Pagination from './components/Pagination.vue'
Vue.use(VueRouter)
const routes = [
  	{
        name: 'Pagination',
        path: '/',
        component: Pagination
    }
   
];
const router = new VueRouter({ mode: 'history', routes: routes});
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
