import Vue from 'vue';
import VueRouter from 'vue-router';

import UserHome from '../template/User/UserHome';
import Auth from '../template/auth/Auth';

Vue.use(VueRouter);

const routes = [{
    name: 'home',
    path: '/',
    component: UserHome
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}];

export default new VueRouter({
    mode: 'history',
    routes
})
