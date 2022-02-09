import './bootstrap';
import Vue from 'vue';
import Board from './Board';
import apolloProvider from './apollo.config';
window.Vue = Vue;

import router from './router_config';
import store from "./vuex.config";

Vue.component('Board', Board);

const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    store,
    beforeCreate(){
        store.dispatch('setLoggedIn',localStorage.getItem('isLoggedIn') === 'true');
        store.dispatch('fetchCurrentUser');
    }
});
